import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="tool-bar">
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: "pointer" }} 
          onClick={handleHome}
        >
          Expense Tracker
        </Typography>

        {isAuthenticated && location.pathname !== "/dashboard" && (
          <Button
          className="signbutton"
            color="inherit"
            onClick={handleDashboard}

          >
            Dashboard
          </Button>
        )}

        {isAuthenticated ? (
          <Button 
           className="signbutton"
            color="inherit" 
            onClick={handleLogout}
            sx={{
              backgroundColor: "inherit",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
            className="signbutton"
              color="inherit"
              component={Link}
              to="/signin"
              sx={{
                backgroundColor: location.pathname === "/signin" ? "#1976d2" : "inherit", 
                color: location.pathname === "/signin" ? "black" : "white", 
                "&:hover": { 
                  backgroundColor: location.pathname === "/signin" ? "#1976d2" : "rgba(0, 0, 0, 0.1)", 
                },
                marginRight: "8px",
              }}
            >
              Sign In
            </Button>

            <Button
              className="signbutton"
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                backgroundColor: location.pathname === "/signup" ? "#1976d2" : "inherit", 
                color: location.pathname === "/signup" ? "black" : "white", 
                "&:hover": {
                  backgroundColor: location.pathname === "/signup" ? "#1976d2" : "rgba(0, 0, 0, 0.1)", 
                },
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>

      <ToastContainer />
    </AppBar>
  );
};

export default NavBar;
