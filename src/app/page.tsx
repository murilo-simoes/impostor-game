"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGame";
import { LobbyView } from "@/components/views/LobbyView";
import { PlayingView } from "@/components/views/PlayingView";
import { VotingView } from "@/components/views/VotingView";
import { ResultsView } from "@/components/views/ResultsView";
import type { GameSettings } from "@/types/game";

type Screen = "home" | "create" | "join" | "game";

function HomeContent() {
  const game = useGame();
  const router = useRouter();
  const searchParams = useSearchParams();
  const salaParam = searchParams.get("sala");

  const [screen, setScreen] = useState<Screen>(() => salaParam ? "join" : "home");
  const [nameInput, setNameInput] = useState("");
  const [codeInput, setCodeInput] = useState(() => salaParam?.toUpperCase() ?? "");
  const [joinError, setJoinError] = useState("");

  // Limpa o ?sala= da URL após ler (sem reload)
  useEffect(() => {
    if (salaParam) {
      router.replace("/", { scroll: false });
    }
  }, [salaParam, router]);

  const handleCreate = () => {
    if (!nameInput.trim()) return;
    game.createRoom(nameInput.trim());
    setScreen("game");
  };

  const handleJoin = () => {
    if (!nameInput.trim() || !codeInput.trim()) return;
    setJoinError("");
    game.joinRoom(codeInput.trim().toUpperCase(), nameInput.trim(), (err) => {
      setJoinError(err);
      setScreen("join");
    });
    setScreen("game");
  };

  const handleLeave = () => {
    game.leaveRoom();
    setScreen("home");
    setNameInput("");
    setCodeInput("");
    setJoinError("");
  };

  const myVote = game.myId ? game.castVotes[game.myId] ?? null : null;

  if (game.room) {
    const { room, myId, privateInfo, castVotes, voteResults } = game;
    const phase = room.state.phase;

    return (
      <main className="max-w-md mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold">
            <span style={{ color: "var(--accent-light)" }}>Impostor</span>
          </h1>
          <span
            className="badge"
            style={{
              background: "rgba(124,58,237,0.2)",
              color: "var(--accent-light)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {room.code}
          </span>
        </header>

        {game.error && (
          <div
            className="card p-3 mb-4 text-sm"
            style={{ border: "1px solid var(--danger)", color: "var(--danger)" }}
          >
            {game.error}
            <button onClick={game.clearError} className="ml-2 opacity-60">✕</button>
          </div>
        )}

        {phase === "lobby" && (
          <LobbyView room={room} myId={myId!} onStart={(s: GameSettings) => game.startGame(s)} onLeave={handleLeave} />
        )}
        {phase === "playing" && (
          <PlayingView room={room} myId={myId!} privateInfo={privateInfo} onNextTurn={game.nextTurn} onHostSkip={game.hostSkipTurn} />
        )}
        {phase === "voting" && (
          <VotingView
            room={room}
            myId={myId!}
            privateInfo={privateInfo}
            castVotes={castVotes}
            myVote={myVote}
            onVote={game.castVote}
          />
        )}
        {phase === "results" && (
          <ResultsView
            room={room}
            myId={myId!}
            privateInfo={privateInfo}
            voteResults={voteResults}
            onPlayAgain={() => game.restartGame()}
            onNewGame={handleLeave}
          />
        )}
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-4 py-10 flex flex-col min-h-dvh">
      {screen === "home" && (
        <div className="flex flex-col items-center justify-center flex-1 space-y-8 fade-in">
          <div className="text-center">
            <div className="text-6xl mb-4">🕵️</div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span style={{ color: "var(--accent-light)" }}>Impostor</span>
            </h1>
            <p className="text-sm opacity-50 mt-2">Jogo de dedução social</p>
          </div>

          <div className="w-full space-y-3">
            <button onClick={() => setScreen("create")} className="btn-primary w-full py-4 text-lg">
              Criar Sala
            </button>
            <button onClick={() => setScreen("join")} className="btn-secondary w-full py-4 text-lg">
              Entrar em Sala
            </button>
          </div>

          <p className="text-xs opacity-30 text-center">Mínimo 3 jogadores • Funciona no celular</p>
        </div>
      )}

      {(screen === "create" || screen === "join") && (
        <div className="space-y-5 fade-in pt-4">
          <button
            onClick={() => { setScreen("home"); setJoinError(""); setCodeInput(""); }}
            className="text-sm opacity-50 flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            ← Voltar
          </button>

          <div>
            <h2 className="text-2xl font-bold">
              {screen === "create" ? "Criar Sala" : "Entrar em Sala"}
            </h2>
            {screen === "join" && codeInput && (
              <p className="text-sm mt-1" style={{ color: "var(--accent-light)" }}>
                Entrando na sala <span className="font-mono font-bold">{codeInput}</span>
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm opacity-60 mb-1.5 block">Seu nome</label>
              <input
                className="input"
                placeholder="Como você quer ser chamado?"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={20}
                onKeyDown={(e) => {
                  if (e.key === "Enter") screen === "create" ? handleCreate() : handleJoin();
                }}
                autoFocus
              />
            </div>

            {screen === "join" && (
              <div>
                <label className="text-sm opacity-60 mb-1.5 block">Código da sala</label>
                <input
                  className="input font-mono text-lg tracking-widest uppercase"
                  placeholder="XXXXXX"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  maxLength={6}
                  onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                />
                {joinError && (
                  <p className="text-sm mt-1" style={{ color: "var(--danger)" }}>{joinError}</p>
                )}
              </div>
            )}
          </div>

          <button
            onClick={screen === "create" ? handleCreate : handleJoin}
            disabled={!nameInput.trim() || (screen === "join" && codeInput.trim().length < 4)}
            className="btn-primary w-full py-4 text-lg"
          >
            {screen === "create" ? "Criar" : "Entrar"}
          </button>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
