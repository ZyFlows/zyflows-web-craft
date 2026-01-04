import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const languageInstructions = {
      fr: "Réponds TOUJOURS en français.",
      en: "ALWAYS respond in English.",
      he: "תענה תמיד בעברית."
    };

    const systemPrompt = `Tu es l'assistant virtuel de zyFlows, une agence de solutions digitales spécialisée dans:
- Sites web professionnels (Wix, WordPress, Shopify, Framer)
- Applications sur-mesure
- Automatisations intelligentes (Make, Zapier, N8N)
- Génération de leads via Google Maps API
- IA & agents GPT personnalisés

${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.en}

Ton rôle:
1. Accueillir chaleureusement les visiteurs
2. Répondre aux questions sur les services zyFlows
3. Qualifier les leads en posant des questions pertinentes:
   - Type de projet recherché
   - Budget approximatif
   - Délais souhaités
   - Coordonnées (nom, email, téléphone)
4. Proposer de planifier un appel ou de contacter via WhatsApp

Sois professionnel, amical et concis. Utilise des emojis avec modération.
Si tu ne connais pas une information, propose de mettre en contact avec l'équipe.

Contact: +972 58-422-9255 | +33 7 69 03 58 29
Email: contact@zyflows.com`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes. Veuillez réessayer dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporairement indisponible." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
