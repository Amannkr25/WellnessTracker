# Wellness Tracker

A modern wellness tracking app built with Next.js, featuring responsive design and comprehensive metrics.

## Features

### 🚀 Core
- **Authentication**: Mock login/signup with local storage
- **Daily Entries**: Add, edit, delete wellness entries
- **Tracking**: Steps, sleep, mood, water, exercise
- **Charts**: Interactive visualizations (Recharts)
- **Responsive**: Mobile-first with Tailwind CSS

### 🎨 UI/UX
- **Modern Design**: Clean interface, smooth animations
- **Dark/Light Mode**: Theme toggle, system detection
- **Responsive Layout**: Optimized for all devices
- **Interactive Elements**: Hover, transitions, micro-interactions

### 📊 Dashboard & Analytics
- **Summary Cards**: Key metrics overview
- **Charts**: 
   - Steps & Sleep (Line)
   - Mood & Exercise (Bar)
- **Statistics**: Totals, averages, streaks

### 💾 Data Management
- **Local Storage**: Persistent mock data
- **Export**: CSV and PDF options
- **Sample Data**: 30 days for testing

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, custom design
- **Charts**: Recharts
- **Icons**: Lucide React
- **Dates**: date-fns
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd wellness-tracker
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email**: `demo@wellness.com`
- **Password**: Any (mock auth)

## Project Structure

```
src/
├── app/                 # Next.js app
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/          # React components
│   ├── AuthScreen.tsx   # Auth UI
│   ├── Dashboard.tsx    # Dashboard
│   ├── Header.tsx       # Navigation
│   ├── SummaryCards.tsx # Metrics
│   ├── WellnessChart.tsx# Charts
│   ├── EntryForm.tsx    # Entry form
│   ├── EntriesList.tsx  # Entries
│   └── ThemeProvider.tsx# Theme context
├── hooks/               # Custom hooks
│   ├── useAuth.ts       # Auth logic
│   └── useWellnessData.ts # Data logic
└── types/               # Type definitions
      └── wellness.ts      # Wellness types
```

## Key Components

### Authentication
- Mock system with local storage
- Login/signup flow
- Session management

### Dashboard
- **Overview**: Summary cards, charts
- **Entries**: List/manage entries
- **Add Entry**: Create new entries

### Visualization
- **Steps & Sleep**: Line chart
- **Mood & Exercise**: Bar chart
- **Responsive**: Adapts to screens

### Entry Management
- **Add/Edit/Delete**: Form with validation, inline editing, confirmation
- **Date Validation**: Prevent duplicates

## Customization

### Theme
- Custom palette in `tailwind.config.js`
- **Primary**: Blue
- **Wellness**: Green
- **Dark Mode**: Auto/manual switch

### Styling
- Reusable classes in `globals.css`
- Mobile-first breakpoints
- Smooth animations

## Export

### CSV
- All entry data, summary stats
- Auto file naming

### PDF
- Demo text-based report
- Ready for PDF library integration

## Browser Support

- Chrome, Firefox, Safari, Edge
- Mobile responsive
- Progressive enhancement

## Performance

- Lazy loading
- SVG icons
- Efficient state management
- Fast local storage

## Roadmap

- Real backend/API
- Advanced charts
- Goal setting
- Social features
- Mobile app (React Native/PWA)

## Contributing

1. Fork repo
2. Create feature branch
3. Make changes
4. Add tests
5. Submit PR

## License

Open source under [MIT License](LICENSE).

## Support

Open an issue or contact the team.

---

**Built with ❤️ using Next.js & Tailwind CSS**
