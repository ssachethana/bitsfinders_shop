# Project Folder Structure

Keep this file up to date whenever a folder or component is added, moved or renamed.

```
├── app/                  # Next.js App Router (Pages, Layouts & API routes)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage (marketplace landing page)
│   └── components/       # Reusable UI components
│   │    ├── marketplace/     # like daraz
│   │    │   │
│   │    │   └── mCommon/           # common components for marketplace
│   │    │   │   │
│   │    │   │   └── header/
│   │    │   │   │   │    # Marketplace header (sticky top bar, shown on every
│   │    │   │   │   │    # marketplace page)
│   │    │   │   │   ├── Header.tsx
│   │    │   │   │   │   # Main component: composes all header parts and owns
│   │    │   │   │   │   # shared state (query, category, menuOpen)
│   │    │   │   │   ├── Logo.tsx
│   │    │   │   │   │   # Brand logo link to "/", shrinks when the page is
│   │    │   │   │   │   # scrolled
│   │    │   │   │   ├── SearchBar.tsx
│   │    │   │   │   │   # Search form: input with rotating placeholder,
│   │    │   │   │   │   # category dropdown and submit button
│   │    │   │   │   ├── CategoryDropdown.tsx
│   │    │   │   │   │   # Desktop category picker (listbox), closes on outside
│   │    │   │   │   │   # click or Escape
│   │    │   │   │   ├── HeaderActions.tsx
│   │    │   │   │   │   # Right-side nav: wishlist, cart, account link and
│   │    │   │   │   │   # mobile hamburger button
│   │    │   │   │   ├── Badge.tsx
│   │    │   │   │   │   # Small count bubble (wishlist / cart) with pop-in
│   │    │   │   │   │   # animation
│   │    │   │   │   ├── MobileDrawer.tsx
│   │    │   │   │   │   # Slide-in mobile menu: categories, login / register.
│   │    │   │   │   │   # Locks body scroll while open
│   │    │   │   │   ├── classNames.ts
│   │    │   │   │   │   # Helper to join conditional CSS class names
│   │    │   │   │   ├── header.constants.ts
│   │    │   │   │   │   # Default categories, placeholder texts, scroll
│   │    │   │   │   │   # threshold and placeholder interval
│   │    │   │   │   ├── header.css
│   │    │   │   │   │   # Keyframe animations (bs-ping, bs-flow, bs-pop) and
│   │    │   │   │   │   # reduced-motion rules
│   │    │   │   │   └── hooks/
│   │    │   │   │   │    │   # Hooks used only by the header
│   │    │   │   │        ├── useScrolled.ts
│   │    │   │   │        │   # Returns true once the page is scrolled past a
│   │    │   │   │        │   # threshold
│   │    │   │   │        ├── useRotatingPlaceholder.ts
│   │    │   │   │        │   # Cycles the search placeholder text, pauses while
│   │    │   │   │        │   # the user types
│   │    │   │   │        └── useClickOutside.ts
│   │    │   │   │            # Runs a callback on outside click or Escape key
│   │    │   │   │
│   │    │   │   │
│   │    │   │   └── mainNavigation/        # navigation bar 
│   │    │   │       │ 
│   │    │   │       │
│   │    │   │       └── Navbar.tsx          # Container. It holds the active-link state, wires the hooks together and renders the bar, the scroll-progress line and the cursor glow. 
│   │    │   │       │
│   │    │   │       │
│   │    │   │       └── DesktopNav.tsx      # The desktop links, with the underline, icon slide-in and pulsing “Hot” badge.
│   │    │   │       │  
│   │    │   │       │
│   │    │   │       └── MobileMenu.tsx      # The slide-down panel, the backdrop and the staggered items.
│   │    │   │       │
│   │    │   │       │
│   │    │   │       └──
│   │    │   └── homePage/        # market palace home page components (hero page)
│   │    │       │
│   │    │       └── heroBanner/         # home page hero banner
│   │    │
│   │    │
│   │    │
│   │    └── inventory/       # for inventory management side page components
│   │    │   │
│   │    │   └── iCommon/          # common components for inventory
│   │    └── shared/          # shared components for inventory and marketplace
│   │__
│   |    |   | 
│   |    |   |
│   |    |   |
│   |    |   |
├── lib/                  # Utility functions & Prisma client setup
│   └── prisma.ts         # Prisma DB instance
├── prisma/               # Database schema & migrations
│   └── schema.prisma     # Prisma data models
└── public/               # Static assets (Images, Icons, SVG)
    └── bitsshoplogo.png  # Default header logo (used by Header.tsx)
```





alt + z walin lext wrap eka ain wenawa 