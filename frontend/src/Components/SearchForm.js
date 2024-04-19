import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component

const indianCities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Kolkata',
    'Chennai',
    // Add more cities as needed
];

function Form() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ origin: '', destination: '' });
    const [error, setError] = useState('');

    const handleChange = event => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (inputs.origin === inputs.destination) {
            setError('Source and destination cannot be the same. Please choose different cities.');
        } else {
            setError('');
            navigate('/flights', { state: { origin: inputs.origin, destination: inputs.destination } });
        }
    }


    return (
        <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack sx={{ m: 2 }} direction='row' spacing={2}>
                    <TextField
                        select
                        required
                        id="origin"
                        label="From"
                        name='origin'
                        value={inputs.origin}
                        onChange={handleChange}
                        fullWidth
                        sx={{ minWidth: 200 }} // Adjust size here
                    >
                        {indianCities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        required
                        id="destination"
                        label="To"
                        name='destination'
                        value={inputs.destination}
                        onChange={handleChange}
                        fullWidth
                        sx={{ minWidth: 200 }} // Adjust size here
                    >
                        {indianCities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant='contained' type='submit'sx={{ minWidth: 150 }}>Search Flight</Button>
                </Stack>
                {error && (
                    <Box sx={{ m: 2 }}>
                        <span style={{ color: 'red' }}>{error}</span>
                    </Box>
                )}
            </form>
        </Box>
    )

}

export default Form;
