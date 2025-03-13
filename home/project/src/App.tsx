import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Home, Delete } from '@mui/icons-material';
import TournamentSetup from '@/components/TournamentSetup';
import TournamentBracket from '@/components/TournamentBracket';

// Sample data for demonstration
const sampleMatches = [
  {
    id: '1',
    round: 1,
    player1: { id: '1', name: 'John Doe', score: 3 },
    player2: { id: '2', name: 'Jane Smith', score: 2 }
  },
  {
    id: '2',
    round: 1,
    player1: { id: '3', name: 'Mike Johnson', score: 4 },
    player2: { id: '4', name: 'Sarah Wilson', score: 1 }
  },
  {
    id: '3',
    round: 2,
    player1: { id: '1', name: 'John Doe', score: 4 },
    player2: { id: '3', name: 'Mike Johnson', score: 3 }
  }
];

export default function App() {
  return (
    <Box className="min-h-screen bg-slate-900">
      <AppBar position="static" className="bg-slate-800">
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
          <Route 
            path="/bracket" 
            element={<TournamentBracket matches={sampleMatches} />} 
          />
        </Routes>
      </Box>
    </Box>
  );
}