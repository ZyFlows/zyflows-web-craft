import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  project?: string;
  budget?: string;
  message: string;
  timeline?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log('Received form data:', formData);

    // URL webhook Make hardcodée
    const webhookUrl = "https://hook.eu2.make.com/7su1w8p5otasvefjrkj5uphh4w35muwy";

    // Préparer les données pour Make
    const makeData = {
      timestamp: new Date().toISOString(),
      form_type: 'contact',
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      phone: formData.phone || '',
      service: formData.service || '',
      project: formData.project || '',
      budget: formData.budget || '',
      message: formData.message,
      timeline: formData.timeline || '',
      source: 'zyflows-website',
      language: 'fr', // ou détecter depuis les headers
    };

    console.log('Sending data to Make:', makeData);

    // Envoyer vers Make
    const makeResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(makeData),
    });

    console.log('Make response status:', makeResponse.status);

    if (!makeResponse.ok) {
      const errorText = await makeResponse.text();
      console.error('Make webhook error:', errorText);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Erreur lors de l\'envoi vers Make',
          details: errorText
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const makeResult = await makeResponse.text();
    console.log('Make webhook success:', makeResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Formulaire envoyé avec succès vers Make',
        makeResponse: makeResult
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in send-to-make function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erreur serveur',
        details: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);