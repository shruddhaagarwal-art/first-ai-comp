// Health check endpoint
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
  
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: hasApiKey,
    message: hasApiKey ? 'Server is ready' : 'API key not configured - add ANTHROPIC_API_KEY environment variable'
  });
}
