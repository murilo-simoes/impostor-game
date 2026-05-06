import { v4 as uuidv4 } from "uuid";
import {
  GameMode,
  GameSettings,
  GameState,
  Player,
  PlayerPrivateInfo,
  Room,
  VoteResults,
} from "@/types/game";
import {
  SECRET_WORDS,
  LOCATIONS_WITH_ROLES,
  QUESTIONS,
  TWO_FACTIONS_PAIRS,
  CATEGORIES_WITH_ITEMS,
  MOVIES_SERIES,
  getHintForMode,
} from "./gameData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function createRoom(hostId: string, hostName: string): Room {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const host: Player = {
    id: hostId,
    name: hostName,
    isHost: true,
    isReady: true,
    isEliminated: false,
  };

  return {
    id: uuidv4(),
    code,
    hostId,
    state: {
      phase: "lobby",
      settings: { mode: "secret-word", impostorCount: 1, rounds: 2 },
      players: [host],
      turnOrder: [],
      currentTurn: 0,
      roundNumber: 0,
      votes: {},
      eliminated: [],
      impostors: [],
    },
    privateInfo: {},
  };
}

export function addPlayer(room: Room, playerId: string, playerName: string): void {
  const player: Player = {
    id: playerId,
    name: playerName,
    isHost: false,
    isReady: false,
    isEliminated: false,
  };
  room.state.players.push(player);
}

export function removePlayer(room: Room, playerId: string): void {
  room.state.players = room.state.players.filter((p) => p.id !== playerId);
  if (room.hostId === playerId && room.state.players.length > 0) {
    room.state.players[0].isHost = true;
    room.hostId = room.state.players[0].id;
  }
}

function assignImpostors(playerIds: string[], count: number): string[] {
  return shuffle(playerIds).slice(0, count);
}

interface GeneratedInfo {
  privateInfo: Record<string, PlayerPrivateInfo>;
  secret: unknown;
}

function generatePrivateInfo(
  mode: GameMode,
  playerIds: string[],
  impostorIds: string[],
  settings: GameSettings
): GeneratedInfo {
  const result: Record<string, PlayerPrivateInfo> = {};
  let secret: unknown = null;

  switch (mode) {
    case "secret-word": {
      const word = pickRandom(SECRET_WORDS);
      secret = { word };
      for (const pid of playerIds) {
        const isImpostor = impostorIds.includes(pid);
        result[pid] = {
          role: isImpostor ? "impostor" : "player",
          info: { mode, word: isImpostor ? null : word },
        };
      }
      break;
    }

    case "location-role": {
      const location = pickRandom(Object.keys(LOCATIONS_WITH_ROLES));
      const roles = shuffle(LOCATIONS_WITH_ROLES[location]);
      secret = { location };
      let roleIndex = 0;
      for (const pid of playerIds) {
        const isImpostor = impostorIds.includes(pid);
        result[pid] = {
          role: isImpostor ? "impostor" : "player",
          info: {
            mode,
            location: isImpostor ? null : location,
            roleTitle: isImpostor ? null : (roles[roleIndex++] ?? "Funcionário"),
          },
        };
      }
      break;
    }

    case "question": {
      const question = pickRandom(QUESTIONS);
      secret = { question };
      for (const pid of playerIds) {
        const isImpostor = impostorIds.includes(pid);
        result[pid] = {
          role: isImpostor ? "impostor" : "player",
          info: { mode, question: isImpostor ? null : question },
        };
      }
      break;
    }

    case "two-factions": {
      const pair = pickRandom(TWO_FACTIONS_PAIRS);
      const nonImpostors = playerIds.filter((id) => !impostorIds.includes(id));
      const halfA = Math.ceil(nonImpostors.length / 2);
      const factionA = nonImpostors.slice(0, halfA);
      secret = { words: pair };
      for (const pid of playerIds) {
        const isImpostor = impostorIds.includes(pid);
        if (isImpostor) {
          result[pid] = { role: "impostor", info: { mode, word: null, faction: null } };
        } else {
          const inA = factionA.includes(pid);
          result[pid] = {
            role: "player",
            info: { mode, word: inA ? pair[0] : pair[1], faction: inA ? "A" : "B" },
          };
        }
      }
      break;
    }

    case "category-item": {
      const category = pickRandom(Object.keys(CATEGORIES_WITH_ITEMS));
      const items = shuffle(CATEGORIES_WITH_ITEMS[category]);
      secret = { category };
      let itemIndex = 0;
      for (const pid of playerIds) {
        const isImpostor = impostorIds.includes(pid);
        result[pid] = {
          role: isImpostor ? "impostor" : "player",
          info: {
            mode,
            category,
            item: isImpostor ? null : (items[itemIndex++] ?? items[0]),
          },
        };
      }
      break;
    }

    case "movie-series": {
      const movie = pickRandom(MOVIES_SERIES);
      const diff = settings.difficulty ?? "medium";
      secret = movie;
      for (const pid of playerIds) {
        const isImpostor = impostorIds.includes(pid);
        if (isImpostor) {
          result[pid] = {
            role: "impostor",
            info: {
              mode,
              title: null,
              year: diff === "easy" ? movie.year : null,
              director: null,
              genre: diff !== "hard" ? movie.genre : "",
              cast: null,
              synopsis: null,
            },
          };
        } else {
          result[pid] = {
            role: "player",
            info: {
              mode,
              title: movie.title,
              year: movie.year,
              director: movie.director,
              genre: movie.genre,
              cast: movie.cast,
              synopsis: movie.synopsis,
            },
          };
        }
      }
      break;
    }
  }

  return { privateInfo: result, secret };
}

