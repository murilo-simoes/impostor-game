"use client";

import { useState } from "react";
import type { GameSettings, GameMode, Difficulty } from "@/types/game";
import { modeLabels, ModeIcon } from "./ModeIcon";

const MODES: GameMode[] = [
  "secret-word",
  "location-role",
  "question",
  "two-factions",
  "category-item",
  "movie-series",
];

const MODE_DESCRIPTIONS: Record<GameMode, string> = {
  "secret-word": "Todos recebem a mesma palavra, exceto o impostor.",
  "location-role": "Todos recebem local + função. O impostor não sabe nada.",
  "question": "Todos recebem a mesma pergunta. O impostor deve inventar uma resposta.",
  "two-factions": "Dois times com palavras diferentes. Um impostor sem palavra.",
  "category-item": "Todos recebem categoria + item. Impostor só tem a categoria.",
  "movie-series": "Todos recebem infos de um filme/série. Impostor tem infos limitadas.",
};

interface Props {
  playerCount: number;
  onStart: (settings: GameSettings) => void;
}

export function GameSettingsPanel({ playerCount, onStart }: Props) {
  const [mode, setMode] = useState<GameMode>("secret-word");
  const [impostorCount, setImpostorCount] = useState<1 | 2>(1);
  const [rounds, setRounds] = useState(2);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const canStart = playerCount >= 3;

  return (
    <div className="space-y-5 fade-in">
      <div>
        <p className="text-sm opacity-60 mb-3 font-medium">Modo de Jogo</p>
        <div className="grid grid-cols-1 gap-2">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="card p-3 text-left transition-all"
              style={{
                borderColor: mode === m ? "var(--accent)" : "var(--card-border)",
                borderWidth: "1px",
                background: mode === m ? "rgba(124,58,237,0.1)" : "var(--card)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  <ModeIcon mode={m} />
                </span>
                <div>
                  <p className="font-medium text-sm">{modeLabels[m]}</p>
                  <p className="text-xs opacity-50 mt-0.5">{MODE_DESCRIPTIONS[m]}</p>
                </div>
                {mode === m && (
                  <span className="ml-auto text-purple-400 font-bold">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm opacity-60 mb-3 font-medium">Impostores</p>
        <div className="flex gap-2">
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              onClick={() => setImpostorCount(n)}
              disabled={n === 2 && playerCount < 5}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: impostorCount === n ? "var(--accent)" : "var(--card)",
                color: impostorCount === n ? "white" : undefined,
                border: `1px solid ${impostorCount === n ? "var(--accent)" : "var(--card-border)"}`,
                opacity: n === 2 && playerCount < 5 ? 0.4 : 1,
                cursor: n === 2 && playerCount < 5 ? "not-allowed" : "pointer",
              }}
            >
              {n} impostor{n > 1 ? "es" : ""}
            </button>
          ))}
        </div>
        {impostorCount === 2 && playerCount < 5 && (
          <p className="text-xs mt-1" style={{ color: "var(--warning)" }}>
            Precisa de 5+ jogadores para 2 impostores
          </p>
        )}
      </div>

      <div>
        <p className="text-sm opacity-60 mb-3 font-medium">Rodadas</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRounds(n)}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: rounds === n ? "var(--accent)" : "var(--card)",
                color: rounds === n ? "white" : undefined,
                border: `1px solid ${rounds === n ? "var(--accent)" : "var(--card-border)"}`,
                cursor: "pointer",
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="text-xs opacity-40 mt-2">
          Cada jogador fala {rounds}x — total de {rounds * playerCount} falas
        </p>
      </div>

      {mode === "movie-series" && (
        <div>
          <p className="text-sm opacity-60 mb-3 font-medium">Dificuldade</p>
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((d) => {
              const labels = { easy: "Fácil", medium: "Médio", hard: "Difícil" };
              return (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: difficulty === d ? "var(--accent)" : "var(--card)",
                    color: difficulty === d ? "white" : undefined,
                    border: `1px solid ${difficulty === d ? "var(--accent)" : "var(--card-border)"}`,
                    cursor: "pointer",
                  }}
                >
                  {labels[d]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => onStart({ mode, impostorCount, rounds, difficulty })}
        disabled={!canStart}
        className="btn-primary w-full text-base py-3"
      >
        {canStart ? "Iniciar Jogo" : `Aguardando jogadores (mín. 3/${playerCount})`}
      </button>
    </div>
  );
}
