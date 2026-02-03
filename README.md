# 🏠 Real Estate App

A modern real estate application built with Next.js and Google Maps API for property management and location-based search.

## ✨ Features

- 🗺️ Interactive property map with Google Maps integration
- 🔍 Advanced search and filtering capabilities
- 📱 Fully responsive design for all devices
- ⚡ High-performance Next.js App Router
- 🎨 Beautiful UI components powered by shadcn/ui
- 📍 Custom map pins and location markers

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- Google Maps API Key

### Installation

1. Clone the repository

```bash
git clone https://github.com/bI3ear/real-estate-app.git
cd real-estate-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables

Create a `.env.local` file in the root directory and add your Google Maps API Key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result

## 📁 Project Structure

```
real-estate-app/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utility functions
├── public/                # Static assets
│   ├── pin.png           # Map pin icon
│   ├── pin90.jpg         # Map pin variant
│   └── locapin.png       # Location pin icon
├── googleMapsConfig.js    # Google Maps configuration
├── middleware.js          # Next.js middleware
├── components.json        # shadcn/ui configuration
└── package.json          # Dependencies
```

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** JavaScript
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Maps:** [Google Maps API](https://developers.google.com/maps)
- **Font:** [Geist Font](https://vercel.com/font)

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🗺️ Google Maps Setup

This project uses Google Maps API to display property locations on an interactive map.

### Setup Steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create an API Key
5. Add the API Key to your `.env.local` file

### API Key Restrictions (Recommended):

- Set application restrictions (HTTP referrers)
- Restrict API key to Maps JavaScript API only

## 🎨 Customization

### Customizing Map Pins

Map pin icons are located in the `public/` folder:
- `pin.png` - Default map pin
- `pin90.jpg` - Rotated pin variant
- `locapin.png` - Current location pin

You can replace these images with your own custom pins.

### Styling UI Components

This project uses shadcn/ui for components. To customize:
- Edit component files in `components/ui/`
- Modify `components.json` for global shadcn/ui settings
- Use Tailwind CSS classes for styling

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Next.js Tutorial](https://nextjs.org/learn) - Interactive Next.js tutorial
- [shadcn/ui Documentation](https://ui.shadcn.com/) - UI component library docs
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Google Maps Platform](https://developers.google.com/maps/documentation) - Maps API documentation

## 🚢 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your project to [Vercel](https://vercel.com/new)
3. Add environment variables (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Deployment Options

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Google Cloud Run](https://cloud.google.com/run)
- [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**bI3ear**

- GitHub: [@bI3ear](https://github.com/bI3ear)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Built with ❤️ using [Next.js](https://nextjs.org/)
