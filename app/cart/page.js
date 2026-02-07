"use client"
import React, { useState , useEffect} from 'react';
import { useUser } from '@clerk/nextjs';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { strapi } from '../lib/strapi';
import Link from 'next/link';

const CartPage = () => {
  const {isSignedIn, user, isLoaded} = useUser();
  const [cartData, setCartData] = useState([]);
  const [IsChange,setIsChange] = useState(false);

  useEffect(() => {
    loadCartitems()
  }, [isLoaded,isSignedIn])

  useEffect(()=>{
    setIsChange(true)
 },[cartData])

  const OnUpdateCart = async() =>{
    if(isLoaded && isSignedIn){
      const response = await strapi.updateCart(user.id,cartData)
      console.log("this is response after updating cart: ",response);
      setIsChange(false)
    }
  }
  const loadCartitems = async() => {
    if(isLoaded && isSignedIn){
      const response  = await strapi.getCartItems(user.id);
      console.log(response)
      setCartData(response);
      setTimeout(() => {
      setIsChange(false)
    }, 140);
    }
  }
  

  const activeCart = cartData.find(cart => cart.CartStatus === 'active');
  const cartItems = activeCart?.caritem || [];

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartData(prevData =>
      prevData.map(cart => ({
        ...cart,
        caritem: cart.caritem.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      }))
    );
  };

  const removeItem = (itemId) => {
    setCartData(prevData =>
      prevData.map(cart => ({
        ...cart,
        caritem: cart.caritem.filter(item => item.id !== itemId)
      }))
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.priceSnapshot * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    return subtotal + tax + shipping;
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-purple-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="flex items-center text-white/80 hover:text-white transition-colors mr-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-24 h-24 rounded-xl object-cover border-2 border-purple-200"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.productName}
                    </h3>
                    
                    {/* Price and Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${item.priceSnapshot.toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border-2 border-purple-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-purple-50 text-purple-600 transition-colors rounded-l-lg"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-800 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-purple-50 text-purple-600 transition-colors rounded-r-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-3 text-right">
                      <span className="text-sm text-gray-600">Subtotal: </span>
                      <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${(item.priceSnapshot * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-purple-600" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>

                {subtotal < 50 && (
                  <div className="text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="border-t-2 border-purple-100 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
              </Link>
              <button disabled={!IsChange} onClick={OnUpdateCart} className="w-full mt-4 disabled:border disabled:border-gray-200 disabled:font-thin disabled:text-gray-400 bg-white  py-4 rounded-xl font-semibold text-lg not-disabled:hover:bg-gray-200 transition-all duration-300 transform not-disabled:hover:scale-105 not-disabled:shadow-lg flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Update Cart
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Secure checkout powered by Stripe</p>
              </div>

              {/* Cart Metadata */}
              <div className="mt-6 pt-6 border-t border-purple-100">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Cart ID: {activeCart?.documentId.slice(-8)}</p>
                  <p>Status: <span className="text-green-600 font-medium">{activeCart?.CartStatus}</span></p>
                  <p>Last Updated: {new Date(activeCart?.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;