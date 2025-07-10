// import "./App.css";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Dashboard } from "./pages/dashboard";
// import { Auth } from "./pages/auth";
// import { FinancialRecordsProvider } from "./contexts/financial-record-context";
// import { SignedIn, UserButton } from "@clerk/clerk-react";
// // import { dark } from "@clerk/themes";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <div className="navbar">
//           <Link to="/"> Dashboard</Link>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <FinancialRecordsProvider>
//                 <Dashboard />
//               </FinancialRecordsProvider>
//             }
//           />
//           <Route path="/auth" element={<Auth />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <RedirectToSignIn />;

  return children;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <Routes>
          {/* 👇 Protected Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider>
              </ProtectedRoute>
            }
          />

          {/* 👇 Optional Auth Page (if you want a separate route) */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
