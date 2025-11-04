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
    const { medicines } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return new Response(
        JSON.stringify({ error: "No medicines provided" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Limit to 5 medicines
    if (medicines.length > 5) {
      return new Response(
        JSON.stringify({ error: "Maximum of 5 medicines allowed" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Build the standardized prompt for image generation
    const medicineNames = medicines.map((m: any) => m.medicineName || m.label).join(", ");
    const prompt = `Create a professional, realistic 3D product photograph of a transparent white plastic shopping bag (like pharmacy bags) filled with colorful medicine boxes.

COMPOSITION:
- Centered transparent plastic shopping bag on clean beige/cream background
- Inside the bag: ${medicines.length} colorful medicine boxes stacked naturally
- Soft studio lighting from top-left creating gentle shadows

CRITICAL - MEDICINE BOX LABELS:
Use ONLY these exact names on the medicine boxes: ${medicineNames}

DO NOT USE any other text. DO NOT use descriptive phrases. 
Use ONLY the branded medicine names provided above (e.g., GENZIUM®, DATANALGINA®, CRIATIDOL®, etc.)
Each box MUST display ONLY ONE of these branded names prominently on the front.

BOX DESIGN:
- Each box is a different vibrant color: purple, blue, green, yellow, pink, orange
- Modern minimalist pharmaceutical design with clean typography
- Display "Listra" logo in small text at bottom
- Medium rectangular pharmaceutical packaging style
- Labels are clearly readable, facing forward
- Large, bold text for the medicine names

STYLE:
- Photo-realistic 3D render
- Professional product photography aesthetic
- Soft studio lighting, no harsh shadows
- Clean, modern, professional
- High quality, sharp details
- Minimal design, pharmaceutical style`;

    console.log("Generating image with prompt:", prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { 
            status: 429, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your Lovable AI workspace." }),
          { 
            status: 402, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Generation response received");

    // Extract the base64 image from the response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data));
      throw new Error("No image generated in response");
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in generate-medicine-bag:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
