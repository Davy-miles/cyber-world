import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  cover?: string;
}

/**
 * Componente: MusicPlayer
 * ======================
 * Player de música cyberpunk com visualizações animadas
 * 
 * Funcionalidades:
 * - Play/Pause com animações suaves
 * - Visualizador de áudio com barras animadas
 * - Controles completos (play, pause, next, previous, shuffle, repeat)
 * - Volume control
 * - Progress bar animada
 * - Playlist com scroll
 * - Efeitos de glow e transições cyberpunk
 */

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(20).fill(0));

  // Playlist mock - em produção viria de API
  const tracks: Track[] = [
    { id: 1, title: "Neural Networks", artist: "Cyber DJ", duration: 245 },
    { id: 2, title: "Binary Dreams", artist: "Matrix Beats", duration: 198 },
    { id: 3, title: "Glitch in the Code", artist: "404 Not Found", duration: 312 },
    { id: 4, title: "Firewall Breach", artist: "Hackers Symphony", duration: 267 },
    { id: 5, title: "Data Stream", artist: "Digital Pulse", duration: 189 },
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Definir handlers ANTES de usá-los em useEffect
  const handleNext = useCallback(() => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
  }, [isShuffled, tracks.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Animação do visualizador
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisualizerBars(prev => 
        prev.map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simulação de progresso
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= currentTrack.duration) {
          if (isRepeating) {
            return 0;
          } else {
            handleNext();
            return 0;
          }
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration, isRepeating, handleNext]);

  const progress = (currentTime / currentTrack.duration) * 100;

  return (
    <div className="fixed bottom-2 md:bottom-4 right-2 md:right-4 z-40 glass rounded-lg md:rounded-xl p-2 md:p-3 w-56 md:w-64 glow-primary transition-all duration-300 hover:scale-105 border border-primary/30">
      {/* Visualizador Mini */}
      <div className="flex items-end justify-center gap-0.5 h-6 md:h-8 mb-2 md:mb-3">
        {visualizerBars.slice(0, 10).map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t transition-all duration-100"
            style={{
              height: isPlaying ? `${height}%` : '2px',
            }}
          />
        ))}
      </div>

      {/* Info compacta */}
      <div className="mb-1 md:mb-2">
        <h3 className="font-bold text-xs text-gradient truncate">{currentTrack.title}</h3>
        <p className="text-[10px] text-muted-foreground truncate">{currentTrack.artist}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-1 md:mb-2 h-1 bg-border/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-primary transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controles compactos */}
      <div className="flex items-center justify-between gap-0.5 md:gap-1">
        <button
          onClick={handlePrevious}
          className="p-1 rounded hover:bg-primary/20 transition-colors text-muted-foreground hover:text-primary"
          title="Anterior"
        >
          <SkipBack className="w-3 h-3" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-1.5 md:p-2 rounded bg-gradient-primary hover:opacity-90 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 md:w-3.5 md:h-3.5 text-foreground" />
          ) : (
            <Play className="w-3 h-3 md:w-3.5 md:h-3.5 text-foreground ml-0.5" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-1 rounded hover:bg-primary/20 transition-colors text-muted-foreground hover:text-primary"
          title="Próxima"
        >
          <SkipForward className="w-3 h-3" />
        </button>

        <button
          onClick={() => setIsShuffled(!isShuffled)}
          className={`p-1 rounded transition-colors ${isShuffled ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary'}`}
          title="Embaralhar"
        >
          <Shuffle className="w-3 h-3" />
        </button>

        <button
          onClick={() => setIsRepeating(!isRepeating)}
          className={`p-1 rounded transition-colors ${isRepeating ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary'}`}
          title="Repetir"
        >
          <Repeat className="w-3 h-3" />
        </button>

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="p-1 rounded hover:bg-primary/20 transition-colors"
          title="Favoritar"
        >
          <Heart
            className={`w-3 h-3 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
