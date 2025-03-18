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

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="tool-bar">
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={handleHome}>
          Expense Tracker
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/signin"
              sx={{
                backgroundColor: location.pathname === "/signin" ? "#EBA832" : "inherit", 
                color: location.pathname === "/signin" ? "black" : "white", 
                "&:hover": {
                  backgroundColor: location.pathname === "/signin" ? "#EBA832" : "rgba(0, 0, 0, 0.1)", 
                },
              }}
              className="signbutton"
            >
              Sign In
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                backgroundColor: location.pathname === "/signup" ? "#EBA832" : "inherit", 
                color: location.pathname === "/signup" ? "black" : "white", 
                "&:hover": {
                  backgroundColor: location.pathname === "/signup" ? "#EBA832" : "rgba(0, 0, 0, 0.1)", 
                },
              }}
              className="signbutton"
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