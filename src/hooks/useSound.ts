// src/hooks/useSound.ts
export function useSound(src: string) {
  return () => {
    const audio = new Audio(src);
    audio.play().catch((err) => {
      console.error('Sound play failed:', err);
    });
  };
}
