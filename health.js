// Health check endpoint
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
  
  console.log('[HEALTH] Health check - API Key configured:', hasApiKey);
  
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: hasApiKey,
    nodeVersion: process.version,
    message: hasApiKey ? 'Server is ready' : 'API key not configured - add ANTHROPIC_API_KEY environment variable'
  });
};
