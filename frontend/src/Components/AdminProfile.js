import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import UpdateFlights from "./UpdateFlights";
import GetAllFlights from "./GetAllFlights";
import GetBookingDetails from "./BookingDetails";
import GetUserDetails from "./UserDetails";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [inputs, setInputs] = useState({
    flightId: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
    fare: "",
    oldfare: "",
    dealValid: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setInputs({ ...inputs, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    const userdata = localStorage.getItem("user");
    const user = JSON.parse(userdata);
    const userObject = {
      departurecity: inputs.origin,
      arrivalcity: inputs.destination,
      departureTime: inputs.departureTime,
      arrivalTime: inputs.arrivalTime,
      seats: inputs.seats,
      oldfare: inputs.oldfare,
      fare: inputs.fare,
      validStill: inputs.dealValid,
    };
    console.log(userObject);

    axios
      .post(
        `http://localhost:9001/api/v1/posts/users/${user.userDTO.id}`,
        userObject,
        {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack alignItems="center" direction="column" spacing={2}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <GetAllFlights />
        <GetBookingDetails />
        <GetUserDetails />
      </Stack>
      <Stack sx={{ m: 1 }} alignItems="center" direction="row" spacing={2}>
        <Card sx={{ minWidth: 345, maxWidth: 745 }}>
          <CardHeader
            sx={{ bgcolor: blue[900] }}
            title={
              <Typography variant="h6" color="white">
                Add Deals
              </Typography>
            }
          />
          <CardActions disableSpacing>
            <Typography color="gray" variant="body2" sx={{ ml: 1 }}>
              click the arrow to add deals
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Stack
                  sx={{ m: 2 }}
                  alignItems="center"
                  direction="column"
                  spacing={2}
                >
                  <Stack
                    sx={{ m: 1, width: 680 }}
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <TextField
                      required
                      fullWidth
                      autoFocus
                      id="outlined-required-flightId"
                      label="flight id"
                      name="flightId"
                      value={inputs.flightId}
                      inputProps={{ pattern: "[0-9]{1,3}$" }}
                      onChange={handleChange("flightId")}
                    />
                    <TextField
                      required
                      fullWidth
                      id="outlined-required-origin"
                      label="origin"
                      name="origin"
                      value={inputs.origin}
                      inputProps={{ pattern: "[a-zA-Z]{4,16}$" }}
                      onChange={handleChange("origin")}
                    />
                    <TextField
                      required
                      fullWidth
                      id="outlined-required-destination"
                      label="destination"
                      name="destination"
                      value={inputs.destination}
                      inputProps={{ pattern: "[a-zA-Z]{4,16}$" }}
                      onChange={handleChange("destination")}
                    />
                  </Stack>
                  <Stack
                    sx={{ m: 1, width: "auto" }}
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <TextField
                      required
                      id="outlined-required-departureTime"
                      label="departure time"
                      name="departureTime"
                      value={inputs.departureTime}
                      onChange={handleChange("departureTime")}
                    />
                    <TextField
                      required
                      id="outlined-required-arrivalTime"
                      label="arrival time"
                      name="arrivalTime"
                      value={inputs.arrivalTime}
                      onChange={handleChange("arrivalTime")}
                    />
                    <TextField
                      required
                      id="outlined-required-seats"
                      label="seats"
                      name="seats"
                      value={inputs.seats}
                      inputProps={{ pattern: "[0-9]{1,3}$" }}
                      onChange={handleChange("seats")}
                    />
                    <TextField
                      required
                      id="outlined-old-fare"
                      label="Old fare"
                      name="oldfare"
                      value={inputs.oldfare}
                      inputProps={{ pattern: "[0-9]{1,5}$" }}
                      onChange={handleChange("oldfare")}
                    />
                    <TextField
                      required
                      id="outlined-required-fare"
                      label="Deal fare"
                      name="fare"
                      value={inputs.fare}
                      inputProps={{ pattern: "[0-9]{1,5}$" }}
                      onChange={handleChange("fare")}
                    />
                    <TextField
                      required
                      id="outlined-deal-valid"
                      label="Deal Valid Till"
                      name="dealValid"
                      value={inputs.dealValid}
                      onChange={handleChange("dealValid")}
                    />
                  </Stack>
                  <Button variant="contained" type="submit">
                    Add Deal
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Collapse>
        </Card>
        <UpdateFlights />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Deal added successfully!
          </Alert>
        </Snackbar>
      </Stack>
    </Stack>
  );
}
