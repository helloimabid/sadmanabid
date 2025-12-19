# Portfolio Website

A modern, brutalist-styled portfolio website built with Next.js 16, featuring smooth animations, multiple themes, and interactive components.

## 🚀 Features

### Core Features
- **Brutalist Design System** - Bold, minimalist aesthetic with high-contrast elements
- **8 Theme System** - Red, Blue, Green, Purple, Orange, Pink, Black, and White themes with smooth transitions
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Custom Cursor** - Aesthetic custom cursor (automatically hidden on mobile/tablet)
- **Scroll Progress Indicator** - Visual progress bar showing page scroll position
- **Loading Screen** - Smooth loading animation on initial page load

### Interactive Components
- **Mobile Hamburger Menu** - GSAP-powered circular reveal animation
- **Kinetic Timeline** - Dynamic timeline with scroll-based animations
- **Parallax Sections** - Smooth parallax scrolling effects
- **Wavy Text** - Animated text effects
- **Contact Form** - EmailJS integration for form submissions
- **Smooth Scrolling** - Seamless page navigation experience

### Technical Features
- **Server-Side Rendering** - Next.js App Router with RSC support
- **Turbopack** - Lightning-fast development with Turbopack
- **Type Safety** - Full TypeScript implementation
- **Animation Library** - GSAP with ScrollTrigger for advanced animations
- **UI Components** - Radix UI primitives for accessibility
- **Form Validation** - React Hook Form with Zod schema validation

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 16.1.0](https://nextjs.org/) with Turbopack
- **React:** 19.2.3
- **TypeScript:** ^5
- **Package Manager:** pnpm

### Styling
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [GSAP 3.14.2](https://gsap.com/) with ScrollTrigger
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Utility Library:** clsx, tailwind-merge

### Form & Validation
- **Form Management:** React Hook Form 7.60.0
- **Validation:** Zod 3.25.76
- **Email Service:** EmailJS Browser 4.4.1

### Additional Libraries
- **Icons:** Lucide React 0.454.0
- **Analytics:** Vercel Analytics 1.3.1
- **Carousel:** Embla Carousel React 8.5.1
- **Toast Notifications:** Sonner 1.7.4
- **Date Handling:** date-fns 4.1.0

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio-website-build
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

To get EmailJS credentials:
- Sign up at [EmailJS](https://www.emailjs.com/)
- Create an email service
- Create an email template
- Copy your Service ID, Template ID, and Public Key

4. **Run the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
portfolio-website-build/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles and theme definitions
├── components/              # React components
│   ├── ui/                  # Reusable UI components (Radix UI)
│   ├── hero-section.tsx     # Hero section
│   ├── about-grid.tsx       # About section grid
│   ├── portfolio-list.tsx   # Portfolio projects list
│   ├── kinetic-timeline.tsx # Animated timeline
│   ├── contact-form.tsx     # Contact form with EmailJS
│   ├── theme-toggle.tsx     # Theme switcher
│   ├── mobile-menu.tsx      # Mobile hamburger menu
│   ├── custom-cursor.tsx    # Custom cursor component
│   ├── scroll-progress.tsx  # Scroll progress bar
│   └── ...                  # Other components
├── lib/                     # Utilities and context
│   ├── utils.ts            # Utility functions
│   ├── theme-context.tsx   # Theme state management
│   └── language-context.tsx # Language state management
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
│   └── icon.svg            # Favicon
├── styles/                  # Additional styles
└── ...config files          # Configuration files
```

## 🎨 Theme System

The website includes 8 customizable themes:

- **Red** - Bold red with lime accents
- **Blue** - Cool blue with lime accents
- **Green** - Nature green with lime accents
- **Purple** - Royal purple with lime accents
- **Orange** - Vibrant orange with lime accents
- **Pink** - Playful pink with lime accents
- **Black** - Dark mode with neon lime
- **White** - Light mode with black accents

Themes are managed via React Context and persist across sessions using localStorage. Smooth transitions (0.6s cubic-bezier) are applied when switching themes.

### Custom Theme CSS Variables
Each theme defines:
- `--brutal-red` - Primary theme color
- `--brutal-lime` - Accent color (#ccff00)
- `--brutal-black` - Base black (#1a1a1a)

## 🚀 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 📱 Responsive Design

- **Desktop:** Full features including custom cursor, parallax effects
- **Tablet:** Adaptive layout, hidden custom cursor
- **Mobile:** Mobile-optimized menu, touch-friendly interactions

## 🎯 Key Components

### Hero Section
Main landing section with animated text and call-to-action

### About Grid
Grid layout showcasing skills and information

### Portfolio List
Project showcase with filtering and animations

### Kinetic Timeline
Scroll-based animated timeline of experiences

### Contact Form
EmailJS-powered contact form with validation
- Real-time validation using Zod schemas
- Success/error toast notifications
- Responsive design

## 🔧 Configuration

### Tailwind CSS v4
Configured with custom colors and animations. See [tailwind.config.js](./tailwind.config.js)

### PostCSS
Using the new `@tailwindcss/postcss` plugin for v4 compatibility

### TypeScript
Strict type checking enabled. See [tsconfig.json](./tsconfig.json)

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

The site is optimized for Vercel deployment with:
- Automatic HTTPS
- Edge functions support
- Built-in analytics
- Environment variable management

### Environment Variables for Production
Set these in your deployment platform:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 🐛 Known Issues & Solutions

### Hydration Warnings
If you see hydration warnings, they may be caused by browser extensions. The app includes `suppressHydrationWarning` on root elements to handle this.

### GSAP ScrollTrigger Issues
The scroll progress bar uses `refreshPriority: -1` to ensure proper initialization after page load.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Your Name**
- Portfolio: https://sadmanabid.vercel.app 
- GitHub: @helloimabid
- Email: me@sadmanabid.me

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [GSAP](https://gsap.com/) - Professional-grade animation
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [EmailJS](https://www.emailjs.com/) - Email service integration
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library

---

**Built with ❤️ using Next.js and modern web technologies**
