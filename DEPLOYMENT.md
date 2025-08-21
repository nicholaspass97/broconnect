# Deploying BroConnect to GitHub

## Quick Deploy to GitHub Pages

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: BroConnect MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/broconnect.git
   git push -u origin main
   ```

2. **Deploy to Vercel (Recommended)**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import the broconnect repository
   - Deploy automatically

3. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub account
   - Import the broconnect repository
   - Deploy automatically

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

No environment variables required for the MVP demo.

## Customization

- Update `src/components/Onboarding.tsx` to modify interests
- Update `src/components/SuggestedMatches.tsx` to change mock data
- Update `src/components/Groups.tsx` to modify group listings
- Update colors and styling in Tailwind classes

## Sharing with Friends

1. Deploy to Vercel/Netlify
2. Share the live URL
3. Friends can interact with the demo immediately
4. No installation required - works in any browser
