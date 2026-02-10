// Vercel Serverless Function - Team Verification
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { teamNumber, teamType } = req.body;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  console.log(`Verifying ${teamType} team ${teamNumber}`);

  let teamName = null;

  try {
    // Try FTCScout API for FTC teams
    if (teamType === 'FTC') {
      const ftcResponse = await fetch(`https://api.ftcscout.org/rest/v1/teams/${teamNumber}`);
      if (ftcResponse.ok) {
        const data = await ftcResponse.json();
        if (data && data.name) {
          teamName = data.name;
          console.log('Found via FTCScout:', teamName);
        }
      }
    }

    // If not found, use AI to search firstinspires.org
    if (!teamName) {
      console.log('Searching with AI...');
      
      const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: 'user',
            content: `Search firstinspires.org/team-event-search for ${teamType} team number ${teamNumber}. Look for "Team Name:" field. Return ONLY the team name, or "NOT_FOUND".`
          }]
        })
      });

      const aiData = await aiResponse.json();
      
      if (aiData.content) {
        for (const item of aiData.content) {
          if (item.type === 'text') {
            const text = item.text.trim();
            if (text && text !== 'NOT_FOUND' && text.length < 100) {
              teamName = text;
              console.log('Found via AI:', teamName);
              break;
            }
          }
        }
      }
    }

    if (!teamName) {
      teamName = `${teamType} Team ${teamNumber}`;
    }

    res.json({ success: true, teamName });

  } catch (error) {
    console.error('Error:', error);
    res.json({ 
      success: false, 
      teamName: `${teamType} Team ${teamNumber}`,
      error: error.message 
    });
  }
}
