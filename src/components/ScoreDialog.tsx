import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { Match } from '../types/tournament';

interface ScoreDialogProps {
  open: boolean;
  match: Match | null;
  onClose: () => void;
  onSubmit: (score1: number, score2: number) => void;
}

export function ScoreDialog({ open, match, onClose, onSubmit }: ScoreDialogProps) {
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [errors, setErrors] = useState({ score1: '', score2: '' });

  const handleSubmit = () => {
    const newErrors = { score1: '', score2: '' };
    let hasError = false;

    if (!score1.trim()) {
      newErrors.score1 = 'Score is required';
      hasError = true;
    }
    if (!score2.trim()) {
      newErrors.score2 = 'Score is required';
      hasError = true;
    }

    const num1 = parseInt(score1);
    const num2 = parseInt(score2);

    if (isNaN(num1) || num1 < 0) {
      newErrors.score1 = 'Invalid score';
      hasError = true;
    }
    if (isNaN(num2) || num2 < 0) {
      newErrors.score2 = 'Invalid score';
      hasError = true;
    }

    if (num1 === num2) {
      newErrors.score1 = 'Scores cannot be equal';
      newErrors.score2 = 'Scores cannot be equal';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      onSubmit(num1, num2);
      setScore1('');
      setScore2('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" className="font-bold">
          Update Match Score
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box className="space-y-4 mt-2">
          <Box className="space-y-2">
            <Typography className="font-bold">
              {match?.player1?.name}
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Score"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              error={!!errors.score1}
              helperText={errors.score1}
            />
          </Box>

          <Box className="space-y-2">
            <Typography className="font-bold">
              {match?.player2?.name}
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Score"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              error={!!errors.score2}
              helperText={errors.score2}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions className="p-4">
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update Score
        </Button>
      </DialogActions>
    </Dialog>
  );
}