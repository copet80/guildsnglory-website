# Guilds n Glory Website - Project Documentation

## 🌐 Hosting & Deployment Information

**HOSTING PROVIDER: NETLIFY** 🔴 **IMPORTANT: Don't forget this!**

### Website Details
- **Live URL:** https://www.guildsnglory.com
- **Hosting:** Netlify
- **Domain DNS:** Managed through CloudFlare
- **Repository:** https://github.com/copet80/guildsnglory-website.git

### Deployment Process
1. **Auto-deployment:** Connected to GitHub repository
2. **Build Command:** `npm run build`
3. **Publish Directory:** `dist/`
4. **Deploy Triggers:** Push to main branch

### Quick Deployment Steps
```bash
# 1. Make your changes locally
# 2. Test the build
npm run build

# 3. Commit and push to GitHub
git add .
git commit -m "Your changes"
git push origin main

# 4. Netlify will auto-deploy within 1-2 minutes
```

### Netlify Dashboard Access
- Login to netlify.com with your account
- Look for "guildsnglory-website" or "guildsnglory.com" site
- Check deploy status and logs there

---

## 🛡️ Anti-Spam Protection

### Implementation Details
- **Honeypot fields:** Multiple hidden form fields to catch bots
- **Time-based validation:** Prevents instant submissions
- **Rate limiting:** 5-minute cooldown between submissions
- **User interaction tracking:** Validates legitimate user behavior

### Files Modified
- `index.html` - Added honeypot fields and form classes
- `subscribe.html` - Added honeypot fields and form classes
- `css/index.css` - Added honeypot hiding styles
- `js/anti-spam.js` - Main anti-spam validation logic

### Debugging
```javascript
// In browser console, check anti-spam status:
antiSpam.getStats()

// Disable debug mode for production:
antiSpam.disableDebug()
```

---

## 🚀 Project Structure

### Key Files
- `index.html` - Main homepage
- `subscribe.html` - Newsletter subscription page
- `thankyou.html` - Thank you page
- `css/index.css` - Main styles with responsive design
- `css/particles.scss` - Particle effects for hero section
- `js/index.js` - Main JavaScript functionality
- `js/common.js` - Shared utilities
- `js/anti-spam.js` - Newsletter spam protection

### Build System
- **Bundler:** Parcel
- **Package Manager:** npm
- **Node/SCSS:** For particle effects and styling

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Files will be output to dist/ directory
```

---

## 🎮 Game Information

### About Guilds n Glory
- Medieval-inspired arcade-style hack-and-slash multiplayer game
- Unique mechanic: Defeated enemies join your army instead of dying
- "Attack, expand, dominate, repeat" gameplay
- Available on Steam (wishlist link integrated)

### Marketing Features
- 6 guild showcase sections (Archers, Assassins, Barbarians, Knights, Priests, Wizards)
- Interactive screenshot gallery
- Embedded SoundCloud music players
- Newsletter subscription with Mailchimp integration
- Social media integration
- Press kit download section

---

## 📧 Newsletter Integration

### Mailchimp Setup
- **Service:** Mailchimp
- **Form Action:** https://guildsnglory.us21.list-manage.com/subscribe/post
- **List ID:** 11d7f73c5c
- **User ID:** a097ba680aff5996d488abdbf

### Anti-Spam Protection
- Honeypot fields prevent bot submissions
- Rate limiting prevents spam
- User interaction validation ensures legitimate subscriptions

---

## 🔧 Troubleshooting

### Common Issues
1. **Newsletter form blocked:** Check browser console for anti-spam validation results
2. **Build failures:** Ensure all dependencies are installed (`npm install`)
3. **Deploy issues:** Check Netlify dashboard for build logs
4. **Missing images:** Verify all image paths in img/ directory

### Emergency Deployment
If automated deployment fails:
1. Run `npm run build` locally
2. Manually upload dist/ folder contents to Netlify via dashboard
3. Check CloudFlare DNS settings if domain issues occur

---

## 📝 Remember for Future Reference

**HOSTING:** Netlify (auto-deploys from GitHub)
**DNS:** CloudFlare
**DOMAIN:** guildsnglory.com
**REPO:** github.com/copet80/guildsnglory-website

*Add this to your calendar: Check deployment setup monthly to ensure everything is working!*