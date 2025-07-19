import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Bed, Bath, Square, Heart, Search, Phone, Filter, Star, Car, Waves, TreePine, Crown, Sparkles, ChevronRight } from "lucide-react";

const RealEstateDemo = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [propertyType, setPropertyType] = useState("all");

  const luxuryProperties = [
    {
      id: 1,
      title: "Oceanfront Penthouse",
      price: "$8,750,000",
      image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop",
      location: "Malibu Coast, CA",
      beds: 4,
      baths: 5,
      sqft: 4500,
      type: "Penthouse",
      features: ["Ocean View", "Private Pool", "Wine Cellar"],
      rating: 5,
      status: "New Listing"
    },
    {
      id: 2,
      title: "Modern Villa Estate",
      price: "$12,500,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      location: "Beverly Hills, CA",
      beds: 6,
      baths: 8,
      sqft: 8200,
      type: "Villa",
      features: ["Tennis Court", "Guest House", "Smart Home"],
      rating: 5,
      status: "Exclusive"
    },
    {
      id: 3,
      title: "Luxury Mountain Retreat",
      price: "$6,200,000",
      image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop",
      location: "Aspen, CO",
      beds: 5,
      baths: 6,
      sqft: 6500,
      type: "Chalet",
      features: ["Ski Access", "Fireplace", "Mountain View"],
      rating: 5,
      status: "Hot"
    },
    {
      id: 4,
      title: "Historic Luxury Mansion",
      price: "$15,800,000",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
      location: "Greenwich, CT",
      beds: 8,
      baths: 10,
      sqft: 12000,
      type: "Mansion",
      features: ["Historic Property", "Library", "Ballroom"],
      rating: 5,
      status: "Featured"
    },
    {
      id: 5,
      title: "Waterfront Contemporary",
      price: "$9,400,000",
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&h=600&fit=crop",
      location: "The Hamptons, NY",
      beds: 6,
      baths: 7,
      sqft: 7800,
      type: "Contemporary",
      features: ["Private Beach", "Dock", "Pool House"],
      rating: 5,
      status: "New Listing"
    },
    {
      id: 6,
      title: "Urban Luxury Loft",
      price: "$4,750,000",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      location: "SoHo, NYC",
      beds: 3,
      baths: 4,
      sqft: 3200,
      type: "Loft",
      features: ["City View", "Rooftop Access", "Exposed Brick"],
      rating: 4,
      status: "Available"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New Listing": return "bg-emerald-500 text-white";
      case "Exclusive": return "bg-purple-600 text-white";
      case "Hot": return "bg-red-500 text-white";
      case "Featured": return "bg-amber-500 text-white";
      default: return "bg-blue-600 text-white";
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes("Ocean") || feature.includes("Beach")) return <Waves className="h-3 w-3" />;
    if (feature.includes("Pool") || feature.includes("Tennis")) return <Car className="h-3 w-3" />;
    if (feature.includes("Mountain") || feature.includes("View")) return <TreePine className="h-3 w-3" />;
    return <Sparkles className="h-3 w-3" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hover:bg-stone-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Prestige Properties
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hover:bg-stone-100">
                <Search className="h-4 w-4" />
              </Button>
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm flex items-center justify-center">
            <Crown className="h-4 w-4 mr-2" />
            Luxury Real Estate Demo - Exclusive Properties for Discerning Clients
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium">Premier Luxury Collection</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Extraordinary
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Properties
            </span>
          </h2>
          <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the world's most exclusive luxury properties, curated for the most discerning clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 text-lg">
              Explore Collection
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Schedule Private Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-stone-600" />
              <span className="font-medium text-stone-700">Refine Search:</span>
            </div>
            <Input
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-5m">Under $5M</SelectItem>
                <SelectItem value="5-10m">$5M - $10M</SelectItem>
                <SelectItem value="10m+">$10M+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="mansion">Mansion</SelectItem>
                <SelectItem value="contemporary">Contemporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Featured Properties</h3>
            <p className="text-stone-600 text-lg">Handpicked luxury estates from our exclusive portfolio</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {luxuryProperties.map((property, index) => (
              <Card key={property.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <Badge className={`absolute top-4 left-4 ${getStatusColor(property.status)} px-3 py-1 text-xs font-medium`}>
                    {property.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white">
                    <Heart className="h-4 w-4 text-stone-600" />
                  </Button>
                  
                  {/* Property Type Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {property.type}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    {[...Array(property.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {property.price}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-amber-600 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-stone-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                    {property.location}
                  </p>
                  
                  {/* Property Details */}
                  <div className="grid grid-cols-3 gap-4 text-sm text-stone-600 mb-4 py-3 border-t border-stone-100">
                    <div className="flex items-center justify-center">
                      <Bed className="h-4 w-4 mr-1 text-stone-500" />
                      <span className="font-medium">{property.beds}</span> beds
                    </div>
                    <div className="flex items-center justify-center">
                      <Bath className="h-4 w-4 mr-1 text-stone-500" />
                      <span className="font-medium">{property.baths}</span> baths
                    </div>
                    <div className="flex items-center justify-center">
                      <Square className="h-4 w-4 mr-1 text-stone-500" />
                      <span className="font-medium">{property.sqft.toLocaleString()}</span> sqft
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-1 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-700">
                          {getFeatureIcon(feature)}
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50">
                      Schedule Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 px-8">
              Load More Properties
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Crown className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h3 className="text-4xl font-bold mb-6">Ready to Find Your Dream Property?</h3>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Our luxury real estate specialists are ready to help you discover the perfect property that matches your lifestyle and investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
              Browse All Listings
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-6 w-6 text-amber-400" />
            <span className="text-xl font-bold">Prestige Properties</span>
          </div>
          <p className="text-stone-400">© 2024 Prestige Properties. Luxury Real Estate Demo created with Lovable.</p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-stone-400">
            <span>Licensed Real Estate Broker</span>
            <span>•</span>
            <span>Equal Housing Opportunity</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RealEstateDemo;