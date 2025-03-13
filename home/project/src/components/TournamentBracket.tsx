import React from 'react';
import { Box, Paper, Typography, Slider, Button } from '@mui/material';
import { Trophy, Edit, Calendar } from 'lucide-react';
import { useTournamentStore, Match } from '@/store/tournamentStore';
import { ScoreDialog } from './ScoreDialog';
import { ScheduleDialog } from './ScheduleDialog';
import { MatchSchedule } from '@/types/tournament';
import { format } from 'date-fns';

export default function TournamentBracket() {
  const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);
  const matches = useTournamentStore(state => state.matches);
  const updateMatch = useTournamentStore(state => state.updateMatch);
  const scheduleMatch = useTournamentStore(state => state.scheduleMatch);
  const maxRound = Math.max(...matches.map(match => match.round));

  const handleUpdateScore = (score1: number, score2: number) => {
    if (selectedMatch) {
      updateMatch(selectedMatch.id, score1, score2);
      setSelectedMatch(null);
    }
  };

  const handleScheduleMatch = (schedule: MatchSchedule) => {
    if (selectedMatch) {
      scheduleMatch(selectedMatch.id, schedule);
      setScheduleDialogOpen(false);
      setSelectedMatch(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Box className="min-w-[1024px] p-6 bg-slate-800/90 rounded-lg">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="text-white font-bold">
            Tournament Bracket
          </Typography>
          <Box className="flex items-center gap-4">
            <Typography className="text-white">Zoom</Typography>
            <Slider
              defaultValue={100}
              min={50}
              max={150}
              valueLabelDisplay="auto"
              className="w-32"
            />
          </Box>
        </Box>

        <Box className="flex justify-between gap-8">
          {Array.from({ length: maxRound }, (_, i) => (
            <Box key={i} className="flex-1">
              <Typography className="text-gold text-center mb-4">
                {i === maxRound - 1 ? (
                  <Box className="flex items-center justify-center gap-2">
                    Championship
                    <Trophy className="text-yellow-500" />
                  </Box>
                ) : (
                  `Round ${i + 1}`
                )}
              </Typography>

              <Box className="space-y-4">
                {matches
                  .filter(match => match.round === i + 1)
                  .map(match => (
                    <Paper
                      key={match.id}
                      className="p-3 bg-gradient-to-r from-green-800 to-purple-900 relative"
                    >
                      {!match.completed && match.player1 && match.player2 && (
                        <Box className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                          <Button
                            onClick={() => {
                              setSelectedMatch(match);
                              setScheduleDialogOpen(false);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedMatch(match);
                              setScheduleDialogOpen(true);
                            }}
                          >
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </Box>
                      )}
                      
                      <Box className="flex justify-between items-center mb-2">
                        <Typography className={`text-white font-bold ${match.winner === match.player1 ? 'text-green-400' : ''}`}>
                          {match.player1?.name || 'TBD'}
                        </Typography>
                        <Typography className="font-bold text-white">
                          {match.completed ? match.score1 : '-'}
                        </Typography>
                      </Box>
                      
                      <Box className="flex justify-between items-center">
                        <Typography className={`text-white font-bold ${match.winner === match.player2 ? 'text-green-400' : ''}`}>
                          {match.player2?.name || 'TBD'}
                        </Typography>
                        <Typography className="font-bold text-white">
                          {match.completed ? match.score2 : '-'}
                        </Typography>
                      </Box>

                      {match.schedule && (
                        <Box className="mt-2 pt-2 border-t border-white/20">
                          <Typography className="text-sm text-white/70">
                            {format(new Date(match.schedule.startTime), 'MMM d, h:mm a')} - 
                            Table {match.schedule.table}
                            {match.schedule.referee && ` - Ref: ${match.schedule.referee}`}
                            {match.schedule.streamingTable && ' - Streaming'}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <ScoreDialog
        open={!!selectedMatch && !scheduleDialogOpen}
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onSubmit={handleUpdateScore}
      />

      <ScheduleDialog
        open={!!selectedMatch && scheduleDialogOpen}
        match={selectedMatch}
        onClose={() => {
          setSelectedMatch(null);
          setScheduleDialogOpen(false);
        }}
        onSubmit={handleScheduleMatch}
      />
    </div>
  );
}