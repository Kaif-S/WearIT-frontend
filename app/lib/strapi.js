import axios from 'axios'
import { utils } from './utility_functions';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

const api = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers:{Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_KEY}`}
})

export const strapi = {
  // Fetch products
  async getProducts() {
    try {
      const response = await api.get('/products?populate=*')
      return response.data.data
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },
  async fetchInfoAboutsingleProduct(productid){
    try{
      const response = await api.get(`/products/${productid}?populate=*`);
      return response.data.data;
    }catch(error){
      console.error("this error during fetching products: ",error)
    }
  },

  async addProducttoCart(userid,product){
    try {
      const cartid = await this.getCartItems(userid)
      cartid[0].caritem.forEach(element => {
        delete element.id;
      });
      const response = await api.put(`/carts/${cartid[0].documentId}`,{"data":{"caritem":[...cartid[0].caritem,{"productId":product.documentId,"quantity":1,"productName":product.title,"priceSnapshot":product.price,"productImage":product.images[0].url}]}})
      return response.data;
    } catch (error){
      console.error("error while adding to cart: ",error)
      return []
    }
  },

  async getCartItems(userid){
    try{
      const response = await api.get(`/carts?filters[clerkUserId][$eq]=${userid}&filters[CartStatus][$eq]=active&populate=*`)
      return response.data.data
    } catch (error){
      console.error("error while fetching cart items:", error);
      return []
    }
  },
  async UpdateCartOrderd(userid){
    try{
      const cartid = await this.getCartItems(userid)
      const response = await api.put(`/carts/${cartid[0].documentId}`,{"data":{"CartStatus":"ordered"}})
      return response.data;
    }catch(error){
      console.error("error while updating cart status: ",error);
    }
  },
  async placeOrder(userid,address){
    try{
      const items = (await this.getCartItems(userid))[0].caritem
      const orderresponse = await api.post('/orders',{
    "data":{
        "clerkUserId": "user_32PJS5wKqA6qnnkRXPLXOgOlBKC",
        "cartItems": utils.ItemsOptimizer(items),
        "amount":utils.totalcalculator(items),
        "shippingaddress":{"addressline1":address.addressLine1,"addressline2":address.addressLine2,"country":address.country}
    }
});
      const paymentresponse = await api.post('/payments',{"data":{"clerkUserId":userid,"amount":orderresponse.data.data.amount,"paymentStatus":"successful"}});
      const response = await api.put(`/orders/${orderresponse.data.data.documentId}`,{"data":{"payment":paymentresponse.data.data.documentId}})
      return response.data.data
    }catch(error){
      console.error("error while placing order: ",error);
    }
  },

  async getSpecificCartProducts(userid,productid){
    try{
      const raw_response = await api.get(`/carts?filters[clerkUserId][$eq]=${userid}&populate=*`);
      const cartitmes =  raw_response.data.data[0]["caritem"];
      return cartitmes.filter((item)=>item.productId===productid);
    } catch (error){
      console.error("error while fetching specific cart items:", error);
      return [];
    }
  },
  async updateCart(userid,cartdata){
    try {
      let cartdatacleared = cartdata[0].caritem;
      cartdatacleared.forEach(element => {
        delete element.id
      });
      const response = await api.put(`/carts/${cartdata[0].documentId}`,{"data":{"caritem":cartdatacleared}});
      return response.data
    } catch(error){
      console.error("error while updating cart: ",error)
      return []
    }

  },
  // Fetch featured products
  async getFeaturedProducts() {
    try {
      const response = await api.get('/products?filters[featured][$eq]=true&populate=*')
      return response.data.data
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
  },

  // Fetch categories
  async getCategories() {
    try {
      const response = await api.get('/categories?populate=*')
      return response.data.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  },
}