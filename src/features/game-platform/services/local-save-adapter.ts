import type { SaveAdapter } from "@/types/game-platform";

export function createLocalSaveAdapter(key: string): SaveAdapter {
  return {
    key,
    load: <T>() => {
      if (typeof window === "undefined") return null;
      const value = window.localStorage.getItem(key);
      try {
        return value ? (JSON.parse(value) as T) : null;
      } catch {
        return null;
      }
    },
    save: <T>(value: T) => {
      if (typeof window !== "undefined")
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {
      if (typeof window !== "undefined") window.localStorage.removeItem(key);
    },
  };
}
