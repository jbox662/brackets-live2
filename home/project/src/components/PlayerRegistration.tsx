import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material';
import { Player } from '@/types/tournament';

interface PlayerRegistrationProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (player: Player) => void;
}

export default function PlayerRegistration({ open, onClose, onSubmit }: PlayerRegistrationProps) {
  const [player, setPlayer] = useState<Partial<Player>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!player.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!player.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(player.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!player.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (player.fargoRating && (player.fargoRating < 300 || player.fargoRating > 800)) {
      newErrors.fargoRating = 'Fargo rating must be between 300 and 800';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        id: Date.now().toString(),
        name: player.name!,
        email: player.email!,
        phone: player.phone!,
        fargoRating: player.fargoRating
      });
      onClose();
      setPlayer({});
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" className="font-bold">
          Player Registration
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className="space-y-4 mt-2">
          <TextField
            fullWidth
            label="Name"
            value={player.name || ''}
            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={player.email || ''}
            onChange={(e) => setPlayer({ ...player, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Phone"
            value={player.phone || ''}
            onChange={(e) => setPlayer({ ...player, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label="Fargo Rating (optional)"
            type="number"
            value={player.fargoRating || ''}
            onChange={(e) => setPlayer({ ...player, fargoRating: Number(e.target.value) })}
            error={!!errors.fargoRating}
            helperText={errors.fargoRating}
          />
        </Box>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}