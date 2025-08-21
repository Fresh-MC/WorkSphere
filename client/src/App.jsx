// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import texture from "./assets/asfalt-dark.png";
import PostJob from "./components/PostJob";
import FreelancerJobs from "./pages/FreelancerJobs";
import JobSearch from "./pages/JobSearch";
import Portfolio from "./pages/Portfolio";

// PrivateRoute component
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />; // show loader while checking auth
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden relative" style={{ backgroundColor: "#F5F5F5" }}>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          opacity: 0.5,
          mixBlendMode: "multiply",
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <Routes>
  <Route path="/login" element={<Login />} />

  {/* Protected routes */}
  <Route
    path="/home"
    element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    }
  />
   <Route
    path="/job-search"
    element={
      <PrivateRoute>
        <JobSearch />
      </PrivateRoute>
    }
  />
   <Route
    path="/portfolio"
    element={
      <PrivateRoute>
        <Portfolio />
      </PrivateRoute>
    }
  />
  <Route
            path="/post-job"
            element={
              <PrivateRoute role="client">
                <PostJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute role="freelancer">
                <JobSearch />
              </PrivateRoute>
            }
          />
          <Route
  path="/jobs"
  element={
    <PrivateRoute role="freelancer">
      <FreelancerJobs />
    </PrivateRoute>
  }
/>
  <Route
    path="/"
    element={<Navigate to="/home" />} // redirect root to /home after login
  />
</Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
