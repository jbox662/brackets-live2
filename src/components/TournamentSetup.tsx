import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography } from '@mui/material';
import { TournamentSettings, defaultTournamentSettings, TournamentErrors, Player } from '../types/tournament';
import PlayerRegistration from './PlayerRegistration';
import { format } from 'date-fns';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTournamentStore } from '../store/tournamentStore';

const SAMPLE_PLAYERS: Player[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-0101', fargoRating: 650 },
  { id: '2', name: 'Maria Garcia', email: 'maria@example.com', phone: '555-0102', fargoRating: 625 },
  { id: '3', name: 'David Chen', email: 'david@example.com', phone: '555-0103', fargoRating: 675 },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-0104', fargoRating: 600 },
  { id: '5', name: 'Mike Wilson', email: 'mike@example.com', phone: '555-0105', fargoRating: 590 },
  { id: '6', name: 'Emma Brown', email: 'emma@example.com', phone: '555-0106', fargoRating: 615 },
  { id: '7', name: 'James Lee', email: 'james@example.com', phone: '555-0107', fargoRating: 640 },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', phone: '555-0108', fargoRating: 585 },
  { id: '9', name: 'Tom Martinez', email: 'tom@example.com', phone: '555-0109', fargoRating: 630 },
  { id: '10', name: 'Amy White', email: 'amy@example.com', phone: '555-0110', fargoRating: 595 },
  { id: '11', name: 'Kevin Taylor', email: 'kevin@example.com', phone: '555-0111', fargoRating: 620 },
  { id: '12', name: 'Rachel Kim', email: 'rachel@example.com', phone: '555-0112', fargoRating: 605 },
  { id: '13', name: 'Carlos Rodriguez', email: 'carlos@example.com', phone: '555-0113', fargoRating: 645 },
  { id: '14', name: 'Sophie Turner', email: 'sophie@example.com', phone: '555-0114', fargoRating: 610 },
  { id: '15', name: 'Alex Thompson', email: 'alex@example.com', phone: '555-0115', fargoRating: 635 },
  { id: '16', name: 'Diana Park', email: 'diana@example.com', phone: '555-0116', fargoRating: 655 }
];

