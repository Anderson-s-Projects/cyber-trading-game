
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const FINNHUB_API_KEY = Deno.env.get('FINNHUB_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { symbol } = await req.json()
    
    if (!symbol) {
      throw new Error('Stock symbol is required')
    }

    // Add detailed logging for debugging
    console.log('Debug Info:')
    console.log('- Symbol:', symbol)
    console.log('- API Key exists:', !!FINNHUB_API_KEY)
    
    if (!FINNHUB_API_KEY) {
      throw new Error('Finnhub API key is not configured')
    }

    console.log('Attempting to fetch data from Finnhub API...')
    
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    )
    
    const data = await response.json()
    
    // Log the Finnhub API response for debugging
    console.log('Finnhub API Response:', data)
    
    if (data.error) {
      throw new Error(`Finnhub API error: ${data.error}`)
    }

    return new Response(
      JSON.stringify({ price: data.c }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
    })
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
