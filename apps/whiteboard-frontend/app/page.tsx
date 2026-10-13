"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, Palette, Users, Zap, Menu, X, Play, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-black/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Draw App
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#" className="hover:text-purple-400 transition-colors">GitHub</a>
            <button onClick={() => {
              router.push("/signin")
            }} className="text-gray-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300">
              Sign In
            </button>
            <button onClick={() => {
              router.push("/signup")
            }} className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Sign Up
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/20">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block hover:text-purple-400 transition-colors">Features</a>
              <a href="#" className="block hover:text-purple-400 transition-colors">GitHub</a>
              <button className="w-full text-gray-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300 text-left">
                Sign In
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Single Screen */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="flex-1 px-6 py-12 flex items-center">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Draw Ideas
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Into Reality
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                The most intuitive collaborative drawing tool. Create stunning diagrams and wireframes with zero learning curve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Drawing</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-purple-500/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>View Source</span>
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Intuitive</h3>
                  <p className="text-gray-400 text-sm">Easy to use</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Collaborative</h3>
                  <p className="text-gray-400 text-sm">Real-time sync</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Fast</h3>
                  <p className="text-gray-400 text-sm">Lightning speed</p>
                </div>
              </div>
            </div>

            {/* Right Side - Demo */}
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
                <div className="bg-gray-900/50 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                      <Palette className="w-10 h-10" />
                    </div>
                    <p className="text-gray-400">Interactive Canvas</p>
                    <p className="text-gray-500 text-sm">Start drawing instantly</p>
                  </div>
                  
                  {/* Floating animation elements */}
                  <div className="absolute top-8 left-8 w-4 h-4 bg-purple-500 rounded-full animate-bounce" />
                  <div className="absolute top-16 right-12 w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-12 left-16 w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-8 right-8 w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-6 border-t border-purple-500/20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Draw App
              </span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}