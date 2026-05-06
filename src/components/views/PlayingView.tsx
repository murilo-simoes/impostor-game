"use client";

import type { PublicRoom, PlayerPrivateInfo } from "@/types/game";
import { PrivateInfoCard } from "../PrivateInfoCard";
import { modeLabels, ModeIcon } from "../ModeIcon";

interface Props {
  room: PublicRoom;
  myId: string;
  privateInfo: PlayerPrivateInfo | null;
  onNextTurn: () => void;
}

export function PlayingView({ room, myId, privateInfo, onNextTurn }: Props) {
  const { state } = room;
  const activePlayers = state.players.filter((p) => !p.isEliminated);
  const activeOrder = state.turnOrder.filter((id) => activePlayers.some((p) => p.id === id));
  const currentPlayerId = activeOrder[state.currentTurn];
  const currentPlayer = state.players.find((p) => p.id === currentPlayerId);
  const isMyTurn = currentPlayerId === myId;
  const isHost = room.hostId === myId;

  const totalRounds = state.settings.rounds ?? 1;
  const isMultiRound = totalRounds > 1;

  return (
    <div className="space-y-4 fade-in">
      <div className="card p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm opacity-50 flex items-center gap-1.5">
            <ModeIcon mode={state.settings.mode} />
            {modeLabels[state.settings.mode]}
          </span>
          <div className="flex items-center gap-2">
            {isMultiRound && (
              <span
                className="badge text-xs"
                style={{ background: "rgba(124,58,237,0.2)", color: "var(--accent-light)" }}
              >
                Rodada {state.roundNumber}/{totalRounds}
              </span>
            )}
            <span className="text-sm opacity-50">
              {state.currentTurn + 1}/{activeOrder.length}
            </span>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs opacity-50 mb-1">Vez de falar</p>
          <p className="text-2xl font-bold" style={{ color: isMyTurn ? "var(--accent-light)" : undefined }}>
            {isMyTurn ? "Sua vez!" : currentPlayer?.name ?? "..."}
          </p>
          {isMyTurn && (
            <p className="text-sm opacity-60 mt-1">Dê sua dica para o grupo</p>
          )}
        </div>

        {isMyTurn && (
          <button
            onClick={onNextTurn}
            className="btn-primary w-full mt-4"
          >
            Passei minha vez
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto gap-2 pb-1">
        {activeOrder.map((pid, idx) => {
          const player = state.players.find((p) => p.id === pid);
          if (!player) return null;
          const isCurrent = idx === state.currentTurn;
          const isPast = idx < state.currentTurn;
          return (
            <div
              key={pid}
              className="flex-shrink-0 flex flex-col items-center gap-1"
              style={{ minWidth: 52 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  background: isCurrent
                    ? "var(--accent)"
                    : isPast
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.05)",
                  border: isCurrent ? "2px solid var(--accent-light)" : "2px solid transparent",
                  opacity: isPast ? 0.5 : 1,
                  boxShadow: isCurrent ? "0 0 12px var(--accent-glow)" : "none",
                }}
              >
                {player.name[0].toUpperCase()}
              </div>
              <span className="text-xs opacity-50 truncate max-w-[48px]">{player.name}</span>
            </div>
          );
        })}
      </div>

      {privateInfo && (
        <div>
          <p className="text-sm opacity-50 mb-2">Suas informações secretas</p>
          <PrivateInfoCard privateInfo={privateInfo} />
        </div>
      )}
    </div>
  );
}
