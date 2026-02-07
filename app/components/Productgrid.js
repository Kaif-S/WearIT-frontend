'use client'

import { useState, useEffect } from 'react'
import { Star, Heart, ShoppingCart, Package } from 'lucide-react'
import { strapi } from '../lib/strapi'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const fetchedProducts = await strapi.getProducts() // Changed to getProducts to get all products
      setProducts(fetchedProducts)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // Helper function to get first image URL
  const getFirstImageUrl = (images) => {
    if (images && images.length > 0) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${images[0].url}`
    }
    return null
  }

  // Helper function to extract text from rich text description
  const getDescriptionText = (desc) => {
    if (desc && desc.length > 0 && desc[0].children) {
      return desc[0].children[0].text || ''
    }
    return ''
  }

  // Helper function to generate random rating for demo
  const getRandomRating = (id) => {
    const ratings = [4.2, 4.5, 4.7, 4.8, 4.9, 4.3, 4.6]
    return ratings[id % ratings.length]
  }

  // Helper function to generate random review count
  const getRandomReviews = (id) => {
    const reviews = [23, 45, 67, 89, 112, 156, 78]
    return reviews[id % reviews.length]
  }

  if (loading) {
    return (
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading our curated selection of premium products...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium products, carefully chosen for their exceptional quality and design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Check your Strapi connection or add some products.</p>
          </div>
        )}
        
        {products.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-primary">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
