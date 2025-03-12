# CodeReview Platform - Frontend

This repository contains the frontend application for the CodeReview Platform, a comprehensive system designed to facilitate code reviews for educational institutions, coding bootcamps, and development teams.

## Overview

The CodeReview Platform frontend is built with React, providing a modern and intuitive user interface that enables:

- User authentication and profile management
- Project submission and management
- Code viewing with syntax highlighting
- Inline and general commenting on code
- Dashboard views for different user roles
- Notification system

## Tech Stack

- **Framework**: React.js
- **Routing**: React Router
- **State Management**: Context API
- **Styling**: Styled Components
- **HTTP Client**: Axios
- **Code Highlighting**: PrismJS
- **Form Handling**: Formik with Yup validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Role-Based Access**: Different interfaces for students, reviewers, and administrators
- **Real-Time Notifications**: Stay updated on review activities
- **Syntax Highlighting**: Support for multiple programming languages
- **Inline Commenting**: Comment on specific lines of code

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
