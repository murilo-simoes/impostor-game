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
  const isTie = voteResults !== null && voteResults.eliminated === null;
  const eliminated = voteResults?.eliminated
    ? room.state.players.find((p) => p.id === voteResults.eliminated)
    : null;
  const impostors = voteResults?.impostors ?? [];
  const revealedSecrets = voteResults?.revealedSecrets ?? [];

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
        {isTie ? (
          <p className="text-sm mt-2 font-semibold" style={{ color: "var(--danger)" }}>
            Empate nos votos — o impostor vence!
          </p>
        ) : eliminated ? (
          <p className="text-sm opacity-60 mt-2">
            <span className="font-semibold">{eliminated.name}</span> foi eliminado
          </p>
        ) : null}
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

      {voteResults && Object.keys(voteResults.votes).length > 0 && (
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3">Quem votou em quem</p>
          <div className="space-y-2">
            {Object.entries(voteResults.votes).map(([voterId, targetId]) => {
              const voter = room.state.players.find((p) => p.id === voterId);
              const target = room.state.players.find((p) => p.id === targetId);
              if (!voter || !target) return null;
              const isMe = voterId === myId;
              return (
                <div
                  key={voterId}
                  className="flex items-center justify-between text-sm px-2 py-1.5 rounded-lg"
                  style={{ background: isMe ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.04)" }}
                >
                  <span className="font-medium" style={{ color: isMe ? "var(--accent-light)" : undefined }}>
                    {voter.name}{isMe ? " (você)" : ""}
                  </span>
                  <span className="opacity-40 mx-2">→</span>
                  <span
                    className="font-medium"
                    style={{ color: impostors.includes(targetId) ? "var(--danger)" : undefined }}
                  >
                    {target.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {revealedSecrets.length > 0 && (
        <div className="card p-4 text-center">
          <p className="text-sm opacity-50 mb-2">
            {revealedSecrets[0].mode === "secret-word" && "A palavra secreta era"}
            {revealedSecrets[0].mode === "location-role" && "O local era"}
            {revealedSecrets[0].mode === "question" && "A pergunta era"}
            {revealedSecrets[0].mode === "two-factions" && "As palavras eram"}
            {revealedSecrets[0].mode === "category-item" && "A categoria era"}
            {revealedSecrets[0].mode === "movie-series" && "A obra era"}
          </p>
          {revealedSecrets[0].mode === "two-factions" ? (
            <div className="flex justify-center gap-8">
              {revealedSecrets.map((s, i) => (
                "word" in s && s.word ? (
                  <div key={i} className="text-center">
                    {"faction" in s && s.faction && (
                      <p className="text-xs opacity-50 mb-1">Grupo {s.faction}</p>
                    )}
                    <p className="text-3xl font-bold" style={{ color: "var(--accent-light)" }}>{s.word}</p>
                  </div>
                ) : null
              ))}
            </div>
          ) : (
            <p className="text-3xl font-bold" style={{ color: "var(--accent-light)" }}>
              {"word" in revealedSecrets[0] && revealedSecrets[0].word}
              {"location" in revealedSecrets[0] && revealedSecrets[0].location}
              {"question" in revealedSecrets[0] && `"${revealedSecrets[0].question}"`}
              {"category" in revealedSecrets[0] && revealedSecrets[0].category}
              {"title" in revealedSecrets[0] && revealedSecrets[0].title}
            </p>
          )}
        </div>
      )}

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
