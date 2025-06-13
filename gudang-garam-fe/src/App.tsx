import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ItemForm from "./pages/ItemForm";
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<ItemForm />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
export default App;