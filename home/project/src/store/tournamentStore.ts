import { create } from 'zustand';
import { TournamentSettings, Player, MatchSchedule } from '@/types/tournament';

export interface Match {
  id: string;
  round: number;
  player1: Player | null;
  player2: Player | null;
  winner: Player | null;
  loser: Player | null;
  score1: number;
  score2: number;
  completed: boolean;
  schedule?: MatchSchedule;
}

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
  const matches: Match[] = [];
  const numPlayers = players.length;
  const numRounds = Math.ceil(Math.log2(numPlayers));
  const totalMatches = Math.pow(2, numRounds) - 1;
  
  // Generate empty bracket structure
  for (let i = 0; i < totalMatches; i++) {
    matches.push({
      id: `match-${i}`,
      round: Math.floor(Math.log2(i + 1)) + 1,
      player1: null,
      player2: null,
      winner: null,
      loser: null,
      score1: 0,
      score2: 0,
      completed: false
    });
  }

  // Seed first round with players
  const shuffledPlayers = shufflePlayers(players);
  let playerIndex = 0;
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].round === 1) {
      matches[i].player1 = shuffledPlayers[playerIndex++] || null;
      matches[i].player2 = shuffledPlayers[playerIndex++] || null;
      
      // If only one player in match, they automatically advance
      if (matches[i].player1 && !matches[i].player2) {
        matches[i].winner = matches[i].player1;
        matches[i].completed = true;
      }
    }
  }

  return matches;
};

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  settings: null,
  players: [],
  matches: [],
  
  setSettings: (settings) => set({ settings }),
  
  setPlayers: (players) => set({ players }),
  
  generateBracket: () => {
    const { players } = get();
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
        const nextMatchIndex = Math.floor((matches.indexOf(match) - 1) / 2);
        if (nextMatchIndex >= 0) {
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