import React, { useState, useEffect } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Stack, Typography } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[800],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

export default function GetAllFlights() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const userdata = localStorage.getItem("user");
  const user = JSON.parse(userdata);
  console.log(user);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [flights, setFlights] = useState([]);

  const url = "http://localhost:9001/api/v1/posts";

  const deleteUrl = "http://localhost:8084/flights/delete/";

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (flight) => {
    console.log(flight.flightId);
    axios
      .post(`/api/v1/booking` + flight.flightId)
      .then((res) => {
        console.log(res.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BookFlight = (flight) => {
    axios
      .get(
        `http://localhost:9001/api/v1/booking/user/${user.userDTO.id}/post/${flight.dealId}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        // setBookingId(res.data.bookingId);
        // setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
    // event.preventDefault();s

    //remove the next 3 lines

    setOpen(true);
    navigate("/userprofile");
    // event.preventDefault();
  };
  const handleEdit = (flight) => {};
  let config = {
    headers: {
      Authorization: "Bearer " + user.jwtToken,
    },
  };
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        setFlights(res.data);
        setIsLoaded(true);
      })
      .then((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Stack alignItems="center" direction="row" spacing={2}>
        <Card sx={{ minWidth: 345, maxWidth: 785 }}>
          <CardHeader
            sx={{ bgcolor: blue[800] }}
            title={
              <Typography variant="h6" color="white">
                Deal Details
              </Typography>
            }
          />
          <CardActions disableSpacing>
            <Typography color="gray" variant="body2" sx={{ ml: 1 }}>
              click the arrow to see all deal details
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
              <Box sx={{ backgroundColor: "white", borderRadius: 2 }}>
                <Stack
                  sx={{ width: 700, display: "flex", alignItems: "center" }}
                >
                  <CircularProgress />
                </Stack>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      <Card sx={{ minWidth: 345, maxWidth: 1000 }}>
        <CardHeader
          sx={{ bgcolor: blue[900] }}
          title={
            <Typography variant="h6" color="white">
              Deal Details
            </Typography>
          }
        />
        <CardActions disableSpacing>
          <Typography color="gray" variant="body2" sx={{ ml: 1 }}>
            get/delete deal details
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
            <TableContainer sx={{ maxHeight: 310, borderRadius: 1 }}>
              <Table
                stickyHeader
                sx={{ minWidth: 850 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Flight ID</StyledTableCell>
                    <StyledTableCell>Origin</StyledTableCell>
                    <StyledTableCell>Destination</StyledTableCell>
                    <StyledTableCell>Departure Time</StyledTableCell>
                    <StyledTableCell>Arrival Time</StyledTableCell>
                    <StyledTableCell align="right">Seats</StyledTableCell>
                    <StyledTableCell align="right">Fare</StyledTableCell>
                    <StyledTableCell align="right">Valid Till</StyledTableCell>
                    {JSON.parse(localStorage.getItem("user")).isAdmin ? (
                      <>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                        <StyledTableCell align="center">Edit</StyledTableCell>
                      </>
                    ) : (
                      <StyledTableCell align="center">Book</StyledTableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight) => (
                    <StyledTableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={flight.dealId}
                    >
                      <StyledTableCell component="th" scope="row">
                        {flight.dealId}
                      </StyledTableCell>
                      <StyledTableCell>{flight.departurecity}</StyledTableCell>
                      <StyledTableCell>{flight.arrivalcity}</StyledTableCell>
                      <StyledTableCell>{flight.departureTime}</StyledTableCell>
                      <StyledTableCell>{flight.arrivalTime}</StyledTableCell>
                      <StyledTableCell align="right">
                        {flight.seats}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <del>
                          <CurrencyRupeeIcon fontSize="inherit" />
                          {flight.oldfare}
                        </del>{" "}
                        <CurrencyRupeeIcon fontSize="inherit" />
                        {flight.fare}
                      </StyledTableCell>
                      <StyledTableCell>{flight.validStill}</StyledTableCell>
                      {JSON.parse(localStorage.getItem("user")).isAdmin ? (
                        <>
                          <StyledTableCell align="center">
                            <Tooltip title={"Flight " + flight.dealId}>
                              <IconButton
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(flight)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() => handleEdit(flight)}
                            >
                              Edit
                            </Button>
                          </StyledTableCell>
                        </>
                      ) : (
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => BookFlight(flight)}
                          >
                            Book
                          </Button>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Collapse>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Deal deleted successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
