import React from 'react';
import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { Player } from '@/types/tournament';
import { Trophy, Star, Phone, Mail } from 'lucide-react';

interface PlayerProfileProps {
  player: Player;
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
  return (
    <Box className="max-w-2xl mx-auto p-4">
      <Paper className="bg-slate-800/90 p-6 rounded-lg shadow-xl">
        <Box className="flex items-center gap-6 mb-8">
          <Avatar 
            className="w-24 h-24 text-4xl bg-green-600"
          >
            {player.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" className="text-white font-bold mb-2">
              {player.name}
            </Typography>
            <Box className="flex gap-2">
              {player.fargoRating && (
                <Chip
                  icon={<Star className="w-4 h-4" />}
                  label={`Fargo: ${player.fargoRating}`}
                  className="bg-green-600 text-white"
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box className="grid md:grid-cols-2 gap-6">
          <Box>
            <Typography variant="h6" className="text-white font-bold mb-4">
              Contact Information
            </Typography>
            <Box className="space-y-3">
              <Box className="flex items-center gap-2 text-gray-300">
                <Mail className="w-5 h-5" />
                <Typography>{player.email}</Typography>
              </Box>
              <Box className="flex items-center gap-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <Typography>{player.phone}</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" className="text-white font-bold mb-4">
              Tournament Check-in QR Code
            </Typography>
            <Box className="bg-white p-4 rounded-lg inline-block">
              <QRCodeSVG 
                value={player.email}
                size={180}
                level="H"
                includeMargin
              />
            </Box>
            <Typography className="text-gray-400 mt-2 text-sm">
              Scan this code at the tournament desk to check in
            </Typography>
          </Box>
        </Box>

        <Box className="mt-8">
          <Typography variant="h6" className="text-white font-bold mb-4">
            Tournament History
          </Typography>
          <Box className="space-y-3">
            <Box className="flex items-center gap-3 text-gray-300">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <Typography>1st Place - Winter Classic 2024</Typography>
            </Box>
            <Box className="flex items-center gap-3 text-gray-300">
              <Trophy className="w-5 h-5 text-gray-400" />
              <Typography>2nd Place - Fall Championship 2023</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}