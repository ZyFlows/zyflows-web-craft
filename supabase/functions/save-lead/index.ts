import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  challenge: string;
  language: string;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();
    
    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.challenge) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert lead into database
    const { data, error } = await supabase
      .from("leads")
      .insert({
        first_name: leadData.firstName,
        last_name: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone || null,
        company: leadData.company || null,
        challenge: leadData.challenge,
        language: leadData.language || "en",
        source: "chatbot",
        status: "new"
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting lead:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification email via N8N webhook or direct email
    try {
      const emailContent = `
Nouvelle demande de contact via le chatbot Zyflows

📋 Informations du prospect:
- Nom: ${leadData.firstName} ${leadData.lastName}
- Email: ${leadData.email}
- Téléphone: ${leadData.phone || "Non fourni"}
- Entreprise: ${leadData.company || "Non fournie"}
- Langue: ${leadData.language}

💬 Demande:
${leadData.challenge}

---
Lead ID: ${data.id}
Date: ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
      `.trim();

      // Log the email content for now (can be sent via webhook later)
      console.log("New lead notification:", emailContent);

    } catch (emailError) {
      console.error("Error sending notification:", emailError);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ success: true, leadId: data.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Error in save-lead function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
