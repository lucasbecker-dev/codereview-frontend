# CodeReview Platform - Frontend

A modern, accessible platform for bootcamp students to submit coding projects and receive feedback from assigned reviewers.

## Technology Stack

- React.js with JavaScript (using JSDoc for type safety)
- Vite for build tooling
- Shadcn/UI for ALL components (following v0.dev implementation approach)
- Radix UI for accessible primitives (used by Shadcn/UI)
- TailwindCSS for styling
- React Router DOM for routing
- React Hook Form with Zod for form validation

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/codereview-frontend.git
   cd codereview-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:5173`

## Deployment

This project is configured for deployment on Railway. When you push changes to the main branch, Railway will automatically build and deploy the application.

### Railway Configuration

- Build Command: `npm run build`
- Start Command: `npm run preview`
- Environment Variables:
  - `VITE_API_URL`: URL of the backend service

## Project Structure

The project follows a feature-based structure with Shadcn/UI components for all UI elements:

- `/src/components/ui`: Shadcn/UI components
- `/src/components/custom`: Custom components (only when necessary)
- `/src/components/[feature]`: Feature-specific components
- `/src/layouts`: Page layouts
- `/src/pages`: Route components
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and constants
- `/src/providers`: Context providers

## Development Guidelines

- Use Shadcn/UI components for ALL UI elements
- Follow the exact same implementation approach as v0.dev
- Use JSDoc comments for type safety
- Use React Hook Form with Zod for form validation
- Follow the existing code style and patterns
