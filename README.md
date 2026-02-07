# React Chatbot Template

A beautiful, modern chatbot interface built with React, TypeScript, and Tailwind CSS. 

## Features

- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🔧 **TypeScript** - Full type safety and excellent developer experience
- 🎯 **Responsive** - Works perfectly on desktop and mobile devices
- 🌙 **Dark Theme** - Elegant dark theme with proper contrast ratios
- 💬 **Interactive Chat** - Real-time chat interface with loading states
- 🚀 **Modern Stack** - React 18, TypeScript, Tailwind CSS, Vite

## Getting Started

### Prerequisites

- Node.js 16.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-chatbot-template
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Chat.tsx          # Main chat interface
│   ├── ChatInput.tsx     # Message input component
│   ├── ChatMessage.tsx   # Individual message component
│   └── EmptyState.tsx    # Welcome screen with suggestions
├── types/
│   └── chat.ts          # TypeScript type definitions
├── App.tsx              # Root component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Customization

### Colors
The color scheme is defined in `tailwind.config.js`. You can customize the chat colors by modifying the theme:

```javascript
theme: {
  extend: {
    colors: {
      'chat-bg': '#343541',        // Main background
      'chat-sidebar': '#202123',   // Sidebar background
      'chat-input': '#40414f',     // Input background
      // ... more colors
    }
  }
}
```

### API Integration
The current implementation uses mock responses. To integrate with a real API:

1. Replace the `generateResponse` function in `Chat.tsx`
2. Add your API endpoint and authentication
3. Handle streaming responses if needed

### Styling
The interface uses Tailwind CSS for styling. You can customize the appearance by:

- Modifying classes in component files
- Adding new utility classes in `index.css`
- Extending the Tailwind configuration

## Technologies Used

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **ESLint** - Code linting and formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details
