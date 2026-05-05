import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Interface: Props do Reveal
 * ==========================
 * children: conteúdo JSX a ser animado
 * delay: atraso em ms antes de começar animação (para efeito cascata)
 * className: classes Tailwind customizadas
 */
interface Props {
  children: ReactNode;  // JSX/elementos a animar
  delay?: number;       // Ex: 100ms para 2º elemento começar depois do 1º
  className?: string;   // Classes CSS customizadas
}

/**
 * Componente: Reveal
 * ==================
 * Anima elementos quando entram na viewport (scroll animation)
 * 
 * Técnica: Intersection Observer API (otimizado pelo navegador)
 * Efeito: fade-in + slide-up (opacity 0→1, translateY 40px→0)
 * Delay: permite stagger effect em grids
 */
const Reveal = ({ children, delay = 0, className = "" }: Props) => {
  // Ref para monitorar elemento no DOM
  const ref = useRef<HTMLDivElement>(null);
  
  // Estado: elemento está visível na viewport?
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
