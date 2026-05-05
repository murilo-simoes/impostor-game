import type { GameMode } from "@/types/game";

const icons: Record<GameMode, string> = {
  "secret-word": "🔤",
  "location-role": "📍",
  "question": "❓",
  "two-factions": "⚔️",
  "category-item": "🏷️",
  "movie-series": "🎬",
};

const labels: Record<GameMode, string> = {
  "secret-word": "Palavra Secreta",
  "location-role": "Locais & Funções",
  "question": "Perguntas",
  "two-factions": "Duas Facções",
  "category-item": "Categoria + Item",
  "movie-series": "Filmes & Séries",
};

export function ModeIcon({ mode }: { mode: GameMode }) {
  return <span title={labels[mode]}>{icons[mode]}</span>;
}

export function ModeLabel({ mode }: { mode: GameMode }) {
  return <span>{labels[mode]}</span>;
}

export { labels as modeLabels };
