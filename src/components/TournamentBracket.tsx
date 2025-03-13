import React from 'react';
import { Box, Paper, Typography, Slider, Button } from '@mui/material';
import { Trophy, Edit, Calendar } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { ScoreDialog } from './ScoreDialog';
import { ScheduleDialog } from './ScheduleDialog';
import { Match, MatchSchedule } from '../types/tournament';
import { format } from 'date-fns';

export default function TournamentBracket() {
  const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);
  const matches = useTournamentStore(state => state.matches);
  const players = useTournamentStore(state => state.players);
  const settings = useTournamentStore(state => state.settings);
  const updateMatch = useTournamentStore(state => state.updateMatch);
  const scheduleMatch = useTournamentStore(state => state.scheduleMatch);

  // Debug logging
  React.useEffect(() => {
    console.log('Current matches:', matches);
    console.log('Current players:', players);
    console.log('Current settings:', settings);
  }, [matches, players, settings]);

  const maxRound = matches.length > 0 ? Math.max(...matches.map(match => match.round)) : 0;

  // If no matches, show a message
  if (matches.length === 0) {
    return (
      <Box className="p-6 bg-slate-800/90 rounded-lg">
        <Typography variant="h4" className="text-white font-bold mb-4">
          Tournament Bracket
        </Typography>
        <Typography className="text-white">
          No matches available. Please make sure you have:
          <ul className="list-disc ml-6 mt-2">
            <li>Added at least 4 players</li>
            <li>Set up the tournament settings</li>
            <li>Generated the bracket from the setup page</li>
          </ul>
        </Typography>
      </Box>
    );
  }

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
      <Box className="min-w-[1200px] p-6 bg-slate-800/90 rounded-lg">
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

        <Box className="relative flex justify-between" style={{ gap: '80px' }}>
          {Array.from({ length: maxRound }, (_, roundIndex) => {
            const roundMatches = matches.filter(match => match.round === roundIndex + 1);
            const spacing = Math.pow(2, roundIndex + 1);
            
            return (
              <Box 
                key={roundIndex} 
                className="flex-1 relative"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: `${spacing * 16}px`,
                  paddingTop: `${spacing * 8}px`
                }}
              >
                <Typography className="text-yellow-500 text-center mb-4 absolute top-0 left-0 right-0">
                  {roundIndex === maxRound - 1 ? (
                    <Box className="flex items-center justify-center gap-2">
                      Championship
                      <Trophy className="text-yellow-500" />
                    </Box>
                  ) : (
                    `Round ${roundIndex + 1}`
                  )}
                </Typography>

                {roundMatches.map((match, matchIndex) => (
                  <Box key={match.id} className="relative">
                    {/* Connector lines */}
                    {roundIndex < maxRound - 1 && (
                      <>
                        <div className="absolute right-0 top-1/2 w-[40px] h-[2px] bg-gray-600 -translate-y-1/2 translate-x-full" />
                        {matchIndex % 2 === 0 && (
                          <div className="absolute right-0 top-1/2 w-[2px] h-[100px] bg-gray-600 translate-x-[40px]" />
                        )}
                      </>
                    )}
                    
                    <Paper className="relative bg-gradient-to-r from-green-800 to-purple-900 p-3 w-[240px]">
                      {!match.completed && match.player1 && match.player2 && (
                        <Box className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
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
                  </Box>
                ))}
              </Box>
            );
          })}
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