import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { QrCode } from 'lucide-react';
import { useTournamentStore } from '@/store/tournamentStore';

const QRScanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const players = useTournamentStore(state => state.players);

  const handleScan = async (data: string | null) => {
    if (data) {
      const player = players.find(p => p.email === data);
      if (player) {
        setMessage(`Successfully checked in ${player.name}`);
        // Here you would typically update the player's check-in status in your store
      } else {
        setMessage('Player not found');
      }
      setScanning(false);
      console.log('QR Code scanned:', data);
    }
  };

  const handleError = (err: Error) => {
    console.error('QR Scanner error:', err);
    setMessage('Error scanning QR code');
    setScanning(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<QrCode />}
        onClick={() => setOpen(true)}
        className="bg-green-600 hover:bg-green-700"
      >
        Scan QR Code
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" className="font-bold">
            Scan Player QR Code
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box className="space-y-4">
            {scanning ? (
              <Box className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center">
                <Typography className="text-white">
                  Place QR code in front of camera
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                fullWidth
                onClick={() => setScanning(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Start Scanning
              </Button>
            )}
            {message && (
              <Typography className="text-center mt-4">
                {message}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QRScanner;