export function startGame(room: Room, settings: GameSettings): void {
  const activePlayers = room.state.players.filter((p) => !p.isEliminated);
  const playerIds = activePlayers.map((p) => p.id);
  const impostorIds = assignImpostors(playerIds, settings.impostorCount);

  const { privateInfo, secret } = generatePrivateInfo(settings.mode, playerIds, impostorIds, settings);

  const turnOrder = shuffle(playerIds);

  // Only the impostor who speaks first gets the hint
  const firstImpostor = turnOrder.find(id => impostorIds.includes(id));
  if (firstImpostor) {
    privateInfo[firstImpostor].hint = getHintForMode(settings.mode, secret);
  }

  room.state = {
    ...room.state,
    phase: "playing",
    settings,
    turnOrder,
    currentTurn: 0,
    roundNumber: 1,
    votes: {},
    eliminated: [],
    impostors: impostorIds,
  };
  room.privateInfo = privateInfo;
}

export function advanceTurn(room: Room): void {
  const activePlayers = room.state.players.filter((p) => !p.isEliminated);
  const activeIds = new Set(activePlayers.map((p) => p.id));
  const activeTurnOrder = room.state.turnOrder.filter((id) => activeIds.has(id));
  const totalRounds = room.state.settings.rounds ?? 1;

  const next = room.state.currentTurn + 1;
  if (next >= activeTurnOrder.length) {
    if (room.state.roundNumber >= totalRounds) {
      room.state.phase = "voting";
    } else {
      room.state.roundNumber += 1;
      room.state.currentTurn = 0;
    }
  } else {
    room.state.currentTurn = next;
  }
}

export function castVote(room: Room, voterId: string, targetId: string): void {
  room.state.votes[voterId] = targetId;
}

export function resolveVotes(room: Room): VoteResults {
  const votes = room.state.votes;
  const tally: Record<string, number> = {};

  for (const targetId of Object.values(votes)) {
    tally[targetId] = (tally[targetId] ?? 0) + 1;
  }

  let maxVotes = 0;
  let eliminated: string | null = null;

  for (const [pid, count] of Object.entries(tally)) {
    if (count > maxVotes) {
      maxVotes = count;
      eliminated = pid;
    } else if (count === maxVotes) {
      eliminated = null;
    }
  }

  if (eliminated) {
    const player = room.state.players.find((p) => p.id === eliminated);
    if (player) player.isEliminated = true;
    room.state.eliminated.push(eliminated);
  }

  const impostorsCaught = eliminated !== null && room.state.impostors.includes(eliminated);

  room.state.phase = "results";
  room.state.votes = {};

  return {
    votes,
    eliminated,
    impostors: room.state.impostors,
    impostorsCaught,
  };
}

export function resetGame(room: Room): void {
  for (const player of room.state.players) {
    player.isEliminated = false;
    player.vote = undefined;
  }
  room.state = {
    ...room.state,
    phase: "lobby",
    turnOrder: [],
    currentTurn: 0,
    roundNumber: 0,
    votes: {},
    eliminated: [],
    impostors: [],
  };
  room.privateInfo = {};
}
