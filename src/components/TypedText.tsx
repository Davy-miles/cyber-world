import { useEffect, useState } from "react";

/**
 * Interface: Props do TypedText
 * =============================
 * phrases: array de strings para digitar sequencialmente
 * className: classes Tailwind para estilo customizado (opcional)
 */
interface Props {
  phrases: string[];  // Ex: ["init dev_community", "exploit knowledge"]
  className?: string; // Ex: "text-foreground text-xl"
}

/**
 * Componente: TypedText
 * =====================
 * Efeito de digitação em tempo real (typing effect)
 * 
 * Fluxo:
 * 1. Digita primeira frase caractere por caractere
 * 2. Aguarda 1.8s com frase completa
 * 3. Apaga a frase caractere por caractere
 * 4. Passa para próxima frase (loop infinito)
 */
const TypedText = ({ phrases, className = "" }: Props) => {
  // Estado 1: Texto exibido (cresce ao digitar, encolhe ao apagar)
  const [text, setText] = useState("");
  
  // Estado 2: Qual frase do array estamos digitando (0-indexed)
  const [phraseIdx, setPhraseIdx] = useState(0);
  
  // Estado 3: Modo de operação (false = digitando, true = apagando)
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 40 : 90;

    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setPhraseIdx((p) => (p + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-blink" />
    </span>
  );
};

export default TypedText;
