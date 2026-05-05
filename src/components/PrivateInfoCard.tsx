"use client";

import type { PlayerPrivateInfo, PlayerInfo } from "@/types/game";

function renderInfo(info: PlayerInfo) {
  switch (info.mode) {
    case "secret-word":
      return info.word ? (
        <div className="text-center">
          <p className="text-sm opacity-60 mb-2">A palavra secreta é:</p>
          <p className="text-4xl font-bold tracking-wide" style={{ color: "var(--accent-light)" }}>
            {info.word}
          </p>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold" style={{ color: "var(--danger)" }}>
          Você não sabe a palavra!
        </p>
      );

    case "location-role":
      return info.location ? (
        <div className="text-center space-y-3">
          <div>
            <p className="text-sm opacity-60 mb-1">Local</p>
            <p className="text-2xl font-bold" style={{ color: "var(--accent-light)" }}>{info.location}</p>
          </div>
          <div>
            <p className="text-sm opacity-60 mb-1">Sua função</p>
            <p className="text-xl font-semibold">{info.roleTitle}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold" style={{ color: "var(--danger)" }}>
          Você não sabe o local nem a função!
        </p>
      );

    case "question":
      return info.question ? (
        <div className="text-center">
          <p className="text-sm opacity-60 mb-2">A pergunta é:</p>
          <p className="text-xl font-semibold leading-relaxed" style={{ color: "var(--accent-light)" }}>
            "{info.question}"
          </p>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold" style={{ color: "var(--danger)" }}>
          Você não sabe a pergunta!
        </p>
      );

    case "two-factions":
      return info.word ? (
        <div className="text-center space-y-2">
          <p className="text-sm opacity-60">Sua palavra (Facção {info.faction}):</p>
          <p className="text-3xl font-bold" style={{ color: info.faction === "A" ? "#60a5fa" : "#f87171" }}>
            {info.word}
          </p>
          <p className="text-sm opacity-50">Encontre quem tem a mesma palavra que você</p>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold" style={{ color: "var(--danger)" }}>
          Você é o impostor — sem palavra!
        </p>
      );

    case "category-item":
      return (
        <div className="text-center space-y-2">
          <div>
            <p className="text-sm opacity-60 mb-1">Categoria</p>
            <p className="text-lg font-medium opacity-80">{info.category}</p>
          </div>
          {info.item ? (
            <div>
              <p className="text-sm opacity-60 mb-1">Seu item</p>
              <p className="text-3xl font-bold" style={{ color: "var(--accent-light)" }}>{info.item}</p>
            </div>
          ) : (
            <p className="font-semibold" style={{ color: "var(--danger)" }}>Você não sabe o item!</p>
          )}
        </div>
      );

    case "movie-series":
      return info.title ? (
        <div className="space-y-2 text-sm">
          <p className="text-xl font-bold text-center" style={{ color: "var(--accent-light)" }}>{info.title}</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {info.year && <InfoField label="Ano" value={String(info.year)} />}
            {info.genre && <InfoField label="Gênero" value={info.genre} />}
            {info.director && <InfoField label="Diretor" value={info.director} />}
            {info.cast && <InfoField label="Elenco" value={info.cast} />}
          </div>
          {info.synopsis && (
            <div className="mt-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
              <p className="text-xs opacity-60 mb-1">Sinopse</p>
              <p className="text-xs leading-relaxed opacity-80">{info.synopsis}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-1">
          <p className="font-semibold" style={{ color: "var(--danger)" }}>Informações limitadas!</p>
          {info.genre && <p className="text-sm">Gênero: <span className="font-medium">{info.genre}</span></p>}
          {info.year && <p className="text-sm">Ano: <span className="font-medium">{info.year}</span></p>}
        </div>
      );
  }
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
      <p className="text-xs opacity-50">{label}</p>
      <p className="font-medium text-xs mt-0.5">{value}</p>
    </div>
  );
}

export function PrivateInfoCard({ privateInfo }: { privateInfo: PlayerPrivateInfo }) {
  const isImpostor = privateInfo.role === "impostor";

  return (
    <div className="fade-in">
      <div
        className="card p-5 space-y-4"
        style={{
          border: `1px solid ${isImpostor ? "var(--danger)" : "var(--accent)"}`,
          boxShadow: isImpostor ? "0 0 20px rgba(239,68,68,0.2)" : "0 0 20px var(--accent-glow)",
        }}
      >
        <span
          className="badge text-sm"
          style={{
            background: isImpostor ? "rgba(239,68,68,0.2)" : "rgba(124,58,237,0.2)",
            color: isImpostor ? "var(--danger)" : "var(--accent-light)",
          }}
        >
          {isImpostor ? "IMPOSTOR" : "JOGADOR"}
        </span>

        <div className="py-1">{renderInfo(privateInfo.info)}</div>

        {isImpostor && privateInfo.hint && (
          <div
            className="p-3 rounded-xl text-sm"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}
          >
            <p className="font-semibold mb-1" style={{ color: "var(--warning)" }}>
              Dica (caso você fale primeiro)
            </p>
            <p className="opacity-80">{privateInfo.hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
