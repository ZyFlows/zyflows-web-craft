import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const EcommerceDemo = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Robe Élégante Noir",
      price: 129,
      originalPrice: 189,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      sale: true
    },
    {
      id: 2,
      name: "Blazer Moderne Camel",
      price: 179,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      sale: false
    },
    {
      id: 3,
      name: "Jupe Plissée Beige",
      price: 85,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d0e?w=400&h=600&fit=crop",
      rating: 4.9,
      reviews: 156,
      sale: false
    },
    {
      id: 4,
      name: "Pull Cocooning Rose",
      price: 95,
      originalPrice: 135,
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=600&fit=crop",
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Button>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                FashionStore
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-rose-500">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-rose-600 text-white text-center py-3">
        <p className="text-sm font-medium">
          🎯 DÉMO INTERACTIVE - Ceci est un aperçu du template e-commerce développé par zyFlows
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Collection Automne 2024
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Découvrez nos pièces tendances
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Découvrir la collection
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Nouveautés
            </h3>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.sale && (
                      <Badge className="absolute top-3 left-3 bg-red-500">
                        PROMO
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 h-8 w-8 rounded-full ${
                        likedItems.includes(product.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-600'
                      }`}
                      onClick={() => toggleLike(product.id)}
                    >
                      <Heart className="h-4 w-4" fill={likedItems.includes(product.id) ? 'currentColor' : 'none'} />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
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
                        <span className="text-xl font-bold text-gray-900">{product.price}€</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice}€</span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={addToCart}
                        className="bg-rose-600 hover:bg-rose-700"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 FashionStore - Template créé par <span className="text-rose-400 font-semibold">zyFlows</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cette démonstration présente les fonctionnalités e-commerce développées
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceDemo;