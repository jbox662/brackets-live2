import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Home, Delete } from '@mui/icons-material';
import TournamentSetup from './components/TournamentSetup';
import TournamentBracket from './components/TournamentBracket';

export default function App() {
  return (
    <Box className="min-h-screen bg-felt-texture bg-cover bg-center bg-fixed">
      <AppBar position="static" className="bg-slate-800/90 backdrop-blur">
        <Toolbar>
          <Link to="/" className="mr-4">
            <IconButton color="inherit">
              <Home />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" className="flex-grow">
            Billiards Tournament Manager
          </Typography>
          <IconButton color="inherit" aria-label="delete bracket">
            <Delete />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<TournamentSetup />} />
          <Route path="/bracket" element={<TournamentBracket />} />
        </Routes>
      </Box>
    </Box>
  );
}