import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Star, Users, ChefHat, UtensilsCrossed, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import DemoSEO from '@/components/DemoSEO';

const RestaurantDemo = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState(47);
  const [onlineOrders, setOnlineOrders] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setReservations(prev => prev + Math.floor(Math.random() * 3) - 1);
      setOnlineOrders(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const menuCategories = [
    { id: 'all', name: 'Tout', count: 28 },
    { id: 'starters', name: 'Entrées', count: 8 },
    { id: 'mains', name: 'Plats', count: 12 },
    { id: 'desserts', name: 'Desserts', count: 6 },
    { id: 'drinks', name: 'Boissons', count: 15 }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Foie Gras Poêlé',
      description: 'Foie gras de canard poêlé, compotée de figues, pain de mie toasté',
      price: 28,
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: 'Boeuf Bourguignon',
      description: 'Pièce de bœuf mijotée au vin rouge, légumes de saison, purée de pommes de terre',
      price: 32,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
      rating: 4.9,
      popular: true
    },
    {
      id: 3,
      name: 'Tarte Tatin',
      description: 'Tarte aux pommes caramélisées, glace vanille de Madagascar',
      price: 14,
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
      rating: 4.7,
      popular: false
    },
    {
      id: 4,
      name: 'Saumon Gravlax',
      description: 'Saumon mariné aux herbes fraîches, blinis maison, crème acidulée',
      price: 24,
      category: 'starters',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      rating: 4.6,
      popular: false
    }
  ];

  const chefSpecials = [
    {
      name: 'Menu Dégustation',
      description: '7 services créés par notre chef étoilé',
      price: 85,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop'
    },
    {
      name: 'Accord Mets & Vins',
      description: 'Sélection de vins pour accompagner votre repas',
      price: 45,
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&h=300&fit=crop'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <DemoSEO
        title="Restaurant Website Demo"
        description="Interactive restaurant website demo by zyFlows. Elegant dining experience with menu showcase, online ordering, reservations, and chef specials. Perfect for restaurants, cafes, and bistros."
        keywords="restaurant demo, restaurant website, online menu, food ordering, table reservation, restaurant template, cafe website, zyFlows"
        path="/demo/restaurant"
        demoType="WebApplication"
        category="Restaurant & Food"
        features={["Digital Menu", "Online Ordering", "Table Reservations", "Chef Specials", "Customer Reviews", "Live Wait Times"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-amber-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-white/20">
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-20 animate-pulse"></div>
                <h1 className="relative text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Le Petit Bistrot
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Paris 6ème</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <p className="text-sm font-medium relative z-10">
          🍽️ DÉMO INTERACTIVE - Site restaurant développé par zyFlows
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center max-w-4xl px-4">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Bienvenue au Petit Bistrot
              </h2>
              <p className="text-xl md:text-3xl mb-8 opacity-90 drop-shadow-lg">
                Cuisine française authentique depuis 1952
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-2xl hover:scale-105 transition-all duration-300">
                  <UtensilsCrossed className="mr-2 h-5 w-5" />
                  Voir la carte
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl hover:scale-105 transition-all duration-300">
                  <Clock className="mr-2 h-5 w-5" />
                  Réserver
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live indicators */}
        <div className="absolute top-8 right-8 flex flex-col space-y-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-3 text-gray-900 text-sm shadow-2xl border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="font-bold text-lg">{reservations}</span>
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-gray-600 font-medium">Réservations</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl px-6 py-3 text-sm shadow-2xl">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-5 w-5 animate-pulse" />
              <span className="font-bold text-lg">{onlineOrders}</span>
              <span>Commandes en cours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-4 group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 shadow-lg">
                <ChefHat className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chef Étoilé</h3>
              <p className="text-gray-600">Cuisine créative par notre chef primé Michelin</p>
            </div>
            
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-4 group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 shadow-lg">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ouvert 7j/7</h3>
              <p className="text-gray-600">12h-14h30 et 19h-23h tous les jours</p>
            </div>
            
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-4 group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 shadow-lg">
                <MapPin className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cœur de Paris</h3>
              <p className="text-gray-600">15 rue de la Gaité, Paris 6ème arrondissement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Specials */}
      <section className="py-16 bg-gradient-to-b from-white/50 to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Suggestions du Chef
            </h3>
            <p className="text-xl text-gray-600">Créations exclusives de notre chef étoilé</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chefSpecials.map((special, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-xl overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={special.image} 
                    alt={special.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-2xl font-bold mb-1">{special.name}</h4>
                    <p className="text-lg opacity-90">{special.price}€</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{special.description}</p>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Commander
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Notre Carte
            </h3>
            <p className="text-xl text-gray-600">Sélection de plats traditionnels français</p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" 
                    : "hover:bg-amber-50 hover:border-amber-300"
                }`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Menu items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-xl overflow-hidden">
                <div className="flex">
                  <div className="relative w-32 h-32 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    {item.popular && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                        ⭐ Populaire
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="text-2xl font-bold text-amber-600">{item.price}€</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(item.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{item.rating}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors duration-200" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Le Petit Bistrot</h3>
          <p className="text-gray-400 mb-6">Cuisine française authentique depuis 1952</p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>15 rue de la Gaité, Paris 6ème</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>01 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>12h-14h30 • 19h-23h</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 Le Petit Bistrot. Site développé par zyFlows.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default RestaurantDemo;