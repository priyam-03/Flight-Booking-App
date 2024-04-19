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
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Stack, Typography } from "@mui/material";

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

const generateDummyData = () => {
  // Generate an array of dummy booking objects
  const dummyData = [];
  for (let i = 0; i < 10; i++) {
    const dummyBooking = {
      bookingId: i + 1,
      firstName: `John${i}`,
      lastName: `Doe${i}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      email: `john.doe${i}@example.com`,
      phoneNo: `+1234567890${i}`,
      requiredSeats: Math.floor(Math.random() * 5) + 1,
      flightId: `FL${i + 100}`,
      flights: {
        origin: "Origin",
        destination: "Destination",
        departureTime: "Departure Time",
        arrivalTime: "Arrival Time",
        seats: Math.floor(Math.random() * 200) + 50,
        fare: Math.floor(Math.random() * 5000) + 1000,
      },
      bookedOn: "Booked On",
      updatedOn: "Updated On",
    };
    dummyData.push(dummyBooking);
  }
  return dummyData;
};
const generateDummyUserData = () => {
  // Generate dummy user data
  return {
    userId: 1,
    username: "JohnDoe",
    email: "johndoe@example.com",
    phoneNo: "+1234567890",
    userPassword: "********",
  };
};

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

export default function GetBookingDetailsForUser() {
  const userdata = localStorage.getItem("user");
  const user = JSON.parse(userdata);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [booking, setBooking] = useState([]);
  //   const [user, setUser] = useState([]);

  const url = "http://localhost:8084/booking/User={}";

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const urlgetuser = "http://localhost:8083/users/getAll";

  let config = {
    headers: {
      Authorization: "Bearer " + user.jwtToken,
    },
  };
  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("user")));
    axios
      .get(
        `http://localhost:9001/api/v1/booking/user/${user.userDTO.id}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setBooking(res.data);
        setIsLoaded(true);
      })
      .then((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  //fetch bookings details
  // useEffect(() => {
  //     axios.get(url)
  //         .then(res => {
  //             console.log(res.data);
  //             setBooking(res.data);
  //             setIsLoaded(true);
  //         })
  //         .then(
  //             (error) => {
  //                 setIsLoaded(true);
  //                 setError(error);
  //             }
  //         )
  // }, [])

  //   useEffect(() => {
  //     // Simulate API call delay with setTimeout
  //     setTimeout(() => {
  //       const dummyData = generateDummyData();
  //       setBooking(dummyData);
  //       console.log(JSON.parse(localStorage.getItem("user")));
  //       setUser(JSON.parse(localStorage.getItem("user")));
  //       setIsLoaded(true);
  //     }, 1000); // Adjust delay as needed
  //   }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <>
        <Box
          sx={{
            backdropFilter: "blur(8px)",
            backgroundColor: "white",
            borderRadius: 2,
            width: "100%",
            maxWidth: 600,
            color: "black",
          }}
        >
          <Typography variant="h6" color="white">
            User Details
          </Typography>
        </Box>
        <Stack sx={{ m: 1 }} alignItems="center" direction="row" spacing={2}>
          <Card sx={{ minWidth: 345, maxWidth: 785 }}>
            <CardHeader
              sx={{ bgcolor: blue[800] }}
              title={
                <Typography variant="h6" color="white">
                  Booking Details
                </Typography>
              }
            />
            <CardActions disableSpacing>
              <Typography color="gray" variant="body2" sx={{ ml: 1 }}>
                click the arrow to see all booking details
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
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(30, 124, 145, 0.7)",
          borderRadius: 3,
          width: "100%",
          maxWidth: 600,
          color: "white",
          marginBottom: 2,
          padding: 4,
          fontWeight: "bold",
        }}
      >
        <Typography variant="h3" color="white" sx={{ mb: 2 }}>
          User Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              User ID: {user.userDTO.id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Username: {user.userDTO.name}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              Email: {user.userDTO.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Phone No: {user.userDTO.phoneNo}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Card sx={{ minWidth: 345, maxWidth: 1000 }}>
          <CardHeader
            sx={{ bgcolor: blue[900] }}
            title={
              <Typography variant="h6" color="white">
                Booking Details
              </Typography>
            }
          />
          <CardActions disableSpacing>
            <Typography color="gray" variant="body2" sx={{ ml: 1 }}>
              click the arrow to see all booking details
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
                  sx={{ minWidth: 1200 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Booking ID</StyledTableCell>
                      <StyledTableCell>Deal ID</StyledTableCell>

                      <StyledTableCell>Origin</StyledTableCell>
                      <StyledTableCell>Destination</StyledTableCell>
                      <StyledTableCell>Departure Time</StyledTableCell>
                      <StyledTableCell>Arrival Time</StyledTableCell>

                      <StyledTableCell align="right">Fare</StyledTableCell>
                      <StyledTableCell align="right">Booked On</StyledTableCell>
                      <StyledTableCell align="right">
                        Updated On
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {booking.map((book) => (
                      <StyledTableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={book.bookingId}
                      >
                        <StyledTableCell component="th" scope="row">
                          {book.bookingId}
                        </StyledTableCell>

                        <StyledTableCell>{book.dealDTO.dealId}</StyledTableCell>

                        <StyledTableCell>
                          {book.dealDTO.departurecity}
                        </StyledTableCell>
                        <StyledTableCell>
                          {book.dealDTO.arrivalcity}
                        </StyledTableCell>
                        <StyledTableCell>
                          {book.dealDTO.departureTime}
                        </StyledTableCell>
                        <StyledTableCell>
                          {book.dealDTO.arrivalTime}
                        </StyledTableCell>

                        <StyledTableCell sx={{ minWidth: 55 }} align="right">
                          <CurrencyRupeeIcon fontSize="inherit" />
                          {book.dealDTO.fare}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {book.dealDTO.createdAt}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {book.dealDTO.updatedAt}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Collapse>
        </Card>
      </Stack>
    </>
  );
}
