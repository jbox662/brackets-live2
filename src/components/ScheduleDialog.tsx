import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Match, MatchSchedule, ScheduleErrors } from '../types/tournament';
import { format } from 'date-fns';

interface ScheduleDialogProps {
  open: boolean;
  match: Match | null;
  onClose: () => void;
  onSubmit: (schedule: MatchSchedule) => void;
}

export function ScheduleDialog({ open, match, onClose, onSubmit }: ScheduleDialogProps) {
  const [schedule, setSchedule] = useState<Partial<MatchSchedule>>({
    startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    table: 1,
    streamingTable: false
  });
  const [errors, setErrors] = useState<ScheduleErrors>({});

  const validateForm = () => {
    const newErrors: ScheduleErrors = {};
    let hasError = false;

    if (!schedule.startTime) {
      newErrors.startTime = 'Start time is required';
      hasError = true;
    }

    if (!schedule.table || schedule.table < 1) {
      newErrors.table = 'Valid table number is required';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (validateForm() && match) {
      onSubmit({
        matchId: match.id,
        startTime: schedule.startTime!,
        table: schedule.table!,
        referee: schedule.referee,
        streamingTable: schedule.streamingTable || false
      });
      onClose();
      setSchedule({});
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" className="font-bold">
          Schedule Match
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box className="space-y-4 mt-2">
          <Typography className="font-bold mb-2">
            {match?.player1?.name} vs {match?.player2?.name}
          </Typography>

          <TextField
            fullWidth
            type="datetime-local"
            label="Start Time"
            value={schedule.startTime || ''}
            onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
            error={!!errors.startTime}
            helperText={errors.startTime}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            type="number"
            label="Table Number"
            value={schedule.table || ''}
            onChange={(e) => setSchedule({ ...schedule, table: parseInt(e.target.value) })}
            error={!!errors.table}
            helperText={errors.table}
          />

          <TextField
            fullWidth
            label="Referee (Optional)"
            value={schedule.referee || ''}
            onChange={(e) => setSchedule({ ...schedule, referee: e.target.value })}
            error={!!errors.referee}
            helperText={errors.referee}
          />

          <FormControlLabel
            control={
              <Switch
                checked={schedule.streamingTable || false}
                onChange={(e) => setSchedule({ ...schedule, streamingTable: e.target.checked })}
                color="primary"
              />
            }
            label="Streaming Table"
          />
        </Box>
      </DialogContent>

      <DialogActions className="p-4">
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Schedule Match
        </Button>
      </DialogActions>
    </Dialog>
  );
}