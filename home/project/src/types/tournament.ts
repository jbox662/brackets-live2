import { Match } from '@/store/tournamentStore';

export interface TournamentSettings {
  startDate: string;
  gameType: '8-ball' | '9-ball' | '10-ball';
  format: 'single' | 'double';
  division: 'amateur' | 'pro';
  minPlayers: number;
  maxPlayers: number;
  entryFee: number;
  handicapSystem: 'fargo' | 'none';
  playerAuction: 'yes' | 'no';
  breakAndRun: 'yes' | 'no';
}

export interface TournamentErrors {
  startDate?: string;
  minPlayers?: string;
  maxPlayers?: string;
  entryFee?: string;
}

export interface Player {
  id: string;
  name: string;
  email: string;
  phone: string;
  fargoRating?: number;
}

export interface MatchSchedule {
  matchId: string;
  startTime: string;
  table: number;
  referee?: string;
  streamingTable: boolean;
}

export interface ScheduleErrors {
  startTime?: string;
  table?: string;
  referee?: string;
}

export const defaultTournamentSettings: TournamentSettings = {
  startDate: '',
  gameType: '8-ball',
  format: 'single',
  division: 'amateur',
  minPlayers: 8,
  maxPlayers: 32,
  entryFee: 20,
  handicapSystem: 'fargo',
  playerAuction: 'no',
  breakAndRun: 'no'
};