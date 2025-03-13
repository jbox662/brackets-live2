import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography } from '@mui/material';
import { TournamentSettings, defaultTournamentSettings, TournamentErrors, Player } from '@/types/tournament';
import PlayerRegistration from './PlayerRegistration';
import { format } from 'date-fns';

export default function TournamentSetup() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<TournamentSettings>(defaultTournamentSettings);
  const [errors, setErrors] = useState<TournamentErrors>({});
  const [players, setPlayers] = useState<Player[]>([]);
  const [showPlayerRegistration, setShowPlayerRegistration] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Tournament Settings:', settings);
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
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => setShowPlayerRegistration(true)}
              className="mb-4"
            >
              Add Player
            </Button>
            {players.length > 0 && (
              <Box className="bg-slate-700 p-4 rounded">
                {players.map(player => (
                  <Typography key={player.id} className="text-white">
                    {player.name} - {player.email}
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