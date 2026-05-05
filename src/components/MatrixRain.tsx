import { useEffect, useRef } from "react";

/**
 * Componente: MatrixRain
 * =====================
 * Animação de fundo estilo Matrix: chuva de caracteres digitais caindo
 * 
 * Implementação: HTML5 Canvas (mais rápido que SVG/DOM para animações)
 * Performance: 20fps (50ms interval) com fade trail para criar rastro
 * Estilos: Caracteres em hex (0-F), símbolos ({ } [ ] etc) e kanji
 * Cores: Variação entre branco brilhante, roxo e azul com gradientes HSL
 * 
 * Design cyberpunk: efeito "hacker screen" no fundo de toda página
 */
const MatrixRain = () => {
  // Ref para acessar elemento canvas HTML5 do DOM
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect roda uma vez ao montar (setup) para inicializar canvas
  useEffect(() => {
    // 1. Obtém referência do elemento canvas
    const canvas = canvasRef.current;
    if (!canvas) return;  // Guard: se não existe, sai
    
    // 2. Obtém contexto 2D para desenhar no canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return;  // Guard: se não consegue contexto, sai

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01ABCDEF{}[]<>/\\$#@!*&%アイウエオカキクケコ".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 6, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const gradient = Math.random();
        if (gradient > 0.95) ctx.fillStyle = "hsl(280, 100%, 80%)";
        else if (gradient > 0.5) ctx.fillStyle = "hsl(270, 95%, 60%)";
        else ctx.fillStyle = "hsl(220, 100%, 60%)";
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30 pointer-events-none"
    />
  );
};

export default MatrixRain;
