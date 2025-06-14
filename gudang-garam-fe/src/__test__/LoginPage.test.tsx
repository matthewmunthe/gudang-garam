import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const customRender = (ui: React.ReactElement) =>
  render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );

describe("LoginPage", () => {
  test("renders login form", () => {
    customRender(<LoginPage />);
    // expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    // expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("allows user to input username and password", () => {
    customRender(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });

    expect(usernameInput).toHaveValue("admin");
    expect(passwordInput).toHaveValue("admin");
  });
});
