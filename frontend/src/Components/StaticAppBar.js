import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Function to check if there's a valid JWT token in localStorage
const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user !== null && user !== "";
};

const isAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const jwt = localStorage.getItem("jwt");
    return user && user.isAdmin && jwt !== null;
  } catch (e) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

export default function StaticAppBar() {
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn());
  const [isAdminUser, setIsAdminUser] = React.useState(isAdmin());

  React.useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(isLoggedIn());
      setIsAdminUser(isAdmin());
    };
    // Listen to changes in local storage
    window.addEventListener("storage", handleStorageChange);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Tooltip title="Home">
            <IconButton
              size="large"
              href="/flights"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 10, mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Typography
            fontFamily="Sans-serif"
            fontWeight={600}
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            DAPSF Airlines
          </Typography>
          <Button
            sx={{ fontFamily: "Sans-serif" }}
            size="large"
            href="/about"
            color="inherit"
          >
            About us
          </Button>
          {loggedIn ? (
            <>
              <Button
                sx={{ fontFamily: "Sans-serif", mr: 2 }}
                size="large"
                href={isAdminUser ? "/admin" : "/userprofile"}
                color="inherit"
              >
                Profile
                <AccountCircleIcon />
              </Button>
              <Button
                sx={{ fontFamily: "Sans-serif", mr: 10 }}
                size="large"
                onClick={logout}
                href="/"
                color="inherit"
              >
                Logout
                <ExitToAppIcon />
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ fontFamily: "Sans-serif" }}
                size="large"
                href="/register"
                color="inherit"
              >
                Sign Up
              </Button>
              <Button
                sx={{ fontFamily: "Sans-serif", mr: 10 }}
                size="large"
                href="/login"
                color="inherit"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
