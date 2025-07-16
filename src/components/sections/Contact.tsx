import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Phone, Mail, MapPin, Calendar, Clock, Globe, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
const Contact = () => {
  const {
    t
  } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    project: "",
    budget: "",
    message: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const services = [t('contact.service1'), t('contact.service2'), t('contact.service3'), t('contact.service4'), t('contact.service5'), t('contact.service6'), t('contact.service7'), t('contact.service8')];
  const budgetRanges = [t('contact.budget1'), t('contact.budget2'), t('contact.budget3'), t('contact.budget4'), t('contact.budget5'), t('contact.budget6')];
  const timelines = [t('contact.timeline1'), t('contact.timeline2'), t('contact.timeline3'), t('contact.timeline4'), t('contact.timeline5')];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      toast({
        title: t('contact.success_title'),
        description: t('contact.success_desc')
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        project: "",
        budget: "",
        message: "",
        timeline: ""
      });
    }, 2000);
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 animate-float opacity-10">
        <Send className="h-28 w-28 text-primary" />
      </div>

      
    </section>;
};
export default Contact;