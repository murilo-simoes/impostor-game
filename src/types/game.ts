export type GameMode =
  | "secret-word"
  | "location-role"
  | "question"
  | "two-factions"
  | "category-item"
  | "movie-series";

export type Difficulty = "easy" | "medium" | "hard";

export type PlayerRole = "player" | "impostor";

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  vote?: string;
  isEliminated: boolean;
}

export interface PlayerPrivateInfo {
  role: PlayerRole;
  info: PlayerInfo;
  hint?: string; // hint for impostor who goes first
}

export interface SecretWordInfo {
  mode: "secret-word";
  word: string | null; // null for impostor
}

export interface LocationRoleInfo {
  mode: "location-role";
  location: string | null;
  roleTitle: string | null;
}

export interface QuestionInfo {
  mode: "question";
  question: string | null;
}

export interface TwoFactionsInfo {
  mode: "two-factions";
  word: string | null; // null for impostor
  faction: "A" | "B" | null;
}

export interface CategoryItemInfo {
  mode: "category-item";
  category: string;
  item: string | null; // null for impostor
}

export interface MovieSeriesInfo {
  mode: "movie-series";
  title: string | null;
  year: number | null;
  director: string | null;
  genre: string;
  cast: string | null;
  synopsis: string | null;
}

export type PlayerInfo =
  | SecretWordInfo
  | LocationRoleInfo
  | QuestionInfo
  | TwoFactionsInfo
  | CategoryItemInfo
  | MovieSeriesInfo;

export interface GameSettings {
  mode: GameMode;
  impostorCount: 1 | 2;
  rounds: number; // 1-5, how many full cycles everyone speaks
  difficulty?: Difficulty;
}

export interface GameState {
  phase: "lobby" | "playing" | "voting" | "results";
  settings: GameSettings;
  players: Player[];
  turnOrder: string[]; // player ids in speaking order
  currentTurn: number;
  roundNumber: number;
  votes: Record<string, string>; // voterId -> targetId
  eliminated: string[];
  impostors: string[]; // revealed at results
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  state: GameState;
  privateInfo: Record<string, PlayerPrivateInfo>; // playerId -> info
}

// Socket events
export interface ServerToClientEvents {
  "room:updated": (room: PublicRoom) => void;
  "game:private-info": (info: PlayerPrivateInfo) => void;
  "game:hint": (hint: string) => void;
  error: (message: string) => void;
  "player:joined": (player: Player) => void;
  "player:left": (playerId: string) => void;
  "vote:cast": (voterId: string, targetId: string) => void;
  "vote:results": (results: VoteResults) => void;
}

export interface ClientToServerEvents {
  "room:create": (playerName: string, callback: (code: string, playerId: string) => void) => void;
  "room:join": (code: string, playerName: string, callback: (success: boolean, error?: string, playerId?: string) => void) => void;
  "room:leave": () => void;
  "game:start": (settings: GameSettings) => void;
  "game:next-turn": () => void;
  "vote:cast": (targetId: string) => void;
  "game:restart": () => void;
}

export interface PublicRoom {
  id: string;
  code: string;
  hostId: string;
  state: Omit<GameState, "votes"> & { voteCount: number };
}

export interface VoteResults {
  votes: Record<string, string>;
  eliminated: string | null;
  impostors: string[];
  impostorsCaught: boolean;
}
