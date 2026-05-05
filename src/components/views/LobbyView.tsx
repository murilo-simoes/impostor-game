"use client";

import { useState } from "react";
import type { PublicRoom, GameSettings } from "@/types/game";
import { PlayerList } from "../PlayerList";
import { GameSettingsPanel } from "../GameSettings";

interface Props {
  room: PublicRoom;
  myId: string;
  onStart: (settings: GameSettings) => void;
  onLeave: () => void;
}

export function LobbyView({ room, myId, onStart, onLeave }: Props) {
  const isHost = room.hostId === myId;
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/?sala=${room.code}`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-5 fade-in">
      <div className="card p-5 text-center">
        <p className="text-sm opacity-50 mb-1">Código da Sala</p>
        <p
          className="text-5xl font-mono font-bold tracking-widest glow-pulse"
          style={{ color: "var(--accent-light)" }}
        >
          {room.code}
        </p>

        <div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          <p className="text-xs font-mono opacity-50 flex-1 truncate text-left">{shareUrl}</p>
          <button
            onClick={copyLink}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: copied ? "rgba(34,197,94,0.2)" : "rgba(124,58,237,0.25)",
              color: copied ? "var(--success)" : "var(--accent-light)",
              border: `1px solid ${copied ? "var(--success)" : "var(--accent)"}`,
            }}
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        <p className="text-xs opacity-30 mt-2">Amigos que abrirem o link já entram com o código preenchido</p>
      </div>

      <div className="card p-4">
        <p className="font-semibold text-sm mb-3">
          Jogadores ({room.state.players.length})
        </p>
        <PlayerList
          players={room.state.players}
          myId={myId}
          hostId={room.hostId}
        />
      </div>

      {isHost ? (
        <div className="card p-4">
          <p className="font-semibold text-sm mb-4">Configurações</p>
          <GameSettingsPanel
            playerCount={room.state.players.length}
            onStart={onStart}
          />
        </div>
      ) : (
        <div className="card p-5 text-center">
          <p className="text-3xl mb-2">⏳</p>
          <p className="font-medium">Aguardando o host iniciar...</p>
          <p className="text-sm opacity-50 mt-1">
            {room.state.players.find((p) => p.id === room.hostId)?.name} está configurando o jogo
          </p>
        </div>
      )}

      <button onClick={onLeave} className="btn-secondary w-full">
        Sair da Sala
      </button>
    </div>
  );
}
