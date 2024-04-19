import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function About() {
    const teamMembers = [
        { name: 'Avigyan Roy', rollNo: '002110501113' },
        { name: 'Dwip Brahma', rollNo: '002110501116' },
        { name: 'Farhan Ikbal', rollNo: '002110501120' },
        { name: 'Priyam Saha', rollNo: '002110501125' },
        { name: 'Sambit Sarkar', rollNo: '002110501127' }
    ];

    // Sorting team members array based on roll number
    teamMembers.sort((a, b) => a.rollNo.localeCompare(b.rollNo));

    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, width: '100%', maxWidth: 600, color: 'black' }}>
            <Stack sx={{ m: 2 }}>
                <Typography color='darkblue' align="left" variant="h2" gutterBottom>
                    About Us
                </Typography>
                <Typography align="left" variant="body1" variant="h4" >
                  IT  Assignment  4 
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Roll No</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teamMembers.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.rollNo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box>
    )
}
