
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

    // Add logging to debug the API key
    console.log('Checking API key availability:', !!FINNHUB_API_KEY)
    
    if (!FINNHUB_API_KEY) {
      throw new Error('Finnhub API key is not configured')
    }

    console.log(`Fetching price for ${symbol}`)
    
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    )
    
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }

    return new Response(
      JSON.stringify({ price: data.c }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching stock price:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
