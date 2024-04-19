import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Box, Link, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Login from "./LoginForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const url = "http://localhost:9001/api/v1/booking";
function BookFlight(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      navigate("/");
      return;
    }
    setOpen(false);
    navigate("/");
  };

  const [inputs, setInputs] = useState({
    Name: "",
    gender: "",
    email: "",
    phoneNo: "",
    requiredSeats: "",
  });

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
  };

  const [bookingId, setBookingId] = useState([]);

  useEffect(() => {
    // Simulate API call delay with setTimeout
    const user = JSON.parse(localStorage.getItem("user"));
    setUsers(user);
  }, []);

  const handleSubmit = (event) => {
    axios
      .post(
        `http://localhost:9001/api/v1/booking/user/${users.userId}/post/${location.state.flight.dealId}`
      )
      .then((res) => {
        console.log(res.data);
        setBookingId(res.data.bookingId);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();

    //remove the next 3 lines
    setBookingId(1);
    setOpen(true);
    event.preventDefault();
  };
  const loggedIn = () => {
    const user = localStorage.getItem("user");
    console.log(user);
    return user !== null && user !== "";
  };

  const userData = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);

      return user;
    } catch (e) {
      return;
    }
  };
  if (users)
    return (
      <Box
        component={Paper}
        elevation={5}
        sx={{ backgroundColor: "white", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{ m: 2 }}
            alignItems="center"
            direction="column"
            spacing={2}
          >
            <Stack
              sx={{ m: 1 }}
              alignItems="center"
              direction="column"
              spacing={0}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AirplaneTicketIcon fontSize="medium" />
              </Avatar>
              <Typography component="h1" variant="h5" color="black">
                Book Flight
              </Typography>
              <Typography variant="caption">
                Flight {location.state.flight.flightId} from{" "}
                {location.state.flight.origin} to{" "}
                {location.state.flight.destination}
              </Typography>
            </Stack>
            <Stack
              sx={{ m: 1, width: "stretch" }}
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                required
                fullWidth
                id="outlined-required-firstName"
                label="Name"
                name="Name"
                value={loggedIn && users?.username}
                disabled
                sx={{ mb: 1, ml: 2 }}
              />
            </Stack>
            <TextField
              required
              fullWidth
              id="outlined-required-email"
              label="Email"
              name="email"
              value={loggedIn && users?.email}
              disabled
              sx={{ mb: 1, ml: 2 }}
            />
            <TextField
              required
              fullWidth
              id="outlined-required-phoneNo"
              label="Phone Number"
              name="phoneNo"
              value={loggedIn && users?.phoneNo}
              disabled
              sx={{ mb: 1, ml: 2 }}
            />
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ ml: 2 }}
            >
              <FormControl>
                <FormLabel
                  sx={{ fontSize: "small" }}
                  id="demo-row-radio-buttons-group-label"
                >
                  Gender
                </FormLabel>
                <ToggleButtonGroup
                  color="primary"
                  size="small"
                  value={loggedIn && users?.gender}
                  exclusive
                  disabled
                  aria-label="gender"
                >
                  <ToggleButton value="Male">Male</ToggleButton>
                  <ToggleButton value="Female">Female</ToggleButton>
                  <ToggleButton value="Other">Other</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
              <FormControl sx={{ width: "20ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  passengers
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  required
                  fullWidth
                  type="number"
                  value={inputs.requiredSeats || 0}
                  inputProps={{ min: 1, max: 6 }}
                  onChange={handleChange("requiredSeats")}
                  label="required seats"
                />
              </FormControl>
            </Stack>
            <Button variant="contained" type="submit">
              Book Flight
            </Button>
            <Stack direction="row" spacing={1}>
              <Link href="/" variant="caption">
                Go back
              </Link>
            </Stack>
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                align="center"
                id="alert-dialog-title"
                color="green"
                variant="h5"
                gutterBottom
              >
                {"Booking Confirmed!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" color="black">
                  Your booking for flight {location.state.flight.flightId} from{" "}
                  {location.state.flight.origin} to{" "}
                  {location.state.flight.destination} has been confirmed with
                  Booking ID: {bookingId}.
                </DialogContentText>
                <DialogContentText
                  id="alert-dialog-description"
                  color="black"
                  gutterBottom
                >
                  Please note down the bookingId for future use.
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  Thank you for using Generic Airlines!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </form>
      </Box>
    );
  else
    return (
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          borderRadius: 3,
          p: 3,
          textAlign: "center",
          color: "Black",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Please Login to Book
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
        >
          You need to log in to access the booking feature.
        </Typography>
        <Button variant="contained" href="/login" sx={{ fontWeight: "bold" }}>
          Login
        </Button>
      </Box>
    );
}

export default BookFlight;
