# Guilds n Glory Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status.svg)](https://app.netlify.com/sites/your-site-name/deploys)

Official website for **Guilds n Glory** - a medieval-inspired arcade-style hack-and-slash multiplayer game.

🌐 **Live Site:** [www.guildsnglory.com](https://www.guildsnglory.com)

## 🚀 Hosting & Deployment

**HOSTING PROVIDER: NETLIFY** 

- **Auto-deployment:** Connected to this GitHub repository
- **Deploy trigger:** Push to `main` branch
- **Build command:** `npm run build`
- **Publish directory:** `dist/`
- **DNS:** Managed through CloudFlare

### Quick Deployment
```bash
# Make changes and deploy
git add .
git commit -m "Your changes"
git push origin main
# Netlify auto-deploys in 1-2 minutes!
```

## 🛠️ Development

### Setup
```bash
npm install
npm start    # Development server
npm run build # Production build
```

### Tech Stack
- **Static Site Generator:** Parcel
- **Styling:** CSS3 + SCSS (for particles)
- **JavaScript:** Vanilla JS with anti-spam protection
- **Newsletter:** Mailchimp integration
- **Images:** WebP format for optimization

## 🛡️ Features

- **Anti-spam newsletter protection** - Honeypot fields, rate limiting, behavioral validation
- **Responsive design** - Mobile-first approach
- **Interactive elements** - Screenshot gallery, parallax effects
- **Social integration** - Links to all game social media
- **Press kit section** - For media and content creators

## 📁 Project Structure

```
├── index.html          # Main homepage
├── subscribe.html      # Newsletter subscription page  
├── thankyou.html      # Thank you page
├── css/
│   ├── index.css      # Main styles
│   └── particles.scss # Particle effects
├── js/
│   ├── index.js       # Main functionality
│   ├── common.js      # Shared utilities
│   └── anti-spam.js   # Newsletter protection
├── img/               # Game assets and screenshots
├── fonts/             # Custom web fonts
├── netlify.toml       # Netlify configuration
└── CLAUDE.md          # Detailed project documentation
```

## 🎮 About the Game

Guilds n Glory is a cute medieval-inspired arcade-style hack-and-slash multiplayer mayhem, where defeated enemies join your army instead of dying. It's "Dynasty Warriors meets Total War" made simple and casual.

**Wishlist on Steam:** [Store Page](https://store.steampowered.com/app/2099310/Guilds_n_Glory/)

Created with CodeSandbox
