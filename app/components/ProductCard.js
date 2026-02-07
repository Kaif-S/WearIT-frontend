"use client"

import { useState , useEffect } from 'react'
import { Star, Heart, ShoppingCart, Package} from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import { strapi } from '../lib/strapi';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const {isSignedIn, user, isLoaded} = useUser()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [InCart, setInCart] = useState(false);

  useEffect(()=>{
    loadproductcount();
  },[isLoaded,isSignedIn,])

  async function loadproductcount(){
    if(isLoaded && isSignedIn){
      const cartitems = await strapi.getSpecificCartProducts(user.id,product.documentId);
      console.log(cartitems,"zuzu")
      if(cartitems.length>0){
        if(cartitems[0].quantity>0){
          setInCart(true)
      }else{
        setInCart(false)
      }}
    }
  }
  
  
  async function addtoCart(){
    if(isSignedIn){
    const response = await strapi.addProducttoCart(user.id,product);
    loadproductcount();
  }
  }

  const getFirstImageUrl = (images) => {
    if (images && images.length > 0) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${images[0].url}`
    }
    return null
  }

  const getDescriptionText = (desc) => {
    if (desc && desc.length > 0 && desc[0].children) {
      return desc[0].children[0].text || ''
    }
    return ''
  }

  const getRandomRating = (id) => {
    const ratings = [4.2, 4.5, 4.7, 4.8, 4.9, 4.3, 4.6]
    return ratings[id % ratings.length]
  }

  const getRandomReviews = (id) => {
    const reviews = [23, 45, 67, 89, 112, 156, 78]
    return reviews[id % reviews.length]
  }

  const rating = getRandomRating(product.id)
  const reviewCount = getRandomReviews(product.id)
  const description = getDescriptionText(product.desc)
  
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
      {/* Product Images */}
      <div className="relative bg-gray-50 h-80 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <>
            <img
              src={getFirstImageUrl(product.images)}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Image Navigation Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Package className="h-10 w-10 text-indigo-600" />
              </div>
              <span className="text-indigo-600 font-medium text-lg">{product.category?.name || 'Product'}</span>
            </div>
          </div>
        )}
        
        {/* Stock Status */}
        {!product.instock && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Out of Stock
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        {product.category && (
          <div className="mb-3">
            <span className="text-sm text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
        )}
        
        {/* Product Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2 font-medium">
            {rating} ({reviewCount} reviews)
          </span>
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
          {InCart&&<Link href="/cart" className='font-bold rounded-2xl flex bg-gradient-to-br from-indigo-900 via-purple-600 to-pink-500 px-5 py-3 hover:scale-105 transition duration-300 gap-2'>
            <span className='text-white'>View Cart</span><ShoppingCart className='text-white'/>
            </Link>}
          {!InCart&&<button 
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 ${
              product.instock 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.instock}
            onClick={addtoCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>}
          
        </div>
        {/* Stock Status Text */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className={`text-sm font-medium ${
            product.instock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.instock ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}