export default function TournamentSetup() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<TournamentSettings>({ ...defaultTournamentSettings });
  const [errors, setErrors] = useState<TournamentErrors>({});
  const [players, setPlayers] = useState<Player[]>([]);
  const [showPlayerRegistration, setShowPlayerRegistration] = useState(false);
  
  // Add tournament store hooks
  const setTournamentSettings = useTournamentStore(state => state.setSettings);
  const setTournamentPlayers = useTournamentStore(state => state.setPlayers);
  const generateBracket = useTournamentStore(state => state.generateBracket);

  const validateForm = (): boolean => {
    const newErrors: TournamentErrors = {};

    if (!settings.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (settings.minPlayers < 4) {
      newErrors.minPlayers = 'Minimum 4 players required';
    }

    if (settings.maxPlayers > 128) {
      newErrors.maxPlayers = 'Maximum 128 players allowed';
    }

    if (settings.minPlayers > settings.maxPlayers) {
      newErrors.minPlayers = 'Min players cannot exceed max players';
    }

    if (settings.entryFee < 0) {
      newErrors.entryFee = 'Entry fee cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create separate handlers for different input types
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (players.length < settings.minPlayers) {
        setErrors(prev => ({
          ...prev,
          minPlayers: `Need at least ${settings.minPlayers} players to start`
        }));
        return;
      }
      
      // Save tournament settings and players to the store
      setTournamentSettings(settings);
      setTournamentPlayers(players);
      
      // Generate the tournament bracket
      generateBracket();
      
      // Navigate to the bracket view
      navigate('/bracket');
    }
  };

  const handleExport = () => {
    const exportData = {
      settings,
      players,
      exportDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tournament-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePlayerRegistration = (player: Player) => {
    setPlayers([...players, player]);
  };

  const loadSamplePlayers = () => {
    setPlayers(SAMPLE_PLAYERS);
  };

  return (
    <>
      <Box className="bg-slate-800/90 p-6 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Tournament Setup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            type="datetime-local"
            name="startDate"
            label="Event Start Date & Time"
            variant="outlined"
            value={settings.startDate}
            onChange={handleTextInputChange}
            error={!!errors.startDate}
            helperText={errors.startDate}
            className="bg-slate-700 rounded text-white"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Game Type</InputLabel>
            <Select
              name="gameType"
              value={settings.gameType}
              label="Game Type"
              onChange={handleSelectChange}
            >
              <MenuItem value="8-ball">8-Ball</MenuItem>
              <MenuItem value="9-ball">9-Ball</MenuItem>
              <MenuItem value="10-ball">10-Ball</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Format</InputLabel>
            <Select
              name="format"
              value={settings.format}
              label="Format"
              onChange={handleSelectChange}
            >
              <MenuItem value="single">Single Elimination</MenuItem>
              <MenuItem value="double">Double Elimination</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
              name="division"
              value={settings.division}
              label="Division"
              onChange={handleSelectChange}
            >
              <MenuItem value="amateur">Amateur</MenuItem>
              <MenuItem value="pro">Professional</MenuItem>
            </Select>
          </FormControl>

          <Box className="flex gap-4">
            <TextField
              type="number"
              name="minPlayers"
              label="Min Players"
              variant="outlined"
              value={settings.minPlayers}
              onChange={handleTextInputChange}
              error={!!errors.minPlayers}
              helperText={errors.minPlayers}
              className="flex-1"
            />
            <TextField
              type="number"
              name="maxPlayers"
              label="Max Players"
              variant="outlined"
              value={settings.maxPlayers}
              onChange={handleTextInputChange}
              error={!!errors.maxPlayers}
              helperText={errors.maxPlayers}
              className="flex-1"
            />
          </Box>

          <TextField
            type="number"
            name="entryFee"
            label="Entry Fee"
            variant="outlined"
            value={settings.entryFee}
            onChange={handleTextInputChange}
            error={!!errors.entryFee}
            helperText={errors.entryFee}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Handicap System</InputLabel>
            <Select
              name="handicapSystem"
              value={settings.handicapSystem}
              label="Handicap System"
              onChange={handleSelectChange}
            >
              <MenuItem value="fargo">FargoRate</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>

          <Box className="flex gap-4">
            <FormControl fullWidth>
              <InputLabel>Player Auction</InputLabel>
              <Select
                name="playerAuction"
                value={settings.playerAuction}
                label="Player Auction"
                onChange={handleSelectChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Break & Run</InputLabel>
              <Select
                name="breakAndRun"
                value={settings.breakAndRun}
                label="Break & Run"
                onChange={handleSelectChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className="space-y-4">
            <Typography variant="h6" className="text-white">
              Registered Players ({players.length})
            </Typography>
            <Box className="flex gap-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowPlayerRegistration(true)}
                className="flex-1"
              >
                Add Player
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={loadSamplePlayers}
                className="flex-1"
              >
                Load Sample Players
              </Button>
            </Box>
            {players.length > 0 && (
              <Box className="bg-slate-700 p-4 rounded max-h-48 overflow-y-auto">
                {players.map(player => (
                  <Typography key={player.id} className="text-white mb-1">
                    {player.name} - Fargo: {player.fargoRating}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          <Box className="flex gap-4">
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              fullWidth
              className="bg-green-600 hover:bg-green-700"
            >
              Draw Bracket
            </Button>
            <Button 
              type="button"
              variant="outlined" 
              color="primary" 
              onClick={handleExport}
              fullWidth
              className="border-green-600 text-green-600 hover:border-green-700"
            >
              Export Settings
            </Button>
          </Box>
        </form>
      </Box>

      <PlayerRegistration
        open={showPlayerRegistration}
        onClose={() => setShowPlayerRegistration(false)}
        onSubmit={handlePlayerRegistration}
      />
    </>
  );
}