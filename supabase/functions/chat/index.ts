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

    const qualificationInstructions = {
      fr: `
FLUX DE QUALIFICATION OBLIGATOIRE:
Tu DOIS collecter les informations suivantes dans cet ordre précis:
1. Prénom et Nom de famille
2. Numéro de téléphone
3. Adresse email
4. Contenu détaillé de leur demande/projet

COMPORTEMENT ATTENDU:
- Commence par demander le nom après ton message d'accueil
- Collecte UNE information à la fois
- Sois conversationnel mais reste concentré sur la collecte
- Quand tu as TOUTES les informations, fais un récapitulatif:
  "Si j'ai bien compris, voici vos informations:
   - Nom: [prénom nom]
   - Téléphone: [numéro]
   - Email: [email]
   - Votre demande: [résumé de la demande]
   Est-ce correct?"
- Après confirmation, remercie et indique qu'un membre de l'équipe les contactera sous 24h`,

      en: `
MANDATORY QUALIFICATION FLOW:
You MUST collect the following information in this precise order:
1. First and Last name
2. Phone number
3. Email address
4. Detailed content of their request/project

EXPECTED BEHAVIOR:
- Start by asking for their name after your welcome message
- Collect ONE piece of information at a time
- Be conversational but stay focused on collection
- When you have ALL information, provide a summary:
  "Let me confirm your information:
   - Name: [first last]
   - Phone: [number]
   - Email: [email]
   - Your request: [summary of request]
   Is this correct?"
- After confirmation, thank them and indicate a team member will contact them within 24h`,

      he: `
תהליך הסמכה חובה:
אתה חייב לאסוף את המידע הבא בסדר מדויק:
1. שם פרטי ושם משפחה
2. מספר טלפון
3. כתובת אימייל
4. תוכן מפורט של הבקשה/הפרויקט שלהם

התנהגות צפויה:
- התחל בבקשת השם שלהם אחרי הודעת הברכה
- אסוף פריט מידע אחד בכל פעם
- היה שיחתי אבל הישאר ממוקד באיסוף
- כשיש לך את כל המידע, ספק סיכום:
  "בוא נאשר את הפרטים שלך:
   - שם: [שם פרטי משפחה]
   - טלפון: [מספר]
   - אימייל: [אימייל]
   - הבקשה שלך: [סיכום הבקשה]
   האם זה נכון?"
- לאחר אישור, הודה להם וציין שחבר צוות יצור קשר תוך 24 שעות`
    };

    const systemPrompt = `Tu es l'assistant virtuel de Zyflows, une agence de solutions digitales spécialisée dans:
- Stratégie & Intelligence de Processus (audit, cartographie, roadmap IA)
- Automation Intelligente (workflows automatisés, intégrations Make/Zapier/N8N)
- Plateformes & Applications IA (sites web, applications métier, chatbots)
- Structuration Digitale (bases de données, dashboards, documentation)

${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.fr}

${qualificationInstructions[language as keyof typeof qualificationInstructions] || qualificationInstructions.fr}

IMPORTANT: 
- Sois professionnel, amical et concis
- Utilise des emojis avec modération (1-2 par message max)
- Ne fournis PAS d'informations détaillées sur les services avant d'avoir collecté les coordonnées
- Tu peux répondre brièvement aux questions générales mais ramène toujours la conversation vers la qualification

Contact de l'équipe: 
- WhatsApp: +972 58-422-9255 | +33 7 69 03 58 29
- Email: contact@zyflows.com`;

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
