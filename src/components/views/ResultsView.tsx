"use client";

import type { PublicRoom, PlayerPrivateInfo, VoteResults } from "@/types/game";
import { PlayerList } from "../PlayerList";

interface Props {
  room: PublicRoom;
  myId: string;
  privateInfo: PlayerPrivateInfo | null;
  voteResults: VoteResults | null;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export function ResultsView({ room, myId, privateInfo, voteResults, onPlayAgain, onNewGame }: Props) {
  const isHost = room.hostId === myId;
  const caught = voteResults?.impostorsCaught;
  const eliminated = voteResults?.eliminated
    ? room.state.players.find((p) => p.id === voteResults.eliminated)
    : null;
  const impostors = voteResults?.impostors ?? [];

  return (
    <div className="space-y-4 fade-in">
      <div
        className="card p-6 text-center"
        style={{
          border: `1px solid ${caught ? "var(--success)" : "var(--danger)"}`,
          boxShadow: caught
            ? "0 0 30px rgba(34,197,94,0.2)"
            : "0 0 30px rgba(239,68,68,0.2)",
        }}
      >
        <p className="text-5xl mb-3">{caught ? "🎉" : "😈"}</p>
        <p className="text-2xl font-bold">
          {caught ? "Impostor descoberto!" : "O impostor escapou!"}
        </p>
        {eliminated ? (
          <p className="text-sm opacity-60 mt-2">
            <span className="font-semibold">{eliminated.name}</span> foi eliminado
          </p>
        ) : (
          <p className="text-sm opacity-60 mt-2">Empate — ninguém foi eliminado</p>
        )}
      </div>

      <div className="card p-4">
        <p className="font-semibold text-sm mb-3">Resultado final</p>
        <PlayerList
          players={room.state.players}
          myId={myId}
          hostId={room.hostId}
          impostors={impostors}
        />
      </div>

      {privateInfo && (
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3">Suas informações eram:</p>
          <div className="py-2">
            {privateInfo.role === "impostor" ? (
              <p className="text-center font-bold" style={{ color: "var(--danger)" }}>
                Você era o impostor!
              </p>
            ) : (
              <p className="text-center font-bold" style={{ color: "var(--success)" }}>
                Você era inocente!
              </p>
            )}
          </div>
        </div>
      )}

      {isHost && (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onPlayAgain} className="btn-primary">
            Jogar novamente
          </button>
          <button onClick={onNewGame} className="btn-secondary">
            Novo jogo
          </button>
        </div>
      )}

      {!isHost && (
        <div className="card p-4 text-center text-sm opacity-60">
          Aguardando o host iniciar uma nova rodada...
        </div>
      )}
    </div>
  );
}
