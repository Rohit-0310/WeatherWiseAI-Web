# Design System

WeatherWiseAI-Web aims for a premium, dynamic, and immersive user interface.

## Typography
- **Primary font**: Inter, loaded by the root layout through next/font. Spacing and component notes below describe design guidance.
- **Hierarchy**:
  - `h1`: 3rem (48px), Bold - Main temperatures / Hero titles.
  - `h2`: 2rem (32px), SemiBold - Section headers.
  - `h3`: 1.5rem (24px), Medium - Card headers.
  - `body`: 1rem (16px), Regular - General text.
  - `small`: 0.875rem (14px) - Meta info, timestamps.

## Spacing & Grid
- Base unit: `4px` (Tailwind standard).
- Use a 12-column CSS Grid for the main layout.
- Consistent gaps: `gap-4` (16px) for inner components, `gap-8` (32px) for sections.

## Color Palette
Colors are dynamic and controlled via CSS variables linked to the Theme System.
- **Base Background**: Smooth gradients instead of flat colors.
- **Glass Panel**: Translucent white/black backgrounds (`bg-white/10` or `bg-black/20`).
- **Text**: High contrast variations depending on the background.
- **Accents**: 
  - Sunny: Golden yellow / Warm orange.
  - Rainy: Slate blue / Cool gray.
  - Snow: Ice white / Pale cyan.

## Glassmorphism
The core aesthetic relies heavily on glassmorphism to let dynamic background animations shine through.
- **Implementation**: Combine `backdrop-blur-md` (or `lg`), semi-transparent background colors, and subtle borders (`border-white/20`).
- **Shadows**: Soft, diffused shadows (`shadow-lg shadow-black/10`).

## Cards
- Used for presenting forecast data, AI insights, and metrics.
- Must employ glassmorphism.
- Include subtle hover effects (slight lift `translate-y-1` and glow).

## Buttons
- Highly interactive.
- Primary buttons use solid brand colors.
- Secondary/Icon buttons use translucent backgrounds with hover states.
- Micro-animations on click (`scale: 0.95` via Framer Motion).

## Icons
- **Lucide Icons**: Used for UI actions (settings, search, user).
- **Weather Icons**: Custom animated SVG icons or high-quality assets mapping to specific conditions.

## Responsive Breakpoints
- `sm`: 640px (Mobile landscape)
- `md`: 768px (Tablets)
- `lg`: 1024px (Laptops)
- `xl`: 1280px (Desktops)
- `2xl`: 1536px (Large screens)

## Accessibility
- Ensure sufficient color contrast, especially dynamic text over weather backgrounds.
- All interactive elements must have visible focus states (`focus-visible:ring`).
- Use proper ARIA labels for weather icons and visual elements.
