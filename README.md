# TechTea ☕ - Tech Learning Community PWA

![TechTea Banner](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge)

> A Progressive Web App for tech learning communities where friends share daily tech updates, learnings, and progress in organized rooms with blockchain-powered immutability.

[Live Demo](https://techtea.app) • [Documentation](./SETUP.md) • [Report Bug](https://github.com/your-repo/issues)

---

# TechTea ☕ - Tech Learning Community PWA

A Progressive Web App (PWA) for tech learning communities where friends can share daily tech updates, learnings, and progress in organized rooms. Built with Next.js 14, TypeScript, and blockchain technology.

## 🚀 Features

### Core Features
- **Learning Rooms**: Create or join public/private rooms with real-time updates
- **Daily Updates**: Post tech learnings, reads, and progress with blockchain-powered immutability
- **Social Sharing**: Beautiful update templates for social media platforms
- **Integrations**: GitHub, Wakatime, LeetCode, HackerRank, CodeChef connections
- **AI Leaderboards**: Daily leaderboards with AI-powered insights

### Tech Features
- **PWA Support**: Full offline support, installable app
- **Blockchain**: Immutable update storage using Ethereum/Polygon
- **Real-time**: Live updates using Socket.io
- **Responsive**: Mobile-first design with terminal-inspired aesthetics
- **Dark Theme**: GitHub-inspired dark color scheme

## 🎨 Design System

### Colors
- Primary: `#0D1117` (GitHub dark)
- Secondary: `#21262D` (dark grey)
- Accent: `#58A6FF` (GitHub blue)
- Success: `#238636` (green)
- Warning: `#F85149` (red)
- Text: `#F0F6FC` (light grey)

### Typography
- Fonts: JetBrains Mono, Fira Code, SF Mono
- Base spacing: 16px
- Terminal-inspired with Nerd Fonts icons

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TechTea
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API keys:
   - GitHub OAuth credentials
   - Wakatime API key
   - Blockchain RPC endpoint
   - OpenAI API key (for AI insights)
   - Coding platform credentials

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (Optional - currently using local storage)
DATABASE_URL=postgresql://user:password@localhost:5432/techtea

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# GitHub Integration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXT_PUBLIC_GITHUB_TOKEN=your-personal-access-token

# Wakatime Integration
WAKATIME_API_KEY=your-wakatime-api-key

# Blockchain (Ethereum/Polygon)
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://polygon-rpc.com
NEXT_PUBLIC_CONTRACT_ADDRESS=your-contract-address
PRIVATE_KEY=your-private-key

# AI/OpenAI
OPENAI_API_KEY=your-openai-api-key

# Socket.io (Optional - for real-time features)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### API Keys Setup

#### GitHub
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Copy Client ID and Secret to `.env`

#### Wakatime
1. Visit [Wakatime Settings](https://wakatime.com/settings/account)
2. Copy your API key to `.env`

#### Blockchain
1. Get RPC endpoint from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
2. Deploy the smart contract (contract code not included - implement as needed)
3. Add contract address to `.env`

## 🏗️ Project Structure

```
TechTea/
├── app/                      # Next.js 14 App Router
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Main dashboard
│   ├── rooms/               # Room management
│   ├── leaderboard/         # Leaderboard page
│   ├── profile/             # User profile
│   ├── settings/            # Settings page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── modals/             # Modal components
│   ├── Navbar.tsx          # Navigation bar
│   ├── UpdateCard.tsx      # Update card component
│   ├── RoomCard.tsx        # Room card component
│   ├── StatsCard.tsx       # Stats card component
│   └── ShareTemplates.tsx  # Social sharing templates
├── lib/                     # Core libraries
│   ├── contexts/           # React contexts
│   ├── services/           # API services
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   └── icons/              # App icons
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🚀 Building for Production

```bash
npm run build
npm start
```

For PWA deployment:
1. Ensure all environment variables are set
2. Add proper icons to `public/` directory (192x192 and 512x512)
3. Update `manifest.json` with your app details
4. Deploy to Vercel, Netlify, or your preferred host

## 📱 PWA Features

- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Works offline with cached data
- **Push Notifications**: Real-time update notifications
- **Background Sync**: Sync data when connection restored

## 🔗 Integrations

### Supported Platforms
- ✅ GitHub (commits, PRs, issues)
- ✅ Wakatime (coding time, languages, projects)
- ✅ LeetCode (problems solved, rating)
- ✅ HackerRank (challenges, badges)
- ✅ CodeChef (contests, rating)

### Social Media Sharing
- Twitter/X
- LinkedIn
- Facebook
- Custom templates (Card, Timeline, Stats)

## 🎯 Usage

### Creating a Room
1. Go to Dashboard
2. Click "Create Room"
3. Enter room details
4. Choose public or private
5. Share invite code with friends

### Posting Updates
1. Join a room
2. Click "Share Update"
3. Choose update type (learning, achievement, progress, read)
4. Add content, tags, and links
5. Enable integrations (GitHub, Wakatime)
6. Post (automatically stored on blockchain)

### Viewing Leaderboard
1. Navigate to Leaderboard
2. Select a room
3. View daily rankings and AI insights
4. Track your progress

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand, React Context
- **Blockchain**: Ethers.js
- **Real-time**: Socket.io
- **PWA**: next-pwa
- **Charts**: Recharts
- **Date**: date-fns
- **Icons**: Lucide React

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by GitHub and Discord
- Icons from Lucide React
- Fonts from JetBrains and Google Fonts

## 📧 Support

For support, email support@techtea.app or open an issue on GitHub.

---

Built with ❤️ for tech learners, by tech learners.