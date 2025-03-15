import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Import pages (to be created later)
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public routes */}
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              {/* <Route path="/" element={<Dashboard />} /> */}

              {/* Temporary home page until we create the actual pages */}
              <Route path="/" element={
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                  <h1 className="text-4xl font-bold mb-4">Code Review Platform</h1>
                  <p className="text-xl mb-8">Authentication infrastructure is set up!</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                    <div className="bg-card p-6 rounded-lg shadow">
                      <h2 className="text-2xl font-semibold mb-2">Backend</h2>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>User model with password hashing</li>
                        <li>JWT authentication middleware</li>
                        <li>Authentication routes (register, login)</li>
                        <li>Protected route middleware</li>
                      </ul>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                      <h2 className="text-2xl font-semibold mb-2">Frontend</h2>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Authentication service</li>
                        <li>API utility with token handling</li>
                        <li>Authentication context provider</li>
                        <li>Protected routes (coming soon)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
