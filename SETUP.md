# TechTea Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

For a quick demo, you can leave most values as-is. The app will work with mock data.

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 4. Create Your First Account
1. Click "Get Started"
2. Enter username, email, and password
3. You're in! 🎉

## Full Setup with Integrations

### GitHub Integration

1. **Create GitHub OAuth App**
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Application name: `TechTea`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Secret

2. **Add to .env**
   ```env
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```

3. **Create Personal Access Token**
   - Go to https://github.com/settings/tokens
   - Generate new token (classic)
   - Select scopes: `read:user`, `repo`
   - Copy token

4. **Add to .env**
   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_token
   ```

### Wakatime Integration

1. **Get API Key**
   - Visit https://wakatime.com/settings/account
   - Copy your Secret API Key

2. **Add to .env**
   ```env
   WAKATIME_API_KEY=waka_xxx
   ```

### Blockchain Setup (Optional)

1. **Get RPC Endpoint**
   - Sign up at https://www.alchemy.com/ or https://infura.io/
   - Create a new app (Polygon recommended for low fees)
   - Copy HTTP endpoint

2. **Add to .env**
   ```env
   NEXT_PUBLIC_BLOCKCHAIN_RPC=https://polygon-mainnet.g.alchemy.com/v2/your-key
   ```

3. **Deploy Smart Contract** (Advanced)
   ```solidity
   // Example contract for storing update hashes
   contract UpdateStorage {
       mapping(string => bytes32) public updates;
       
       function storeUpdate(string memory updateId, string memory contentHash) 
           public returns (bytes32) {
           bytes32 hash = keccak256(abi.encodePacked(contentHash));
           updates[updateId] = hash;
           return hash;
       }
   }
   ```

4. **Add Contract Address**
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
   ```

### Real-time Features (Optional)

For real-time updates, you'll need a Socket.io server:

1. **Create socket server** (separate project)
   ```javascript
   // server.js
   const io = require('socket.io')(3001, {
     cors: { origin: 'http://localhost:3000' }
   })
   
   io.on('connection', (socket) => {
     console.log('User connected:', socket.id)
     
     socket.on('join_room', (roomId) => {
       socket.join(roomId)
     })
     
     socket.on('new_update', (data) => {
       io.to(data.roomId).emit('update_posted', data)
     })
   })
   ```

2. **Run socket server**
   ```bash
   node server.js
   ```

3. **Add to .env**
   ```env
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

## Production Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel dashboard
   - Settings > Environment Variables
   - Add all variables from `.env`

### Custom Server Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Use PM2 for process management**
   ```bash
   npm i -g pm2
   pm2 start npm --name "techtea" -- start
   ```

## PWA Setup

### Generate Icons

Use a tool like https://realfavicongenerator.net/

1. Upload your logo (minimum 512x512px)
2. Download the generated icons
3. Place in `public/` directory:
   - `icon-192x192.png`
   - `icon-512x512.png`
   - `favicon.ico`

### Test PWA

1. Build for production: `npm run build`
2. Start server: `npm start`
3. Open Chrome DevTools
4. Go to Application tab
5. Check "Service Workers" and "Manifest"
6. Test "Add to Home Screen"

## Troubleshooting

### Issue: GitHub integration not working
**Solution**: Make sure your GitHub token has the correct scopes and isn't expired.

### Issue: PWA not installing
**Solution**: PWAs require HTTPS in production. Use ngrok for testing:
```bash
npx ngrok http 3000
```

### Issue: Blockchain transactions failing
**Solution**: Ensure you have test tokens on the network. Use faucets:
- Polygon Mumbai: https://faucet.polygon.technology/

### Issue: Styles not loading
**Solution**: Clear `.next` folder and rebuild:
```bash
rm -rf .next
npm run dev
```

## Development Tips

### Hot Reload Not Working
```bash
# Increase watchers limit (Linux/Mac)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### TypeScript Errors
```bash
# Check types
npm run type-check

# Fix auto-fixable issues
npm run lint -- --fix
```

### Database Setup (Future Enhancement)
Currently using localStorage. To add database:

1. Install Prisma:
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. Initialize:
   ```bash
   npx prisma init
   ```

3. Update schema and migrate:
   ```bash
   npx prisma migrate dev
   ```

## Next Steps

1. ✅ Complete the quick start
2. ✅ Set up integrations you need
3. ✅ Create your first room
4. ✅ Invite friends
5. ✅ Start sharing updates!

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🐛 Report issues on GitHub
- 💬 Join our Discord community
- 📧 Email: support@techtea.app

Happy learning! ☕