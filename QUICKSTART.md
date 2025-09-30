# 🚀 TechTea Quick Start Guide

Get up and running in **5 minutes**!

## Prerequisites ✅

- Node.js 18+ installed
- npm or yarn
- Git (optional)

## Installation

### Step 1: Install Dependencies (2 minutes)
```bash
npm install
```

### Step 2: Setup Environment (1 minute)
```bash
cp .env.example .env
```

> **Note**: The app works with default values for demo purposes. You can add real API keys later.

### Step 3: Run the App (1 minute)
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: **http://localhost:3000**

---

## 🎮 First Steps

### 1. Create Account (30 seconds)
- Click "Get Started"
- Enter username, email, password
- Click "Create Account"

### 2. Create Your First Room (30 seconds)
- Click "Create Room"
- Enter room name and description
- Choose public or private
- Click "Create Room"

### 3. Post Your First Update (1 minute)
- Click "Share Update"
- Choose update type
- Write your learning/achievement
- Add tags (optional)
- Click "Post Update"

### 4. Explore Features
- ✅ View Dashboard
- ✅ Check Leaderboard
- ✅ Join other rooms
- ✅ Like and comment on updates
- ✅ Update your profile

---

## 🔧 Common Tasks

### Add GitHub Integration
1. Settings → GitHub Username
2. Enter your GitHub username
3. Get GitHub token from: https://github.com/settings/tokens
4. Add to `.env`: `NEXT_PUBLIC_GITHUB_TOKEN=your_token`

### Add Wakatime Integration
1. Settings → Wakatime Username
2. Get API key from: https://wakatime.com/settings/account
3. Add to `.env`: `WAKATIME_API_KEY=your_key`

### Share an Update
1. Dashboard → "Share Update"
2. Select room
3. Write update
4. Enable integrations (optional)
5. Post!

### Install as PWA
**On Mobile:**
- Open in browser
- Look for "Add to Home Screen"
- Follow prompts

**On Desktop:**
- Chrome: Click install icon in address bar
- Edge: Settings → Apps → Install

---

## 📁 Project Structure

```
app/          → Pages
components/   → Reusable components
lib/          → Core logic
  contexts/   → State management
  services/   → API integrations
  types/      → TypeScript types
public/       → Static files
```

---

## 🎨 Key Features

| Feature | Description |
|---------|-------------|
| 🏠 **Rooms** | Create public/private learning rooms |
| 📝 **Updates** | Post daily learnings with blockchain verification |
| 🏆 **Leaderboard** | AI-powered daily rankings |
| 🔗 **Integrations** | GitHub, Wakatime, LeetCode, etc. |
| 📱 **PWA** | Install as mobile/desktop app |
| 🎯 **Social** | Share beautiful templates on social media |

---

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
npm run format       # Format with Prettier

# Analysis
npm run analyze      # Analyze bundle size
```

---

## 🎯 User Flow

```
1. Sign Up → 2. Create/Join Room → 3. Post Update → 4. View Leaderboard
                       ↓
              5. Share on Social Media
```

---

## 💡 Tips & Tricks

### 🔥 Power User Tips
1. **Streaks**: Post daily to build your streak
2. **Tags**: Use tags for better organization
3. **Integrations**: Connect all platforms for max score
4. **Templates**: Try all 3 share templates
5. **Blockchain**: Verified updates earn bonus points

### 🎨 Customization
- Update bio in Settings
- Add all integration usernames
- Join multiple rooms
- Create private rooms for close friends

### 📊 Leaderboard Strategy
- Post multiple update types (+5 pts each)
- Enable GitHub integration (+5 pts per commit)
- Get blockchain verification (+15 pts)
- Engage with others (+2 pts per like, +3 per comment)
- Code daily for Wakatime bonus (+10 pts per hour)

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

### Build fails?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Styles not loading?
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Icons not showing?
- Icons are placeholders
- Replace in `public/` directory
- See: `scripts/generate-icons.js`

---

## 📚 Learn More

- 📖 **Full Docs**: [README.md](./README.md)
- 🔧 **Setup Guide**: [SETUP.md](./SETUP.md)
- 🚀 **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🤝 **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- 📊 **Project Info**: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- ✅ **Status**: [STATUS.md](./STATUS.md)

---

## 🆘 Need Help?

- 🐛 **Bug Report**: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📧 **Email**: support@techtea.app
- 🐦 **Twitter**: @techtea_app

---

## 🎉 What's Next?

After setup, try:
1. ✅ Invite friends to your room
2. ✅ Post your first week of updates
3. ✅ Connect all integrations
4. ✅ Build a 7-day streak
5. ✅ Reach #1 on leaderboard!

---

**Ready to learn? Let's brew some tech! ☕**

Built with ❤️ by developers, for developers.