import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Filter, Search, Truck, Shield, RotateCcw, Zap, Users, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

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
      title: "Collection Automne 2024",
      subtitle: "Découvrez nos pièces tendances",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: "Découvrir"
    },
    {
      title: "Flash Sale - 50% OFF",
      subtitle: "Offre limitée sur une sélection",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
      cta: "Profiter"
    },
    {
      title: "Livraison Gratuite",
      subtitle: "Dès 50€ d'achat partout en France",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=600&fit=crop",
      cta: "Commander"
    }
  ];

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
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const benefits = [
    { icon: Truck, title: "Livraison 24h", desc: "Gratuite dès 50€" },
    { icon: RotateCcw, title: "Retours 30j", desc: "Satisfait ou remboursé" },
    { icon: Shield, title: "Paiement sécurisé", desc: "SSL & 3D Secure" },
    { icon: Zap, title: "Support 7j/7", desc: "Équipe dédiée" }
  ];

  const testimonials = [
    { name: "Sophie M.", text: "Service client exceptionnel ! Livraison rapide et produits de qualité.", rating: 5, verified: true },
    { name: "Thomas L.", text: "Ma boutique préférée pour la mode. Toujours à la pointe des tendances.", rating: 5, verified: true },
    { name: "Emma R.", text: "Prix corrects et excellent service après-vente. Je recommande vivement !", rating: 5, verified: true }
  ];

  const collections = [
    { name: "Nouvelle Collection", items: 42, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop" },
    { name: "Best Sellers", items: 28, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop" },
    { name: "Promo Flash", items: 15, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop" }
  ];

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

      {/* Hero Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center animate-fade-in">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 hover-scale">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicateurs du carrousel */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Live indicators */}
        <div className="absolute top-6 right-6 flex flex-col space-y-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-gray-900 text-sm animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">{onlineUsers.toLocaleString()}</span>
              <Users className="h-4 w-4" />
            </div>
          </div>
          
          {flashSaleTime.minutes > 0 && (
            <div className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm animate-fade-in">
              <div className="flex items-center space-x-2">
                <Flame className="h-4 w-4" />
                <span className="font-medium">
                  Flash Sale: {flashSaleTime.minutes}:{flashSaleTime.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Collections Featured */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Collections Phares</h3>
            <p className="text-gray-600">Explorez nos sélections tendances</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold">{collection.name}</h4>
                    <p className="text-sm opacity-90">{collection.items} articles</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-white py-8 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mb-3 group-hover:bg-rose-200 transition-colors duration-300">
                  <benefit.icon className="h-6 w-6 text-rose-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h3>
            <p className="text-gray-600">Plus de 10 000 clients satisfaits</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{testimonial.name}</span>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        ✓ Achat vérifié
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
      <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Restez informé(e)</h3>
          <p className="text-xl mb-8 opacity-90">Recevez nos dernières nouveautés et offres exclusives</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Votre email..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button size="lg" variant="secondary" className="px-8">
              S'abonner
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">Désinscription possible à tout moment</p>
        </div>
      </section>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Produit ajouté au panier !</span>
          </div>
        </div>
      )}

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