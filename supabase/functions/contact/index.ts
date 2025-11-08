// Proxy serveur pour contourner CORS et communiquer avec N8N
// Cette fonction est publique (pas besoin d'authentification)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Interface pour les données du formulaire
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  language: string;
}

Deno.serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204 
    });
  }

  try {
    console.log('📥 [Contact Proxy] Requête reçue');

    // Validation de la méthode HTTP
    if (req.method !== 'POST') {
      console.warn('⚠️ [Contact Proxy] Méthode non autorisée:', req.method);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Méthode non autorisée' 
        }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Lecture et parsing du body
    const formData: ContactFormData = await req.json();
    console.log('📤 [Contact Proxy] Données reçues:', {
      email: formData.email,
      service: formData.service,
      language: formData.language
    });

    // Validation des champs requis
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.service || !formData.message) {
      console.error('❌ [Contact Proxy] Champs manquants');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Tous les champs obligatoires doivent être remplis' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error('❌ [Contact Proxy] Email invalide');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email invalide' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Préparation du payload pour N8N (nettoyage des données)
    const n8nPayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || '',
      company: formData.company?.trim() || '',
      service: formData.service,
      message: formData.message.trim(),
      language: formData.language
    };

    console.log('🚀 [Contact Proxy] Envoi vers N8N...');

    // Envoi vers le webhook N8N
    const n8nResponse = await fetch(
      'https://n8n.srv945050.hstgr.cloud/webhook-test/zyflows-contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(n8nPayload)
      }
    );

    console.log('📥 [Contact Proxy] Réponse N8N:', {
      status: n8nResponse.status,
      statusText: n8nResponse.statusText,
      ok: n8nResponse.ok
    });

    // Vérification du statut de la réponse N8N
    if (!n8nResponse.ok) {
      console.error('❌ [Contact Proxy] N8N a retourné une erreur:', n8nResponse.status);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Erreur du serveur N8N (${n8nResponse.status})` 
        }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Tentative de lecture de la réponse JSON (optionnel)
    let n8nResult;
    try {
      n8nResult = await n8nResponse.json();
      console.log('✅ [Contact Proxy] Réponse JSON N8N:', n8nResult);
    } catch (jsonError) {
      console.log('ℹ️ [Contact Proxy] Pas de JSON dans la réponse N8N (normal)');
      n8nResult = { success: true };
    }

    // Succès !
    console.log('🎉 [Contact Proxy] Message envoyé avec succès');
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message envoyé avec succès !' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ [Contact Proxy] Erreur inattendue:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Une erreur est survenue lors de l\'envoi du message',
        details: Deno.env.get('DENO_ENV') === 'development' ? errorMessage : undefined
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
