import { create } from 'zustand';
import { TournamentSettings, Player, MatchSchedule, Match } from '../types/tournament';

interface TournamentStore {
  settings: TournamentSettings | null;
  players: Player[];
  matches: Match[];
  setSettings: (settings: TournamentSettings) => void;
  setPlayers: (players: Player[]) => void;
  generateBracket: () => void;
  updateMatch: (matchId: string, score1: number, score2: number) => void;
  scheduleMatch: (matchId: string, schedule: MatchSchedule) => void;
  resetTournament: () => void;
}

const shufflePlayers = (players: Player[]): Player[] => {
  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateMatches = (players: Player[]): Match[] => {
  console.log('Generating matches for players:', players);
  const matches: Match[] = [];
  const numPlayers = players.length;
  const numRounds = Math.ceil(Math.log2(numPlayers));
  const totalMatches = Math.pow(2, numRounds) - 1;
  const firstRoundMatches = Math.ceil(numPlayers / 2);
  
  console.log('Tournament structure:', {
    numPlayers,
    numRounds,
    totalMatches,
    firstRoundMatches
  });

  // Generate all matches structure
  for (let round = 1; round <= numRounds; round++) {
    const matchesInRound = Math.pow(2, numRounds - round);
    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        id: `match-${matches.length}`,
        round: round,
        player1: null,
        player2: null,
        winner: null,
        loser: null,
        score1: 0,
        score2: 0,
        completed: false
      });
    }
  }

  // Seed first round with players
  const shuffledPlayers = shufflePlayers(players);
  let playerIndex = 0;
  
  // Fill first round matches
  for (let i = 0; i < matches.length && matches[i].round === 1; i++) {
    matches[i].player1 = shuffledPlayers[playerIndex++] || null;
    matches[i].player2 = shuffledPlayers[playerIndex++] || null;
    
    // If only one player in match, they automatically advance
    if (matches[i].player1 && !matches[i].player2) {
      matches[i].winner = matches[i].player1;
      matches[i].completed = true;
      
      // Advance to next round
      const nextRoundIndex = Math.floor(i / 2) + firstRoundMatches;
      if (nextRoundIndex < matches.length) {
        const isLeft = i % 2 === 0;
        if (isLeft) {
          matches[nextRoundIndex].player1 = matches[i].player1;
        } else {
          matches[nextRoundIndex].player2 = matches[i].player1;
        }
      }
    }
  }

  console.log('Generated matches:', matches);
  return matches;
};

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  settings: null,
  players: [],
  matches: [],
  
  setSettings: (settings) => {
    console.log('Setting tournament settings:', settings);
    set({ settings });
  },
  
  setPlayers: (players) => {
    console.log('Setting players:', players);
    set({ players });
  },
  
  generateBracket: () => {
    const { players } = get();
    console.log('Generating bracket with players:', players);
    if (players.length < 4) {
      console.error('Not enough players to generate bracket');
      return;
    }
    const matches = generateMatches(players);
    set({ matches });
  },
  
  updateMatch: (matchId, score1, score2) => {
    const { matches } = get();
    const updatedMatches = matches.map(match => {
      if (match.id === matchId) {
        const winner = score1 > score2 ? match.player1 : match.player2;
        const loser = score1 > score2 ? match.player2 : match.player1;
        
        // Find next match
        const currentRoundMatches = matches.filter(m => m.round === match.round).length;
        const nextMatchIndex = currentRoundMatches + Math.floor(matches.indexOf(match) / 2);
        
        if (nextMatchIndex < matches.length) {
          const isLeft = matches.indexOf(match) % 2 === 0;
          if (isLeft) {
            matches[nextMatchIndex].player1 = winner;
          } else {
            matches[nextMatchIndex].player2 = winner;
          }
        }
        
        return {
          ...match,
          score1,
          score2,
          winner,
          loser,
          completed: true
        };
      }
      return match;
    });
    
    set({ matches: updatedMatches });
  },

  scheduleMatch: (matchId, schedule) => {
    const { matches } = get();
    const updatedMatches = matches.map(match => 
      match.id === matchId ? { ...match, schedule } : match
    );
    set({ matches: updatedMatches });
  },
  
  resetTournament: () => set({
    settings: null,
    players: [],
    matches: []
  })
}));