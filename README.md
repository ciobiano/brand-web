# Designer II - Clou Hero Component

## Overview

This project implements a Hero component that closely matches the design and animations from [Clou.ch](https://www.clou.ch/), a Swiss advertising agency website.

## Features

### 🎨 **Design Elements**
- **Typography**: Large "C L O U" heading using Poppins font (similar to Athletics)
- **Layout**: 1205px height hero section with centered content
- **Colors**: Clean black and white design with green accent
- **Responsive**: Mobile-first design with proper breakpoints

### 🚀 **Animations & Effects**
- **GSAP Integration**: Professional animation library with ScrollTrigger
- **Mouse Parallax**: Interactive image cards that respond to mouse movement
- **Scroll Animations**: Cards scale and move on scroll with smooth transitions
- **Entrance Animations**: Staggered reveal of title, subtitle, and images
- **Performance Optimized**: Uses `will-change-transform` and GPU acceleration

### 🖱️ **Interactive Elements**
- **Navigation**: Clean top navigation with mobile hamburger
- **Image Cards**: Clickable project thumbnails with hover effects
- **Scroll Indicator**: Animated scroll hint at bottom
- **Logo**: Interactive C logo with hover effects

## Technical Implementation

### **Frameworks & Libraries**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Professional animation library
- **Framer Motion**: Alternative animation option (configured but not used)

### **Key Components**
- `Hero`: Main hero section component
- `useMouseParallax`: Custom hook for mouse-based parallax effects
- `CanvasCard`: Individual image card component
- `heroImages`: Data configuration for project thumbnails

### **Animation Features**
- **Scroll-triggered animations** matching Clou's `scroll-scale-in` and `scroll-move-overlay` classes
- **Mouse parallax** with multiple depth layers for realistic 3D effect
- **Staggered entrance animations** for smooth content reveal
- **Continuous scroll hint animation** for better UX

## File Structure

```
src/app/soul/secttons/hero/
├── index.tsx          # Main Hero component
├── canvas-card.tsx    # Individual image card
└── hooks/
    └── useMouseParallax.ts  # Mouse parallax logic

src/app/data/
└── index.ts           # Hero image data and positioning

src/app/
├── layout.tsx         # Font imports and metadata
├── page.tsx           # Main page with Hero
└── globals.css        # Global styles and animations
```

## Usage

```tsx
import Hero from "@/app/soul/secttons/hero";

export default function Page() {
  return (
    <main>
      <Hero 
        title="C L O U" 
        subtitle="Hallo! Wir sind Clou, deine Agentur in Luzern mit Fokus auf Branding, Purpose und Websites mit Wirkung."
        cta_text="Scroll" 
      />
    </main>
  );
}
```

## Customization

### **Props**
- `title`: Main heading text
- `subtitle`: Subtitle text below main heading
- `cta_text`: Scroll indicator text
- `cta_link`: Scroll target link
- `image_src`: Optional hero background image

### **Styling**
- **Fonts**: Configured in `tailwind.config.ts` with CSS variables
- **Colors**: Custom color palette in Tailwind config
- **Animations**: Custom keyframes and timing functions
- **Spacing**: Responsive spacing system

### **Images**
- **Positioning**: Configurable positioning for each image card
- **Sizes**: Responsive sizing for mobile and desktop
- **Animation**: Individual animation parameters per card

## Performance Features

- **GPU Acceleration**: Uses `transform-gpu` and `will-change-transform`
- **Lazy Loading**: Images load with proper loading attributes
- **Reduced Motion**: Respects user's motion preferences
- **Mobile Optimization**: Touch-friendly interactions and performance

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## Development

### **Installation**
```bash
npm install
```

### **Development Server**
```bash
npm run dev
```

### **Build**
```bash
npm run build
```

## Credits

- **Design Inspiration**: [Clou.ch](https://www.clou.ch/)
- **Animation Library**: [GSAP](https://greensock.com/gsap/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

*This implementation closely follows the original Clou website design while using modern web technologies and best practices.*
