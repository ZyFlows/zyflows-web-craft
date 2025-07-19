import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, User, Heart, MessageCircle, Share2, Calendar } from "lucide-react";

const LifestyleBlogDemo = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "Finding Balance in a Busy World",
      excerpt: "Simple mindfulness practices that fit into your daily routine...",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop",
      category: "Wellness",
      date: "March 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Sustainable Living Made Simple",
      excerpt: "Easy swaps for a more eco-conscious lifestyle...",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      category: "Lifestyle",
      date: "March 12, 2024",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hover:bg-rose-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-2xl font-serif text-rose-900">Life & Style</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><Search className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><User className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">📝 Lifestyle Blog Demo - Wellness, Fashion & Life Inspiration</p>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif text-rose-900 mb-6">Living with Intention</h2>
          <p className="text-xl text-rose-700 mb-8">Stories, tips, and inspiration for a more mindful life</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-rose-100 text-rose-700">{post.category}</Badge>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><MessageCircle className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                    </div>
                    <Button variant="link" className="text-rose-600">Read More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 Life & Style Blog. Demo created with Lovable.</p>
        </div>
      </footer>
    </div>
  );
};

export default LifestyleBlogDemo;