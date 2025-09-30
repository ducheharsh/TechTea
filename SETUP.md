# TechTea Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: GitHub Integration
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token

# Optional: Wakatime Integration  
NEXT_PUBLIC_WAKATIME_API_KEY=your_wakatime_api_key

# Optional: AI Features
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## Getting API Keys

### GitHub Personal Access Token
1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `read:user`
4. Copy the token to your `.env.local`

### Wakatime API Key
1. Go to [Wakatime Settings](https://wakatime.com/settings/api-key)
2. Copy your API key
3. Add to `.env.local`

### Coding Platform Usernames
- **LeetCode**: Your public username
- **HackerRank**: Your public profile username
- **CodeChef**: Your username

## PWA Icon Generation

Replace placeholder icons in `/public` with actual icons:

### Required Sizes:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### Quick Icon Generation:
Use [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) or create manually.

Recommended: Coffee cup (☕) icon with dark background (#0D1117)

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Set environment variables in your platform

## Features to Configure

### Blockchain
- Currently uses client-side SHA-256 hashing
- For production: Integrate with Ethereum/Polygon network
- Add smart contract deployment

### Notifications
- Enable push notifications in service worker
- Configure Firebase Cloud Messaging (optional)

### Database (Optional)
- Current: Local storage via Zustand
- For multi-device sync: Add Supabase/Firebase

## Troubleshooting

### PWA Not Installing
- Check manifest.json is accessible
- Ensure HTTPS in production
- Verify icon paths

### API Integration Issues
- Verify API keys are correct
- Check CORS settings
- Ensure rate limits aren't exceeded

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (requires 18+)

## Development Tips

### Hot Reload Issues
```bash
# Restart dev server
npm run dev
```

### Clearing Storage
- Open DevTools > Application > Storage > Clear site data

### Testing PWA
1. Build: `npm run build`
2. Start: `npm start`
3. Open Chrome DevTools > Lighthouse
4. Run PWA audit

## Next Steps

1. Replace placeholder icons with branded icons
2. Configure API integrations
3. Customize color scheme (if needed)
4. Add custom domain
5. Enable analytics (optional)

For issues, check the [GitHub Issues](https://github.com/yourusername/techtea/issues) page.