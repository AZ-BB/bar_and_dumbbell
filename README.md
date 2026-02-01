# Bar & Dumbbell Gym Website

A high-conversion, one-page gym website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Bilingual Support**: Full Arabic (RTL) and English (LTR) support without external i18n libraries
- 📱 **Mobile-First Design**: Fully responsive across all devices
- 🎨 **Modern Dark Theme**: Black/dark gray with yellow accent colors
- 🎬 **Video Hero Section**: Engaging video landing with image fallback
- ⚡ **Fast Loading**: Optimized images with lazy loading
- 🎯 **Conversion-Focused**: Strategic WhatsApp CTAs throughout
- ♿ **Accessible**: Semantic HTML with proper ARIA labels
- 🎭 **Smooth Animations**: Subtle fade and slide animations
- 📊 **SEO-Optimized**: Proper meta tags and semantic structure

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (Static Export)
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── Navbar.tsx           # Navigation with language toggle
│   ├── HeroSection.tsx      # Video/image hero with CTA
│   ├── WhySection.tsx       # Feature cards section
│   ├── FacilitiesSection.tsx # Facilities grid
│   ├── PricingSection.tsx   # Membership plans with tabs
│   ├── GallerySection.tsx   # Image gallery with lazy loading
│   ├── ContactSection.tsx   # Map and contact info
│   ├── FinalCTA.tsx         # Final call-to-action
│   ├── Footer.tsx           # Site footer
│   └── WhatsAppButton.tsx   # Sticky WhatsApp button
├── contexts/
│   └── LanguageContext.tsx  # Language state management
├── lib/
│   ├── translations.ts      # All UI text in AR/EN
│   └── constants.ts         # WhatsApp config and links
└── public/
    ├── images/              # Gallery and facility images
    └── videos/              # Hero video
```

## Configuration

### WhatsApp Integration

Update the WhatsApp number in `lib/constants.ts`:

```typescript
export const WHATSAPP_NUMBER = "201234567890"; // Your number
```

### Google Maps

Update the map embed URL in `lib/constants.ts`:

```typescript
export const GOOGLE_MAPS_EMBED = "your-google-maps-embed-url";
```

### Contact Information

Update phone and address in `components/ContactSection.tsx`.

## Customization

### Colors

Edit theme colors in `tailwind.config.ts`:

```typescript
colors: {
  "gym-yellow": "#FFC107",
  "gym-dark": "#0A0A0A",
  "gym-gray": "#1A1A1A",
}
```

### Translations

Add or modify text in `lib/translations.ts` for both Arabic and English.

### Images

Replace images in `public/images/` maintaining the same filenames, or update references in components.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Static Export

```bash
npm run build
```

Upload the `out/` directory to any static hosting service.

## Performance

- ✅ Static site generation
- ✅ Image optimization with lazy loading
- ✅ Video fallback for slow connections
- ✅ Reduced motion support
- ✅ Minimal JavaScript bundle
- ✅ Optimized Tailwind CSS

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## License

© 2026 Bar & Dumbbell Gym. All rights reserved.
