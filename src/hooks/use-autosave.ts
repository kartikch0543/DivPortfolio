import { useEffect, useRef, useState } from "react";

interface UseAutosaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void> | void;
  delayMs?: number;
  enabled?: boolean;
}

export function useAutosave<T>({
  data,
  onSave,
  delayMs = 2000,
  enabled = true,
}: UseAutosaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isFirstRender = useRef(true);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (!enabled) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSaving(true);
        await onSave(dataRef.current);
        setLastSavedAt(new Date());
      } catch (err) {
        console.error("Autosave failed:", err);
      } finally {
        setIsSaving(false);
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [data, delayMs, enabled, onSave]);

  return { isSaving, lastSavedAt };
}
