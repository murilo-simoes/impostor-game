"use client";

import type { Player } from "@/types/game";

interface Props {
  players: Player[];
  myId: string | null;
  hostId: string;
  phase?: string;
  castVotes?: Record<string, string>;
  onVote?: (targetId: string) => void;
  myVote?: string | null;
  impostors?: string[];
}

export function PlayerList({ players, myId, hostId, phase, castVotes, onVote, myVote, impostors }: Props) {
  return (
    <div className="space-y-2">
      {players.map((player) => {
        const isMe = player.id === myId;
        const isHost = player.id === hostId;
        const voted = castVotes?.[player.id];
        const hasVoted = voted !== undefined;
        const isImpostor = impostors?.includes(player.id);

        return (
          <div
            key={player.id}
            className={`card p-3 flex items-center justify-between transition-all ${
              player.isEliminated ? "opacity-40" : ""
            } ${isMe ? "border-purple-500" : ""}`}
            style={isMe ? { borderColor: "var(--accent)", borderWidth: "1px" } : {}}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: isMe ? "var(--accent)" : "rgba(255,255,255,0.1)" }}
              >
                {player.name[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="font-medium text-sm truncate">{player.name}</span>
                  {isMe && <span className="text-xs opacity-50">(você)</span>}
                  {isHost && (
                    <span
                      className="badge text-xs"
                      style={{ background: "rgba(245,158,11,0.2)", color: "var(--warning)" }}
                    >
                      host
                    </span>
                  )}
                  {player.isEliminated && (
                    <span
                      className="badge text-xs"
                      style={{ background: "rgba(239,68,68,0.2)", color: "var(--danger)" }}
                    >
                      eliminado
                    </span>
                  )}
                  {isImpostor !== undefined && (
                    <span
                      className="badge text-xs"
                      style={{
                        background: isImpostor ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)",
                        color: isImpostor ? "var(--danger)" : "var(--success)",
                      }}
                    >
                      {isImpostor ? "impostor" : "inocente"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {phase === "voting" && hasVoted && (
                <span className="text-xs opacity-50">votou</span>
              )}

              {phase === "voting" && onVote && !isMe && !player.isEliminated && (
                <button
                  onClick={() => onVote(player.id)}
                  disabled={!!myVote}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                  style={{
                    background: myVote === player.id ? "var(--danger)" : "rgba(239,68,68,0.15)",
                    color: "var(--danger)",
                    border: `1px solid ${myVote === player.id ? "var(--danger)" : "transparent"}`,
                    cursor: myVote ? "default" : "pointer",
                    opacity: myVote && myVote !== player.id ? 0.4 : 1,
                  }}
                >
                  {myVote === player.id ? "Votado" : "Votar"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
