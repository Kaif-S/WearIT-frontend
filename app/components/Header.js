'use client'

import { useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">WearIT</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-indigo-600 transition-colors">Products</a>
            <a href="#categories" className="text-gray-700 hover:text-indigo-600 transition-colors">Categories</a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-indigo-600" />
            <Link href="/cart">
            <ShoppingBag className="h-5 w-5 text-gray-600 cursor-pointer hover:text-indigo-600" />
            </Link>
            {/* Authentication */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-sm text-gray-600">
                  Welcome, {user?.firstName}!
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-indigo-600 py-2 transition-colors">Home</a>
              <a href="#products" className="text-gray-700 hover:text-indigo-600 py-2 transition-colors">Products</a>
              <a href="#categories" className="text-gray-700 hover:text-indigo-600 py-2 transition-colors">Categories</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 py-2 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 py-2 transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
