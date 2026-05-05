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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = useCallback(() => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
  }, [isShuffled, tracks.length]);

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

  const progress = (currentTime / currentTrack.duration) * 100;

  return (
    <div className="fixed bottom-6 right-6 z-40 glass rounded-2xl p-4 w-80 glow-primary transition-all duration-300 hover:scale-105">
      {/* Visualizador de Áudio */}
      <div className="flex items-end justify-center gap-1 h-16 mb-4">
        {visualizerBars.map((height, i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-primary to-secondary rounded-t transition-all duration-100"
            style={{
              height: isPlaying ? `${height}%` : '4%',
              animationDelay: `${i * 20}ms`,
            }}
          />
        ))}
      </div>

      {/* Info da Música */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gradient truncate">{currentTrack.title}</h3>
            <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="ml-2 p-2 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
            />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-border/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-1000 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>
      </div>

      {/* Controles Principais */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <button
          onClick={() => setIsShuffled(!isShuffled)}
          className={`p-2 rounded-lg transition-colors ${isShuffled ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-muted-foreground'}`}
        >
          <Shuffle className="w-4 h-4" />
        </button>
        
        <button
          onClick={handlePrevious}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-3 rounded-full bg-gradient-primary hover:opacity-90 transition-all glow-primary"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-foreground" />
          ) : (
            <Play className="w-5 h-5 text-foreground ml-0.5" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsRepeating(!isRepeating)}
          className={`p-2 rounded-lg transition-colors ${isRepeating ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-muted-foreground'}`}
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-1 bg-border/50 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume}%, hsl(var(--border)) ${volume}%, hsl(var(--border)) 100%)`
          }}
        />
        <span className="text-xs text-muted-foreground font-mono w-8">{volume}%</span>
      </div>

      {/* Playlist (minimizada) */}
      <div className="mt-3 pt-3 border-t border-border/30">
        <div className="text-xs text-muted-foreground font-mono mb-2">Playlist</div>
        <div className="space-y-1 max-h-20 overflow-y-auto">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setCurrentTime(0);
              }}
              className={`w-full text-left p-1 rounded text-xs transition-colors ${
                index === currentTrackIndex 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-primary/10 text-muted-foreground'
              }`}
            >
              <div className="truncate">{track.title}</div>
              <div className="text-[10px] opacity-70">{track.artist}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
