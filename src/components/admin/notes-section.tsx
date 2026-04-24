"use client";

import { useState } from "react";

import type { Registration } from "@/lib/types";
import { ADMIN_API } from "@/lib";

interface NotesSectionProps {
  reg: Registration;
  onNotesUpdated: (reg: Registration, notes: string) => void;
  onError: (message: string) => void;
}

export function NotesSection({ reg, onNotesUpdated, onError }: NotesSectionProps) {
  const [notes, setNotes] = useState(reg.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = notes !== (reg.notes ?? "");

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(ADMIN_API.registration(reg.id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      const json = await res.json();
      if (json.ok) {
        onNotesUpdated(reg, notes);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        onError(json.error || "Грешка при запазване на бележката");
      }
    } catch {
      onError("Грешка при запазване на бележката");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
          Бележки <span className="text-white/20 normal-case">(само за админи)</span>
        </div>
        {saved && (
          <span className="font-mono text-[12px] text-emerald-400 tracking-wide">Запазено ✓</span>
        )}
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Добави бележка..."
        rows={3}
        maxLength={2000}
        className="w-full font-mono text-[14px] text-white/80 leading-[1.8] bg-white/3 p-4 border border-white/8 break-words resize-y outline-none transition-colors focus:border-acid/30 placeholder:text-white/20"
      />
      {dirty && (
        <button
          onClick={save}
          disabled={saving}
          className="mt-2 font-mono text-[13px] tracking-[0.08em] uppercase bg-acid/10 text-acid border border-acid/25 px-5 py-2 cursor-pointer transition-all hover:bg-acid/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? "..." : "Запази бележка"}
        </button>
      )}
    </div>
  );
}
