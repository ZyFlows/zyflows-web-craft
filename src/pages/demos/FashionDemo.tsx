import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, ArrowLeft, Search, User, Menu, Filter } from "lucide-react";
import DemoSEO from '@/components/DemoSEO';

const FashionDemo = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(3);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", count: 156 },
    { id: "dresses", name: "Dresses", count: 42 },
    { id: "tops", name: "Tops", count: 38 },
    { id: "bottoms", name: "Bottoms", count: 31 },
    { id: "accessories", name: "Accessories", count: 25 },
    { id: "shoes", name: "Shoes", count: 20 }
  ];

  const products = [
    {
      id: 1,
      name: "Silk Wrap Dress",
      price: 289,
      originalPrice: 350,
      image: "/placeholder.svg",
      category: "dresses",
      rating: 4.8,
      reviews: 124,
      sale: true
    },
    {
      id: 2,
      name: "Cashmere Sweater",
      price: 195,
      image: "/placeholder.svg",
      category: "tops",
      rating: 4.9,
      reviews: 89,
      sale: false
    },
    {
      id: 3,
      name: "High-Waist Trousers",
      price: 145,
      image: "/placeholder.svg",
      category: "bottoms",
      rating: 4.7,
      reviews: 156,
      sale: false
    },
    {
      id: 4,
      name: "Leather Handbag",
      price: 425,
      originalPrice: 520,
      image: "/placeholder.svg",
      category: "accessories",
      rating: 4.9,
      reviews: 203,
      sale: true
    },
    {
      id: 5,
      name: "Midi Floral Dress",
      price: 165,
      image: "/placeholder.svg",
      category: "dresses",
      rating: 4.6,
      reviews: 78,
      sale: false
    },
    {
      id: 6,
      name: "Designer Heels",
      price: 320,
      originalPrice: 400,
      image: "/placeholder.svg",
      category: "shoes",
      rating: 4.8,
      reviews: 145,
      sale: true
    }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleLike = (productId: number) => {
    setLikedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <>
      <DemoSEO
        title="Luxury Fashion Boutique Demo"
        description="Interactive luxury fashion boutique demo by zyFlows. Premium fashion e-commerce with elegant product displays, category filtering, and wishlist features. Built with React and Tailwind CSS."
        keywords="luxury fashion demo, boutique website, fashion e-commerce, premium clothing, online store, fashion template, zyFlows"
        path="/demo/fashion"
        demoType="WebApplication"
        category="Fashion E-commerce"
        features={["Category Filtering", "Wishlist", "Product Ratings", "Sale Items", "Responsive Gallery", "Shopping Cart"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-rose-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>

            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-serif text-rose-900">LUXE</h1>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">New In</a>
                <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">Clothing</a>
                <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">Accessories</a>
                <a href="#" className="text-gray-700 hover:text-rose-600 transition-colors">Sale</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-4 w-4" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-rose-500">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">✨ Fashion E-commerce Demo - Luxury Women's Fashion Boutique</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-100 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-serif text-rose-900 mb-6">
              Spring Collection 2024
            </h2>
            <p className="text-xl text-rose-700 mb-8 max-w-2xl mx-auto">
              Discover timeless elegance with our curated selection of luxury fashion pieces
            </p>
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3">
              Shop Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif text-gray-900">Shop by Category</h3>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-rose-600 hover:bg-rose-700" 
                  : "hover:bg-rose-50 hover:border-rose-300"
                }
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.sale && (
                    <Badge className="absolute top-3 left-3 bg-rose-500">
                      Sale
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedItems.includes(product.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700"
                      onClick={() => setCartItems(prev => prev + 1)}
                    >
                      Add to Bag
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-rose-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-serif mb-4">Stay in Style</h3>
          <p className="text-rose-100 mb-8">Get exclusive access to new collections and special offers</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900"
            />
            <Button className="bg-white text-rose-900 hover:bg-rose-50">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2024 LUXE Fashion Boutique. Demo created with Lovable.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default FashionDemo;