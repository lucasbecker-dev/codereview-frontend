# Code Review Platform - Frontend

This repository contains the React frontend for the Code Review Platform, a centralized environment for bootcamp students to submit coding projects and receive feedback from assigned reviewers.

## Technology Stack

- **Frontend**: React.js
- **Styling**: TailwindCSS
- **Component Library**: Shadcn/UI
- **UI Primitives**: Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **Code Highlighting**: Prism.js

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd code-review-platform-frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/     # UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and constants
├── pages/          # Page components
├── providers/      # Context providers
├── styles/         # Global styles
└── app.jsx         # Main application component
```

## Features

- User authentication (login, register, password reset)
- Project submission and management
- Code viewing with syntax highlighting
- Inline commenting system
- Notification system
- Role-based dashboards (student, reviewer, admin)

## License

[MIT](LICENSE)
