import { useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Componente: PageTransition
 * ==========================
 * Cria transições "cyberpunk" globais (boot/exit overlays)
 * 
 * BOOT SEQUENCE (ao montar página):
 *   - Overlay com grid background + scanlines animadas
 *   - Terminal boot messages aparecem em cascata
 *   - Cursor piscante
 *   - Desaparece automaticamente após 1.4s
 * 
 * EXIT SEQUENCE (ao clicar em link para Discord):
 *   - Ativa quando window.__triggerExitTransition(url) é chamado
 *   - Overlay com glitch/scan effects
 *   - Abre URL em nova aba
 *   - Volta ao estado idle após 300ms
 * 
 * Design: Estilo matrix/cyberpunk, feedback visual de ação
 */
const PageTransition = ({ children }: Props) => {
  const [phase, setPhase] = useState<"entering" | "idle" | "exiting">("entering");
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      "> initializing cyber//world kernel...",
      "> loading neural-interface modules [OK]",
      "> establishing encrypted tunnel [OK]",
      "> bypassing reality firewall...",
      "> ACCESS GRANTED",
    ];
    let i = 0;
    const id = setInterval(() => {
      setBootLines((prev) => [...prev, lines[i]]);
      i++;
      if (i >= lines.length) clearInterval(id);
    }, 180);

    const t = setTimeout(() => setPhase("idle"), 1400);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    // Define função global segura de transição
    (globalThis as unknown as { __triggerExitTransition: (url: string) => void }).__triggerExitTransition = (url: string) => {
      setPendingUrl(url);
      setPhase("exiting");
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(() => setPhase("idle"), 300);
      }, 1200);
    };
  }, []);

  return (
    <>
      {children}

      {/* Entrance overlay */}
      {phase === "entering" && (
        <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden animate-fade-out-overlay">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 scanline" />
          <div className="relative font-mono text-xs md:text-sm text-primary space-y-2 max-w-md px-6">
            {bootLines.map((l, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDuration: "0.2s" }}>
                <span className={i === bootLines.length - 1 ? "text-accent text-glow" : ""}>{l}</span>
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-accent">$</span>
              <span className="ml-2 w-2 h-4 bg-primary animate-blink" />
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground tracking-widest">
            CYBER//WORLD v3.1.4 — booting
          </div>
        </div>
      )}

      {/* Exit overlay */}
      {phase === "exiting" && (
        <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-60 animate-pulse" />
          <div className="absolute inset-0 scanline" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "var(--gradient-mesh)" }}
          />
          <div className="relative text-center font-mono space-y-3 px-6">
            <div className="text-xs text-muted-foreground tracking-widest">REDIRECTING</div>
            <div className="text-2xl md:text-4xl font-black text-gradient text-glow animate-glitch">
              ENTERING CYBER//WORLD
            </div>
            <div className="text-xs text-accent">{pendingUrl}</div>
            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-2 h-6 bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageTransition;
