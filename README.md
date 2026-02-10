# FIRST Teams AI Assistant - Vercel Deployment

Deploy your own FIRST Teams AI Assistant for **FREE** on Vercel! Once deployed, anyone can use it without needing their own API key.

## 🚀 Quick Deploy (2 Minutes)

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "API Keys" in the left sidebar
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-`)
6. Keep it handy for Step 3

### Step 2: Deploy to Vercel

**Option A: Deploy via Vercel Website (Easiest)**

1. Go to https://vercel.com
2. Sign up with GitHub (free account)
3. Click "Add New" → "Project"
4. Click "Import Git Repository"
5. Upload this folder or connect your GitHub repo
6. Click "Deploy"

**Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to this folder
cd vercel-deploy

# Deploy
vercel

# Follow the prompts
```

### Step 3: Add Your API Key as Environment Variable

1. In your Vercel dashboard, click on your project
2. Go to "Settings" → "Environment Variables"
3. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key (sk-ant-...)
4. Click "Save"
5. Go to "Deployments" tab
6. Click the three dots (•••) on the latest deployment
7. Click "Redeploy"

### Step 4: Share Your URL!

Your app is now live at: `https://your-project-name.vercel.app`

Anyone can use this URL - no API key needed!

## 📁 File Structure

```
vercel-deploy/
├── api/
│   ├── chat.js           # AI chat endpoint
│   ├── verify-team.js    # Team verification endpoint
│   └── health.js         # Health check endpoint
├── index.html            # Frontend (must be in root)
├── vercel.json           # Vercel config
├── package.json          # Project info
├── .env.example          # Example environment file
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

**Important:** `index.html` must be in the root directory, NOT in a subdirectory.

## ✅ What You Get

- ✨ **Live URL** - Share with your entire team
- 🔒 **API Key Hidden** - No one needs to know your key
- 🆓 **Free Hosting** - Vercel's free tier is generous
- 🚀 **Auto Updates** - Push to GitHub, auto-deploys
- 🌍 **Fast Worldwide** - CDN-powered
- 📱 **Mobile Friendly** - Works on any device

## 🎯 Features

- **Team Verification**: Automatically finds team names
  - FTCScout API for established teams
  - AI search of firstinspires.org for new teams
- **AI-Powered Q&A**: Ask anything about FIRST Robotics
- **Conversation History**: Saved in browser
- **All Programs**: FLL, FTC, FRC

## 🔧 Testing Locally (Optional)

If you want to test before deploying:

**Requirements:**
- Node.js 20.x or higher

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev

# Open http://localhost:3000
```

Don't forget to create a `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Note:** The serverless functions use CommonJS (`module.exports`) for maximum Vercel compatibility.

## 🆘 Troubleshooting

**First Step: Check the Health Endpoint**
Visit `https://your-project-name.vercel.app/api/health` in your browser.

You should see:
```json
{
  "status": "ok",
  "apiKeyConfigured": true,
  "message": "Server is ready"
}
```

If `apiKeyConfigured` is `false`, your API key isn't set! Go to Settings → Environment Variables and add it.

**How to View Server Logs:**
1. Go to your Vercel dashboard
2. Click on your project
3. Click "Deployments" tab
4. Click on the latest deployment
5. Click "Functions" tab
6. Click on any function (verify-team, chat)
7. See the logs at the bottom

**"SyntaxError: Unexpected token '<', "<!DOCTYPE" is not valid JSON"**
- This means the HTML file is being served instead of the API endpoint
- **Solution:** Make sure `index.html` is in the ROOT directory, not in a subfolder
- Verify your file structure matches the one shown above
- Redeploy after fixing the structure

**"Server error" / "500 Internal Server Error"**
1. Check the health endpoint first (see above)
2. View function logs in Vercel dashboard
3. Most common issue: `ANTHROPIC_API_KEY` not set
4. Make sure you clicked "Redeploy" after adding the environment variable

**"Team verification failed"**
- Check that ANTHROPIC_API_KEY is set correctly in Vercel
- Make sure you redeployed after adding the environment variable
- Verify your API key is valid at console.anthropic.com

**"Error: API key not configured on server"**
- Your API key environment variable isn't set
- Go to Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = your key
- Click "Redeploy" in Deployments tab

**API calls not working**
- Environment variable might not be set
- Redeploy after adding ANTHROPIC_API_KEY
- Check the "Functions" tab in Vercel to see if API routes deployed correctly
- Try the health endpoint to verify configuration

## 💰 Cost

**Vercel:** FREE (generous free tier)
**Anthropic API:** Pay-as-you-go
- Claude Sonnet 4: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Web search adds minimal cost
- Typical team usage: $1-5/month

## 🔄 Updates

To update your deployment:

1. Edit files locally
2. Push to GitHub (if using GitHub integration)
3. Vercel auto-deploys

Or:

1. Edit files
2. Run `vercel --prod`

## 📧 Support

Questions? Issues? Check:
- Vercel docs: https://vercel.com/docs
- Anthropic docs: https://docs.anthropic.com

## Example Usage

Try team **31788** (FTC) - should find **"javaJuice"**!

---

Made for FIRST Robotics teams 🤖
