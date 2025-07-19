import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Bed, Bath, Square, Heart, Search, Phone } from "lucide-react";

const RealEstateDemo = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      price: "$750,000",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop",
      location: "Downtown District",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Sale"
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      price: "$1,250,000",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      location: "Hillside Estates",
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: "Sale"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-2xl font-bold text-blue-900">Premier Properties</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><Search className="h-4 w-4" /></Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">🏡 Luxury Real Estate Demo - Find Your Dream Home</p>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-blue-900 mb-6">Luxury Properties Await</h2>
          <p className="text-xl text-blue-700 mb-8">Discover exceptional homes in premier locations</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">View All Properties</Button>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-3 left-3 bg-blue-600">{property.type}</Badge>
                  <Button variant="ghost" size="sm" className="absolute top-3 right-3 bg-white/80">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-900 mb-2">{property.price}</div>
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center"><Bed className="h-4 w-4 mr-1" />{property.beds} beds</span>
                    <span className="flex items-center"><Bath className="h-4 w-4 mr-1" />{property.baths} baths</span>
                    <span className="flex items-center"><Square className="h-4 w-4 mr-1" />{property.sqft} sqft</span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 Premier Properties. Real Estate Demo created with Lovable.</p>
        </div>
      </footer>
    </div>
  );
};

export default RealEstateDemo;