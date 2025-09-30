# TechTea Deployment Guide

Complete guide to deploying TechTea PWA to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Icons generated (192x192, 512x512)
- [ ] SSL certificate obtained (required for PWA)
- [ ] Database set up (if using)
- [ ] API keys secured
- [ ] Domain name configured

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros**: Zero-config, automatic HTTPS, edge functions, excellent DX

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Environment Variables**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

6. **Custom Domain** (Optional)
   - Settings → Domains
   - Add your domain
   - Update DNS records

### Option 2: Netlify

**Pros**: Great for static sites, good free tier, plugin ecosystem

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the app**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add all variables from `.env`

### Option 3: Railway

**Pros**: Simple deployment, database included, good for full-stack

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize**
   ```bash
   railway init
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Add Environment Variables**
   ```bash
   railway variables set KEY=value
   ```

### Option 4: AWS (Advanced)

**Pros**: Full control, scalable, comprehensive services

#### Using AWS Amplify

1. **Install Amplify CLI**
   ```bash
   npm i -g @aws-amplify/cli
   ```

2. **Configure**
   ```bash
   amplify init
   ```

3. **Add hosting**
   ```bash
   amplify add hosting
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

#### Using EC2 + Nginx

1. **Launch EC2 instance**
   - Ubuntu 22.04 LTS
   - t2.micro or larger
   - Configure security groups (80, 443, 22)

2. **SSH into instance**
   ```bash
   ssh -i key.pem ubuntu@your-ip
   ```

3. **Install dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx
   sudo npm i -g pm2
   ```

4. **Clone and build**
   ```bash
   git clone your-repo
   cd techtea
   npm install
   npm run build
   ```

5. **Configure PM2**
   ```bash
   pm2 start npm --name "techtea" -- start
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/techtea
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/techtea /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Install SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 5: Docker + Any Cloud

**Pros**: Portable, consistent across environments

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static

   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Create .dockerignore**
   ```
   node_modules
   .next
   .git
   *.md
   ```

3. **Build image**
   ```bash
   docker build -t techtea .
   ```

4. **Run container**
   ```bash
   docker run -p 3000:3000 --env-file .env techtea
   ```

5. **Deploy to cloud**
   ```bash
   # Push to registry
   docker tag techtea your-registry/techtea
   docker push your-registry/techtea
   
   # Deploy (example with DigitalOcean)
   doctl apps create --spec app.yaml
   ```

## Database Setup

### PostgreSQL (Recommended)

1. **Create database**
   ```sql
   CREATE DATABASE techtea;
   CREATE USER techtea WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE techtea TO techtea;
   ```

2. **Install Prisma** (if not already)
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

3. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

4. **Define schema** (`prisma/schema.prisma`)
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id        String   @id @default(cuid())
     email     String   @unique
     username  String   @unique
     // ... other fields
   }
   ```

5. **Migrate**
   ```bash
   npx prisma migrate dev --name init
   ```

### Supabase (Easy Alternative)

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string
3. Add to `.env`:
   ```env
   DATABASE_URL=postgresql://...
   ```

## Environment Variables

### Required for Production

```env
# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Auth (generate secure random string)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://yourdomain.com

# GitHub
GITHUB_CLIENT_ID=your_prod_client_id
GITHUB_CLIENT_SECRET=your_prod_secret
NEXT_PUBLIC_GITHUB_TOKEN=your_token

# Wakatime
WAKATIME_API_KEY=your_key

# Blockchain
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://polygon-mainnet...
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# OpenAI (for AI features)
OPENAI_API_KEY=sk-...

# Database
DATABASE_URL=postgresql://...
```

### Securing Environment Variables

1. **Never commit `.env` to git**
2. **Use different values for production**
3. **Rotate secrets regularly**
4. **Use secret management services**:
   - AWS Secrets Manager
   - HashiCorp Vault
   - Google Cloud Secret Manager

## Performance Optimization

### 1. Enable Caching

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 2. Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com', 'wakatime.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### 3. Bundle Analysis

```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... config
})
```

Run: `ANALYZE=true npm run build`

## Monitoring

### Vercel Analytics (if using Vercel)

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Using Cloudflare

1. Add site to Cloudflare
2. Update nameservers
3. SSL/TLS → Full (strict)
4. Enable "Always Use HTTPS"

## Post-Deployment

### 1. Test PWA Installation

- Visit site on mobile
- Check "Add to Home Screen"
- Test offline functionality
- Verify push notifications

### 2. SEO Optimization

```typescript
// app/layout.tsx
export const metadata = {
  title: 'TechTea - Tech Learning Community',
  description: 'Share daily tech learnings with friends',
  keywords: ['tech', 'learning', 'community', 'coding'],
  openGraph: {
    title: 'TechTea',
    description: 'Share daily tech learnings',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechTea',
    description: 'Share daily tech learnings',
    images: ['/og-image.png'],
  },
}
```

### 3. Analytics Setup

- Google Analytics
- Plausible Analytics
- Umami (self-hosted)

### 4. Monitor Performance

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Lighthouse CI

## Troubleshooting

### Issue: Build fails on Vercel
**Solution**: Check Node version matches local
```json
// package.json
"engines": {
  "node": ">=18.0.0"
}
```

### Issue: Environment variables not working
**Solution**: Restart deployment after adding variables

### Issue: PWA not installing
**Solution**: 
- Ensure HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker registration

### Issue: Database connection fails
**Solution**: 
- Check connection string
- Verify IP whitelist (if applicable)
- Ensure SSL mode is correct

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Other platforms
```bash
# Keep previous deployment
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0

# Rollback if needed
git revert HEAD
git push origin main
```

## Backup Strategy

1. **Database backups**: Daily automated
2. **User data**: Weekly exports
3. **Code**: Git tags for versions
4. **Media**: Cloud storage with versioning

## Support

- 📖 [Full Documentation](./README.md)
- 🛠️ [Setup Guide](./SETUP.md)
- 🐛 [Report Issues](https://github.com/your-repo/issues)
- 💬 [Community Discord](https://discord.gg/techtea)

---

Happy deploying! 🚀