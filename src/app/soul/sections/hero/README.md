# Interactive Canvas Hero Section

Implements the mouse-interactive canvas cards effect inspired by Clou.ch's homepage, featuring a **repulsion effect** where image cards move away from the mouse cursor.

## Features

- ✨ **Repulsion Effect**: Cards scatter away from mouse cursor with realistic physics
- 🎯 **Distance-based Intensity**: Stronger repulsion when mouse is closer
- 🔄 **Smooth Animations**: GSAP-powered animations with customizable easing
- 📱 **Responsive Design**: Optimized positioning for desktop and mobile
- 🎨 **Performance Optimized**: Hardware-accelerated transforms and efficient event handling

## Implementation

### Core Hook: `useInteractiveCanvas`

Location: `@/app/hooks/useInteractiveCanvas.ts`

```typescript
useInteractiveCanvas(heroRef, {
  intensity: 85,        // Repulsion force strength
  maxDistance: 280,     // Mouse influence radius (px)
  animationDuration: 0.9,  // Animation speed
  ease: "power2.out"    // GSAP easing function
});
```

### Parameters Analysis (Based on Clou.ch Study)

- **Movement Direction**: Repulsion (cards move away from cursor)
- **Average Movement**: ~262px displacement per interaction
- **Response Time**: Immediate (no delay)
- **Total Cards**: 15 interactive elements
- **Effect Range**: 280px radius around cursor

## Usage

### Basic Implementation

```tsx
import { useInteractiveCanvas } from '@/app/hooks/useInteractiveCanvas';

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useInteractiveCanvas(containerRef);
  
  return (
    <div ref={containerRef} className="canvas-hero">
      <div className="canvas-card">Content</div>
    </div>
  );
};
```

### Custom Configuration

```tsx
useInteractiveCanvas(containerRef, {
  intensity: 120,        // Higher repulsion force
  maxDistance: 400,      // Larger influence area
  animationDuration: 1.5, // Slower animation
  ease: "power3.out"      // Different easing
});
```

## CSS Classes

### Required Classes

- `.canvas-hero`: Container with `overflow: visible`
- `.canvas-card`: Positioned cards with hardware acceleration

### Positioning

Cards use absolute positioning with viewport-relative units:

```css
.canvas-card:nth-child(1) {
  width: 20vw;
  left: -21%;
  top: -14%;
}
```

## Performance Considerations

- **Hardware Acceleration**: Uses `transform3d` for GPU acceleration
- **Event Throttling**: Optimized mouse event handling
- **GSAP Overwrite**: Prevents animation conflicts with `overwrite: 'auto'`
- **Will-change**: CSS hint for browser optimization

## Browser Support

- Modern browsers with CSS transforms support
- Hardware acceleration available
- GSAP 3.x compatibility

## Customization

### Intensity Levels

- **Subtle**: 50-70 (minimal movement)
- **Moderate**: 80-100 (balanced effect)
- **Strong**: 120-150 (dramatic movement)

### Distance Settings

- **Close**: 200px (intimate interaction)
- **Medium**: 280px (recommended)
- **Far**: 400px+ (wide influence area)

## Technical Details

The repulsion calculation uses vector mathematics:

```typescript
const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
const repulsionStrength = (maxDistance - distance) / maxDistance;
const force = intensity * repulsionStrength;
const repulsionX = (deltaX / distance) * force;
const repulsionY = (deltaY / distance) * force;
```

This creates natural, physics-based movement that feels organic and responsive.

# Enhanced Image Card Component

## Features

### 🖱️ Mouse Tracking
- **Integrated with existing magnetic cursor** system
- **Proximity detection** - calculates distance from image center
- **Cursor expansion** - cursor grows when near images

### 🎯 Proximity-Based Scaling
- Images scale up when mouse approaches (max 15% scale)
- Additional 10% scale on hover
- Smooth transitions with cubic-bezier easing

### ✨ Visual Effects
- **Proximity glow** - subtle shadow when very close
- **Enhanced overlays** - gradient overlays on hover
- **Proximity indicator** - small white dot appears when close
- **Smooth animations** - 500ms transitions for all effects

## Usage

```tsx
import EnhancedImageCard from './enhanced-image-card';

<EnhancedImageCard
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={300}
  link="/destination-page"
  priority={true}
  className="custom-styles"
/>
```

## Props

- `src` - Image source path
- `alt` - Image alt text
- `width/height` - Image dimensions
- `link` - Click destination
- `priority` - Next.js priority loading
- `className` - Additional CSS classes

## Performance Features

- **RequestAnimationFrame** for smooth mouse tracking
- **Passive event listeners** for better scroll performance
- **Optimized calculations** with proximity detection
- **Cleanup on unmount** to prevent memory leaks
- **Integrated cursor system** - no duplicate mouse tracking

## CSS Classes

- `.enhanced-image-card` - Main container styles
- `.mouse-spot-active` - Mouse tracking animations
- Custom proximity and hover effects

## Integration

This component works alongside the existing `useMouseParallax` hook for layered parallax effects while adding the new proximity and mouse tracking features.
