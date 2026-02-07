'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { strapi } from '../lib/strapi'

export default function Hero() {
  const [heroContent, setHeroContent] = useState(null)

  // Fallback content if Strapi data isn't available
  const defaultContent = {
    attributes: {
      title: "Discover Premium Products",
      subtitle: "Curated collection of exceptional quality items",
      description: "Experience the perfect blend of style, functionality, and craftsmanship with our handpicked selection of premium products.",
      buttonText: "Shop Now",
      secondaryButtonText: "Watch Demo"
    }
  }

  const content = heroContent || defaultContent

  return (
    <section className="relative bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {content.attributes.title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-4 font-light">
              {content.attributes.subtitle}
            </p>
            
            <p className="text-lg text-purple-200 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {content.attributes.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-indigo-900 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center group">
                {content.attributes.buttonText}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                {content.attributes.secondaryButtonText}
              </button>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl h-32 flex items-center justify-center">
                  <span className="text-white font-semibold">Premium</span>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl h-32 flex items-center justify-center">
                  <span className="text-white font-semibold">Quality</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl h-20 flex items-center justify-center">
                <span className="text-white font-semibold">Trusted by 10,000+ customers</span>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full opacity-50 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}