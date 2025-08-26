# Wellness Tracker

A beautiful and modern wellness tracking application built with Next.js, featuring a responsive design and comprehensive wellness metrics tracking.

## Features

### 🚀 Core Functionality
- **Authentication System**: Mock login/signup with local storage persistence
- **Daily Entries**: Add, edit, and delete wellness entries
- **Comprehensive Tracking**: Steps, sleep, mood, water intake, and exercise
- **Data Visualization**: Interactive charts using Recharts
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🎨 UI/UX Features
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

### 📊 Dashboard & Analytics
- **Summary Cards**: Key metrics at a glance
- **Interactive Charts**: 
  - Steps & Sleep trends (Line Chart)
  - Mood & Exercise patterns (Bar Chart)
- **Statistics**: Total steps, averages, and streak tracking

### 💾 Data Management
- **Local Storage**: Persistent data storage for mock entries
- **Export Functionality**: CSV and PDF export options
- **Mock Data**: 30 days of sample data for immediate testing

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellness-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email**: `demo@wellness.com`
- **Password**: Any password (mock authentication)

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout with theme provider
│   └── page.tsx        # Main page component
├── components/         # React components
│   ├── AuthScreen.tsx  # Authentication interface
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Header.tsx      # Navigation header
│   ├── SummaryCards.tsx # Metric summary cards
│   ├── WellnessChart.tsx # Chart components
│   ├── EntryForm.tsx   # Add/edit entry form
│   ├── EntriesList.tsx # Entries management
│   ├── ExportModal.tsx # Data export modal
│   └── ThemeProvider.tsx # Theme context provider
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication logic
│   └── useWellnessData.ts # Data management
└── types/              # TypeScript type definitions
    └── wellness.ts     # Wellness data types
```

## Key Components

### Authentication Flow
- Mock authentication system with local storage
- Seamless login/signup experience
- User session management

### Dashboard
- **Overview Tab**: Summary cards and charts
- **Entries Tab**: List and manage all entries
- **Add Entry Tab**: Create new wellness entries

### Data Visualization
- **Steps & Sleep Chart**: Line chart showing daily trends
- **Mood & Exercise Chart**: Bar chart for categorical data
- **Responsive Charts**: Adapt to different screen sizes

### Entry Management
- **Add Entries**: Comprehensive form with validation
- **Edit Entries**: Inline editing for quick updates
- **Delete Entries**: Confirmation-based deletion
- **Date Validation**: Prevents duplicate entries

## Customization

### Colors & Theme
The application uses a custom color palette defined in `tailwind.config.js`:
- **Primary Colors**: Blue tones for main actions
- **Wellness Colors**: Green tones for health-related elements
- **Dark Mode**: Automatic theme switching with manual override

### Styling
- **Component Classes**: Reusable CSS classes in `globals.css`
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Animations**: Smooth transitions and hover effects

## Export Features

### CSV Export
- Comma-separated values format
- Includes all entry data and summary statistics
- Automatic file naming with current date

### PDF Export
- Text-based format (demo implementation)
- Comprehensive wellness report
- Ready for integration with proper PDF libraries

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: Responsive design for all screen sizes
- **Progressive Enhancement**: Graceful degradation for older browsers

## Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Images**: SVG icons for crisp display
- **Efficient State Management**: Minimal re-renders
- **Local Storage**: Fast data access and persistence

## Future Enhancements

- **Real Backend**: API integration for production use
- **Advanced Charts**: More chart types and analytics
- **Goal Setting**: Wellness goals and progress tracking
- **Social Features**: Share achievements and challenges
- **Mobile App**: React Native or PWA implementation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Next.js and Tailwind CSS** 