# ☕ TechTea - Tech Learning Community PWA

A Progressive Web App for tech learning communities where friends can share daily tech updates, learnings, and progress in organized rooms.

![TechTea](https://img.shields.io/badge/Tech-Learning-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PWA](https://img.shields.io/badge/PWA-Ready-success)

## 🎥 Demo

[Live Demo](https://techtea.vercel.app) (Coming Soon)

## ✨ Features

### 🏠 Learning Rooms
- Create public or private learning communities
- Password-protected private rooms
- Real-time member management
- Room-specific activity feeds

### 📝 Daily Updates
- Post your daily learnings and progress
- Markdown support for rich text formatting
- Code syntax highlighting
- Blockchain-secured immutability

### 🔗 Integrations
- **GitHub**: Track commits and repository stats
- **Wakatime**: Monitor coding time and languages
- **LeetCode**: Import problem-solving progress
- **HackerRank**: Sync competitive programming stats
- **CodeChef**: Connect coding achievements

### 🏆 AI-Powered Leaderboards
- Daily, weekly, and all-time rankings
- AI-generated insights and achievements
- Points system based on activity and engagement
- Competitive learning environment

### 📱 Social Sharing
- Beautiful update templates (Minimal, Detailed, Stats)
- Share to Twitter and LinkedIn
- Download as image
- Copy to clipboard

### 🔐 Blockchain Security
- Updates secured with SHA-256 hashing
- Immutable record of learning progress
- Verification system for authenticity

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/techtea.git
cd techtea
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (see `.env.example`):
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_WAKATIME_API_KEY=your_wakatime_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Colors
- **Primary**: #0D1117 (GitHub dark)
- **Secondary**: #21262D (Dark grey)
- **Accent**: #58A6FF (GitHub blue)
- **Success**: #238636 (Green)
- **Warning**: #F85149 (Red)
- **Text**: #F0F6FC (Light grey)

### Typography
- **Fonts**: JetBrains Mono, Fira Code, SF Mono
- **Style**: Terminal-inspired aesthetics
- **Icons**: Lucide React

### Layout
- Mobile-first responsive design
- Card-based components
- 16px base spacing
- Dark theme throughout

## 📱 PWA Features

- Offline support
- Install to home screen
- Push notifications (coming soon)
- Fast loading with service workers

## 🔧 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion
- **Blockchain**: Ethers.js
- **API Integration**: Axios
- **Markdown**: React Markdown
- **Code Highlighting**: React Syntax Highlighter

## 📦 Project Structure

```
techtea/
├── app/                    # Next.js app directory
│   ├── room/[id]/         # Dynamic room pages
│   ├── rooms/             # Rooms list page
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── CreateRoomModal.tsx
│   ├── JoinRoomModal.tsx
│   ├── UpdateCard.tsx
│   ├── LeaderboardPanel.tsx
│   ├── ShareModal.tsx
│   └── IntegrationsPanel.tsx
├── lib/                   # Utilities and helpers
│   ├── store.ts          # Zustand store
│   ├── blockchain.ts     # Blockchain functions
│   └── integrations.ts   # API integrations
├── public/               # Static assets
└── package.json         # Dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by Discord's community interface
- GitHub's activity feed design
- Built for developers, by developers

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ☕ by the TechTea team