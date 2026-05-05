"use client";

import type { PublicRoom, PlayerPrivateInfo } from "@/types/game";
import { PlayerList } from "../PlayerList";
import { PrivateInfoCard } from "../PrivateInfoCard";

interface Props {
  room: PublicRoom;
  myId: string;
  privateInfo: PlayerPrivateInfo | null;
  castVotes: Record<string, string>;
  myVote: string | null;
  onVote: (targetId: string) => void;
}

export function VotingView({ room, myId, privateInfo, castVotes, myVote, onVote }: Props) {
  const { state } = room;
  const activePlayers = state.players.filter((p) => !p.isEliminated);
  const totalVoters = activePlayers.length;
  // Usa castVotes (atualizado via evento em tempo real) em vez de state.voteCount
  // que só é atualizado pelo servidor quando todos já votaram
  const votesCast = Object.keys(castVotes).length;

  return (
    <div className="space-y-4 fade-in">
      <div className="card p-5 text-center">
        <p className="text-3xl mb-2">🗳️</p>
        <p className="text-xl font-bold">Hora de votar!</p>
        <p className="text-sm opacity-60 mt-1">Quem você acha que é o impostor?</p>
        <div className="mt-3 flex items-center justify-center gap-1">
          {Array.from({ length: totalVoters }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                background: i < votesCast ? "var(--accent)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
        <p className="text-xs opacity-40 mt-2">{votesCast}/{totalVoters} votos</p>
      </div>

      <div className="card p-4">
        <p className="font-semibold text-sm mb-3">Votar em:</p>
        <PlayerList
          players={activePlayers}
          myId={myId}
          hostId={room.hostId}
          phase="voting"
          castVotes={castVotes}
          onVote={myVote ? undefined : onVote}
          myVote={myVote}
        />
      </div>

      {myVote && (
        <div
          className="card p-3 text-center text-sm"
          style={{ border: "1px solid var(--accent)", background: "rgba(124,58,237,0.1)" }}
        >
          Voto registrado! Aguardando os demais...
        </div>
      )}

      {privateInfo && (
        <div>
          <p className="text-sm opacity-50 mb-2">Suas informações</p>
          <PrivateInfoCard privateInfo={privateInfo} />
        </div>
      )}
    </div>
  );
}
