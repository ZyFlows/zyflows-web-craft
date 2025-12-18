import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Filter, Search, Truck, Shield, RotateCcw, Zap, Users, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import DemoSEO from '@/components/DemoSEO';

const EcommerceDemo = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const [flashSaleTime, setFlashSaleTime] = useState({ minutes: 23, seconds: 45 });

  // Animation des utilisateurs en ligne
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Compte à rebours flash sale
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashSaleTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 23, seconds: 45 }; // Reset
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "W Garoupt, Resesen Devlniret",
      subtitle: "Discover our elegant collection",
      image: "/src/assets/mockup-ecommerce.jpg",
      cta: "Explore Collection"
    },
    {
      title: "LarceFuidries up",
      subtitle: "Warmand to hages",
      image: "/src/assets/mockup-ecommerce-product.jpg",
      cta: "Shop Now"
    },
    {
      title: "Eternal Eletower",
      subtitle: "Premium fashion collection",
      image: "/src/assets/mockup-ecommerce-checkout.jpg",
      cta: "View Collection"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Elegant White Off-Shoulder Dress",
      price: 129,
      originalPrice: 189,
      image: "/src/assets/mockup-ecommerce.jpg",
      rating: 4.8,
      reviews: 124,
      sale: true
    },
    {
      id: 2,
      name: "Modern Brown Blazer",
      price: 179,
      image: "/src/assets/mockup-ecommerce-product.jpg",
      rating: 4.6,
      reviews: 89,
      sale: false
    },
    {
      id: 3,
      name: "Classic Beige Trench Coat",
      price: 85,
      image: "/src/assets/mockup-ecommerce-checkout.jpg",
      rating: 4.9,
      reviews: 156,
      sale: false
    },
    {
      id: 4,
      name: "Casual V-Neck Top",
      price: 95,
      originalPrice: 135,
      image: "/src/assets/mockup-ecommerce-product.jpg",
      rating: 4.7,
      reviews: 203,
      sale: true
    }
  ];

  const toggleLike = (productId: number) => {
    setLikedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const benefits = [
    { icon: Truck, title: "24h Delivery", desc: "Free over $50" },
    { icon: RotateCcw, title: "30-Day Returns", desc: "Money back guarantee" },
    { icon: Shield, title: "Secure Payment", desc: "SSL & 3D Secure" },
    { icon: Zap, title: "24/7 Support", desc: "Dedicated team" }
  ];

  const testimonials = [
    { name: "Sophie M.", text: "Exceptional customer service! Fast delivery and quality products.", rating: 5, verified: true },
    { name: "Thomas L.", text: "My favorite fashion store. Always on-trend with the latest styles.", rating: 5, verified: true },
    { name: "Emma R.", text: "Fair prices and excellent after-sales service. Highly recommend!", rating: 5, verified: true }
  ];

  const collections = [
    { name: "New Arrivals", items: 42, image: "/src/assets/mockup-ecommerce.jpg" },
    { name: "Best Sellers", items: 28, image: "/src/assets/mockup-ecommerce-product.jpg" },
    { name: "Flash Sale", items: 15, image: "/src/assets/mockup-ecommerce-checkout.jpg" }
  ];

  return (
    <>
      <DemoSEO
        title="E-commerce Fashion Store Demo"
        description="Interactive e-commerce fashion store demo by zyFlows. Modern shopping experience with product catalog, cart, wishlist, and checkout functionality. Built with React and Tailwind CSS."
        keywords="e-commerce demo, fashion store, online shopping, product catalog, shopping cart, wishlist, checkout, React e-commerce, zyFlows"
        path="/demo/ecommerce"
        demoType="WebApplication"
        category="E-commerce"
        features={["Product Catalog", "Shopping Cart", "Wishlist", "Flash Sales", "User Reviews", "Responsive Design"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse"></div>
                <h1 className="relative text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                  Exaogglerr
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-rose-500 transition-colors duration-200" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative group hover:bg-rose-50 transition-all duration-200">
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <p className="text-sm font-medium relative z-10">
          🎯 INTERACTIVE DEMO - E-commerce template developed by zyFlows
        </p>
      </div>

      {/* Hero Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center animate-fade-in max-w-4xl px-4">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-3xl mb-8 opacity-90 drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-0 shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-pink-500/25"
                >
                  {slide.cta}
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced carousel indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-white rounded-full' 
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Enhanced live indicators */}
        <div className="absolute top-8 right-8 flex flex-col space-y-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-3 text-gray-900 text-sm animate-fade-in shadow-2xl border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="font-bold text-lg">{onlineUsers.toLocaleString()}</span>
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-gray-600 font-medium">Online Now</span>
            </div>
          </div>
          
          {flashSaleTime.minutes > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl px-6 py-3 text-sm animate-fade-in shadow-2xl">
              <div className="flex items-center space-x-3">
                <Flame className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-lg">
                  Flash Sale: {flashSaleTime.minutes}:{flashSaleTime.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Collections Featured */}
      <section className="py-16 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured Collections
            </h3>
            <p className="text-xl text-gray-600">Explore our trending selections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-2xl font-bold mb-2">{collection.name}</h4>
                    <p className="text-lg opacity-90">{collection.items} items</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowLeft className="h-5 w-5 text-white rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-white/80 backdrop-blur-xl py-12 border-y border-white/20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-transparent to-pink-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl mb-4 group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <benefit.icon className="h-8 w-8 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white/60 backdrop-blur-xl py-8 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-rose-600 bg-clip-text text-transparent">
              New Arrivals
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-rose-50 hover:border-rose-300 transition-all duration-200 backdrop-blur-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-xl hover:scale-105 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    {product.sale && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
                        SALE
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110 ${
                        likedItems.includes(product.id) 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                          : 'bg-white/90 text-gray-600 hover:bg-white'
                      }`}
                      onClick={() => toggleLike(product.id)}
                    >
                      <Heart className="h-5 w-5" fill={likedItems.includes(product.id) ? 'currentColor' : 'none'} />
                    </Button>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-rose-600 transition-colors duration-300">{product.name}</h4>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 transition-colors duration-200 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-rose-600 bg-clip-text text-transparent">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={addToCart}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50/80 to-rose-50/80 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 bg-clip-text text-transparent mb-4">
              What Our Customers Say
            </h3>
            <p className="text-xl text-gray-600">Over 10,000 satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-xl hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-lg">{testimonial.name}</span>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        ✓ Verified Purchase
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-6">Stay in the Loop</h3>
          <p className="text-2xl mb-12 opacity-90">Get our latest arrivals and exclusive offers</p>
          <div className="max-w-lg mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email..."
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-xl bg-white/90 text-lg"
            />
            <Button 
              size="lg" 
              className="px-10 py-4 bg-white text-rose-600 hover:bg-gray-100 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-lg mt-6 opacity-75">Unsubscribe anytime. Privacy guaranteed.</p>
        </div>
      </section>

      {/* Enhanced Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-fade-in z-50 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">Added to Cart!</p>
              <p className="text-sm opacity-90">Continue shopping or checkout</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-gray-400 text-lg">
            © 2024 FashionHub - Template created by <span className="text-transparent bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text font-bold">zyFlows</span>
          </p>
          <p className="text-gray-500 mt-3 text-lg">
            Modern e-commerce experience with cutting-edge design
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default EcommerceDemo;