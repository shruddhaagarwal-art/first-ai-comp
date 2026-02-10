// Vercel Serverless Function - AI Chat
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, teamType, teamNumber, teamName } = req.body;
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    console.log(`[CHAT] Question from ${teamType} ${teamNumber}: ${question}`);

    // Check if API key exists
    if (!ANTHROPIC_API_KEY) {
      console.error('[CHAT] ANTHROPIC_API_KEY not set!');
      return res.status(200).json({ 
        success: false, 
        answer: 'Error: API key not configured on server. Please contact administrator.'
      });
    }

    console.log('[CHAT] Calling Anthropic API...');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{
          role: 'user',
          content: `You're an expert AI assistant for FIRST Robotics ${teamType}. The user is from team ${teamNumber} (${teamName}).

Use web search to find current information from:
- firstinspires.org (official FIRST site)
- For FTC: ftcscout.org, ftc-events.firstinspires.org
- For FRC: thebluealliance.com, frc-events.firstinspires.org
- For FLL: fll-events.firstinspires.org

Answer concisely and helpfully.

Question: ${question}`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[CHAT] Anthropic API error:', errorData);
      return res.status(200).json({ 
        success: false, 
        answer: 'Sorry, there was an error with the AI service. Please try again.'
      });
    }

    const data = await response.json();
    console.log('[CHAT] Response received from Anthropic');
    let answer = '';
    
    if (data.content) {
      for (const item of data.content) {
        if (item.type === 'text') {
          answer += item.text;
        }
      }
    }

    if (!answer) {
      answer = 'Sorry, I couldn\'t generate a response. Please try again.';
    }

    console.log('[CHAT] Returning answer');
    return res.status(200).json({ success: true, answer });

  } catch (error) {
    console.error('[CHAT] Handler error:', error.message, error.stack);
    return res.status(500).json({ 
      success: false, 
      answer: 'Sorry, an internal error occurred. Please try again.',
      error: error.message 
    });
  }
};

