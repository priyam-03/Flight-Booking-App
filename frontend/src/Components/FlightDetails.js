import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Box, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const Flights = () => {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(0);
    const location = useLocation()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flights, setFlights] = useState([]);
    const [timeLeftMap, setTimeLeftMap] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      let updatedTimeLeftMap = {};
      flights.forEach(flight => {
        const now = new Date().getTime();
        const dealValidTime = new Date(flight.dealValid).getTime();
        const distance = dealValidTime - now;
        updatedTimeLeftMap[flight.flightId] = distance > 0 ? distance : 0;
      });
      setTimeLeftMap(updatedTimeLeftMap);
    }, 1000);
    return () => clearInterval(interval);
  }, [flights]);

    const url = "http://localhost:8084/flights/getByFromTo"  

    const params = {
        origin: location.state.origin,
        destination: location.state.destination
    }
    console.log(location.state.origin, location.state.destination)
    //Send the location to database and fetch required flight details ONLY... json er oita soriye dish
    // useEffect(() => {
    //     axios.get(url, { params })
    //         .then(res => {
    //             console.log(res.data);
    //             setFlights(res.data);
    //             setIsLoaded(true);
    //         })
    //         .then(
    //             (error) => {
    //                 setIsLoaded(true);
    //                 setError(error);
    //             }
    //         )
    // }, [])

    const flightsData = [
        { 
          flightId: 1, 
          origin:"Kolkata",
          destination:"Mumbai",
          flightName: 'Flight 1', 
          departureTime: '09:00 AM', 
          arrivalTime: '11:00 AM', 
          seats: 150, 
          fare: 3000, 
          oldfare: 3200, 
          dealValid: new Date('2024-04-15T12:00:00'), 
        },
        { 
          flightId: 2, 
          flightName: 'Flight 2', 
          origin:"Kolkata",
          destination:"Mumbai",
          departureTime: '11:30 AM', 
          arrivalTime: '01:30 PM', 
          seats: 120, 
          fare: 3500, 
          oldfare: 3700, 
          dealValid: new Date('2024-04-15T14:30:00'),
        },
        { 
          flightId: 3, 
          flightName: 'Flight 3', 
          origin:"Kolkata",
          destination:"Mumbai",
          departureTime: '02:00 PM', 
          arrivalTime: '04:00 PM', 
          seats: 200, 
          fare: 2800, 
          oldfare: 3000, 
          dealValid: new Date('2024-04-15T17:00:00'), // Example deal valid until April 15, 2024, 5:00 PM
        },
      ];
      

    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            setFlights(flightsData);
            setIsLoaded(true);
        }, 1000);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setCounter(prevCounter => prevCounter + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
      const formatTime = (time) => {
        // You can implement your own time formatting logic here
        return time;
      };
    

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                <Stack sx={{ m: 2, width: 850, display: 'flex', alignItems: 'center' }}>
                    <CircularProgress />
                </Stack>
            </Box>
        )
    }
    else if (flights.length === 0) {
        return (
            <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                <Stack sx={{ m: 2, width: 850, display: 'flex' }}>
                    <FlightTakeoffIcon sx={{ mb: 1, fontSize: '150%', color: 'black' }} />
                    <Typography component='h1' variant='caption' color='black' align='left'>
                        Departing flight
                    </Typography>
                    <Typography sx={{ mb: 2 }} component='h1' variant='h4' color='black' align='left'>
                        {params.origin} to {params.destination}
                    </Typography>
                    <Typography sx={{ mt: 5, mb: 2 }} component='h1' variant='body1' color='black' align='center'>
                        Oops! Looks like there are no current flights from {params.origin} to {params.destination}
                    </Typography>
                </Stack>
            </Box>
        );
    }
    else {
        return (
            <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
              <Stack sx={{ m: 2 }}>
                <FlightTakeoffIcon sx={{ mb: 1, fontSize: '150%', color: 'black' }} />
                <Typography component='h1' variant='caption' color='black' align='left'>
                  Departing flight
                </Typography>
                <Typography sx={{ mb: 2 }} component='h1' variant='h4' color='black' align='left'>
                  {params.origin} to {params.destination}
                </Typography>
                <TableContainer sx={{ maxHeight: 400, borderRadius: 2 }} >
                  <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                       
                        <StyledTableCell>Departure Time</StyledTableCell>
                        <StyledTableCell>Arrival Time</StyledTableCell>
                        <StyledTableCell align="right">Seats</StyledTableCell>
                        <StyledTableCell align="right">Fare</StyledTableCell>
                        <StyledTableCell align="center">Book</StyledTableCell>
                        <StyledTableCell align="right">Offer Valid For</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {flights.map((flight) => (
                        <StyledTableRow key={flight.flightId}>
                          <StyledTableCell>{formatTime(flight.departureTime)}</StyledTableCell>
                          <StyledTableCell>{formatTime(flight.arrivalTime)}</StyledTableCell>
                          <StyledTableCell align="right">{flight.seats}</StyledTableCell>
                          <StyledTableCell align="right">
                            <del><CurrencyRupeeIcon fontSize='inherit' />{flight.oldfare}</del>
                            {' '}
                            <CurrencyRupeeIcon fontSize='inherit' />{flight.fare}
                          </StyledTableCell>
                          <StyledTableCell sx={{ maxWidth: 40 }} align="center">
                            <Button variant='contained' onClick={() => navigate('/book', { state: { flight: flight } })}>Book</Button>
                          </StyledTableCell>
                          
                          <StyledTableCell align="right">
                            {Math.floor((timeLeftMap[flight.flightId] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h{' '}
                            {Math.floor((timeLeftMap[flight.flightId] % (1000 * 60 * 60)) / (1000 * 60))}m{' '}
                            {Math.floor((timeLeftMap[flight.flightId] % (1000 * 60)) / 1000)}s
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant='body2' color='black' align='left' fontWeight='bold'>
                  Special deal price
                </Typography>
              </Stack>
            </Box>
          );
    }
}
export default Flights;