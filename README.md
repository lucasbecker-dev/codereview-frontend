# CodeReview Platform - Frontend

This is the frontend application for the CodeReview Platform, a comprehensive tool designed to facilitate code reviews, feedback, and collaboration.

## Features

- User authentication and authorization
- Project submission and management
- Code viewing with syntax highlighting
- Inline commenting system
- Notification system
- Dashboard for different user roles

## Tech Stack

- React with Vite
- React Router for navigation
- Styled Components for styling
- Axios for API requests
- Formik and Yup for form validation
- PrismJS for code syntax highlighting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

### Development

To start the development server:

```bash
npm run dev
```

### Building for Production

To build the application for production:

```bash
npm run build
```

## Project Structure

```
codereview-frontend/
├── public/
├── src/
│   ├── assets/         # Static assets like images, icons
│   ├── components/     # Reusable UI components
│   │   ├── common/     # Common UI elements
│   │   ├── auth/       # Authentication components
│   │   ├── layout/     # Layout components
│   │   └── ...
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## License

[MIT](LICENSE)
