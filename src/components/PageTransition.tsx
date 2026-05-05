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
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Detectar se é mobile para ajustar velocidade
    const isMobile = window.innerWidth < 768;
    const charDelay = isMobile ? 8 : 15;
    const lineDelay = isMobile ? 50 : 100;

    const lines = [
      "> BIOS v3.1.4 — Initializing...",
      "> CPU: Intel Core i9-9999K",
      "> RAM: 128GB DDR5 @ 6000MHz",
      "> SSD: Samsung 870 NVMe 4TB",
      "",
      "> cyber-world kernel 6.6.6",
      "> [    0.000000] Linux version 6.6.6-cyberpunk",
      "> [    0.125000] Memory: 128000M available",
      "> [    0.256000] ACPI: Core revision 20230816",
      "> [    0.512000] PCI: Using configuration type 1",
      "> [    1.024000] cryptoloop: cbc(aes-generic) loaded",
      "",
      "> [CRITICAL] Neural interface detected!",
      "> [WARNING] Reality firewall unstable...",
      "> [STATUS] Establishing encrypted tunnel...",
      "> [SUCCESS] VPN connection established [OK]",
      "",
      "> Initializing cyber//world neural kernel...",
      "> Loading AI modules... [████████░░] 85%",
      "> Connecting to distributed network...",
      "> Bridging quantum states...",
      "",
      "> ╔═══════════════════════════════════╗",
      "> ║  CYBER//WORLD v3.1.4 - BOOTING   ║",
      "> ║  System ready. Access granted.   ║",
      "> ╚═══════════════════════════════════╝",
      "",
      "> Root@cyber-world ~# ",
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentText = "";

    const typeChar = () => {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        if (charIndex < line.length) {
          currentText += line[charIndex];
          setDisplayedText(currentText);
          charIndex++;
          setTimeout(typeChar, charDelay);
        } else {
          // Linha completa
          currentText += "\n";
          setBootLines((prev) => [...prev, line]);
          lineIndex++;
          charIndex = 0;
          setTimeout(typeChar, lineDelay);
        }
      } else {
        // Fim do boot
        setTimeout(() => setPhase("idle"), 800);
      }
    };

    typeChar();

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    // Define função global segura de transição
    (globalThis as unknown as { __triggerExitTransition: (url: string) => void }).__triggerExitTransition = (url: string) => {
      setPendingUrl(url);
      setPhase("exiting");
      setTimeout(() => setPhase("idle"), 1500);
    };
  }, []);

  return (
    <>
      {children}

      {/* Entrance overlay */}
      {phase === "entering" && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
          {/* Fundo com efeito CRT */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[hsl(240,30%,4%)] to-black" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 scanline opacity-50" />
          
          {/* Glitch effect */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(to bottom, transparent 2px, hsl(270 95% 65% / 0.03) 2px, hsl(270 95% 65% / 0.03) 4px, transparent 4px)",
            backgroundSize: "100% 4px",
            animation: "flicker 0.15s infinite"
          }} />

          {/* Terminal window */}
          <div className="relative max-w-2xl w-full mx-4 glass rounded-lg overflow-hidden glow-primary border border-primary/30">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 border-b border-primary/30 bg-black/50">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500" />
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-primary font-mono">cyber-world@nexus:~$</span>
            </div>

            {/* Terminal content */}
            <div className="px-4 md:px-6 py-3 md:py-4 font-mono text-xs md:text-sm text-primary bg-black/80 min-h-64 md:min-h-96 max-h-64 md:max-h-96 overflow-y-auto">
              <div className="whitespace-pre-wrap break-words text-green-400">
                {displayedText}
                <span className="inline-block w-1.5 h-3 md:w-2 md:h-4 bg-primary animate-blink ml-1" />
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-center">
            <div className="text-[9px] md:text-[10px] font-mono text-primary/60 tracking-widest">
              ⚙ CYBER//WORLD INITIALIZATION
            </div>
            <div className="text-[8px] md:text-[9px] font-mono text-accent mt-1">
              [████████████████████] 100%
            </div>
          </div>

          {/* Ambient glow */}
          <div className="absolute top-10 md:top-20 -left-20 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-primary/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-10 md:bottom-20 -right-20 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-secondary/20 rounded-full blur-3xl opacity-30" />
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
          <div className="relative text-center font-mono space-y-2 md:space-y-3 px-4 md:px-6">
            <div className="text-xs text-muted-foreground tracking-widest">REDIRECTING</div>
            <div className="text-xl md:text-2xl lg:text-4xl font-black text-gradient text-glow animate-glitch">
              ENTERING CYBER//WORLD
            </div>
            <div className="text-xs text-accent truncate max-w-xs mx-auto">{pendingUrl}</div>
            <div className="flex justify-center gap-1 mt-3 md:mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-4 md:w-2 md:h-6 bg-primary animate-pulse"
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
