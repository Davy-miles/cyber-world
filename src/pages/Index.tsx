import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Code2, Shield, Cpu, Bot, Terminal, Users, Zap, Github,
  ChevronRight, Lock, Wifi, Database, Rocket, Sparkles
} from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import TypedText from "@/components/TypedText";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/PageTransition";
import DiscordLiveStats from "@/components/DiscordLiveStats";
import MusicPlayer from "@/components/MusicPlayer";
import logo from "@/assets/cyber-world-logo.jpeg";

/**
 * Discord Widget Configuration
 * =============================
 * DISCORD_GUILD_ID: ID numérico do seu servidor Discord (APENAS o ID, não a URL completa!)
 *   - Para obter: Server Settings → Widget → Server ID
 *   - Exemplo: "1499736443860422686" (sem aspas na URL de API)
 * 
 * IMPORTANTE: O servidor precisa ter "Enable Server Widget" ativado em:
 *   Settings → Widget → Enable Server Widget (ON)
 * Sem isso, a API retornará erro 404.
 */
const DISCORD_GUILD_ID = "1499736443860422686"; // 🔧 CORRIGIDO: era URL completa, agora é só o ID
const DISCORD_URL = "https://discord.gg/3TqHTUJMcw";

/**
 * Lista de canais do Discord com ícones e descrições
 * ===================================================
 * Cada canal representa uma comunidade especializada
 * Os ícones são do Lucide React (biblioteca de ícones SVG)
 * As cores usam gradientes Tailwind para visual cyberpunk
 */
const channels = [
  // Desenvolvimento Full Stack - foco em web e backend
  { icon: Code2, name: "dev-fullstack", desc: "React, Node, Python, Go — code reviews, pair programming e projetos open source.", color: "from-purple-500 to-blue-500" },
  
  // Segurança Ofensiva - testes de penetração e hacking ético
  { icon: Shield, name: "cybersec-lab", desc: "CTFs semanais, write-ups, pentest, OSINT e hardening de sistemas.", color: "from-blue-500 to-cyan-400" },
  
  // Eletrônica e IoT - Arduino, microcontroladores e embarcados
  { icon: Bot, name: "robotica-iot", desc: "Arduino, ESP32, Raspberry Pi, ROS — do circuito ao deploy.", color: "from-fuchsia-500 to-purple-500" },
  
  // Engenharia e Cálculo - disciplinas acadêmicas
  { icon: Cpu, name: "engenharia", desc: "Cálculo, simulações, hardware design e estudos colaborativos.", color: "from-purple-600 to-indigo-500" },
  
  // Ferramentas e Produtividade - Linux, terminal, ambiente dev
  { icon: Terminal, name: "shell-zone", desc: "Linux, dotfiles, neovim, terminais e produtividade dev.", color: "from-indigo-500 to-blue-600" },
  
  // Dados e IA - Machine Learning, pipelines de dados
  { icon: Database, name: "data-ai", desc: "ML, LLMs, data engineering e pipelines em produção.", color: "from-violet-500 to-purple-600" },
];

/**
 * Handle do botão "Entrar no Discord"
 * ===================================
 * Função que:
 * 1. Previne comportamento padrão do link
 * 2. Ativa a animação de transição (boot/exit cyberpunk)
 * 3. Abre o servidor Discord em nova aba
 * 
 * A função window.__triggerExitTransition é definida no PageTransition.tsx
 * e cria uma animação de glitch antes de abrir o link
 */
const handleJoin = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  const triggerTransition = (globalThis as unknown as {
    __triggerExitTransition?: (url: string) => void;
  }).__triggerExitTransition;

  const opened = window.open(DISCORD_URL, "_blank", "noopener,noreferrer");

  if (!triggerTransition) {
    if (!opened) {
      window.location.href = DISCORD_URL;
    }
    return;
  }

  triggerTransition(DISCORD_URL);

  if (!opened) {
    setTimeout(() => {
      window.location.href = DISCORD_URL;
    }, 1400);
  }
};

/**
 * Componente Principal da Página
 * ================================
 * Renderiza a landing page do Cyber World com:
 * - Animação de matrix rain de fundo
 * - Rastreamento do mouse para efeitos parallax
 * - Seções com animações de reveal
 * - Stats ao vivo do Discord
 * - Integração com transições cyberpunk
 */
const Index = () => {
  // Estado do mouse para criar efeito parallax sutil no gradiente de fundo
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /**
   * useEffect: Rastreamento de Movimento do Mouse
   * ==============================================
   * Calcula a posição do mouse em valores normalizados (-10 a +10)
   * Aplica um multiplicador (20) para criar efeito subtil no gradiente de fundo
   * O gradiente se move levemente com o mouse, criando efeito de profundidade
   */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normaliza coordenadas (0-1) → (-0.5 a 0.5) → multiplica por 20
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouse({ x, y });
    };
    
    // Registra listener e remove ao desmontar
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        <MatrixRain />

        {/* Nav */}
        <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
          <div className="container flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-3 font-bold">
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden ring-2 ring-primary/50 animate-logo-subtle-pulse">
                <img src={logo} alt="Cyber World logo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/30 mix-blend-overlay" />
              </div>
              <div className="leading-tight">
                <div className="text-gradient text-xs md:text-sm">CYBER//WORLD</div>
                <div className="text-[9px] md:text-[10px] text-muted-foreground font-mono">root@nexus ~/</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-muted-foreground">
              <a href="#sobre" className="hover:text-foreground transition-colors">./sobre</a>
              <a href="#canais" className="hover:text-foreground transition-colors">./canais</a>
              <a href="#stack" className="hover:text-foreground transition-colors">./stack</a>
              <a href="#join" className="hover:text-foreground transition-colors">./join</a>
            </div>
            <Button onClick={handleJoin} size="sm" className="bg-gradient-primary hover:opacity-90 glow-primary text-xs md:text-sm px-3 md:px-4">
              Entrar <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-16 md:pt-20 grid-bg scanline">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background: "radial-gradient(circle at center, hsl(270 95% 30% / 0.4), transparent 60%)",
              transform: `translate(${mouse.x}px, ${mouse.y}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />

          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo destaque */}
              <div className="flex justify-center mb-6 md:mb-8 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-4 md:-inset-6 rounded-full bg-gradient-primary blur-3xl opacity-50 animate-pulse-glow" />
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden ring-2 ring-primary/60 animate-logo-subtle-pulse">
                    <img src={logo} alt="Cyber World" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 via-transparent to-secondary/50 mix-blend-overlay" />
                    <div className="absolute inset-0 scanline opacity-60" />
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full glass mb-4 md:mb-6 animate-fade-in">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs md:text-sm text-muted-foreground">hackers conectados em tempo real</span>
              </div>

              <h1
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-4 md:mb-6 animate-fade-in-up"
                style={{ animationDelay: "0.1s", opacity: 0 }}
              >
                <span className="block text-foreground/70 text-lg md:text-2xl lg:text-3xl font-mono mb-1 md:mb-2">{"// welcome to"}</span>
                <span className="relative inline-block">
                  <span
                    className="block text-gradient text-glow bg-[length:200%_auto] animate-gradient-shift"
                    style={{ backgroundImage: "linear-gradient(90deg, hsl(270 95% 65%), hsl(220 100% 60%), hsl(280 100% 75%), hsl(270 95% 65%))" }}
                  >
                    CYBER//WORLD
                  </span>
                  <span className="absolute -top-2 md:-top-3 -left-3 md:-left-4 text-xs font-mono text-primary/60">{"<h1>"}</span>
                  <span className="absolute -bottom-2 md:-bottom-3 -right-3 md:-right-4 text-xs font-mono text-primary/60">{"</h1>"}</span>
                </span>
              </h1>

              <div
                className="text-lg md:text-2xl text-muted-foreground mb-10 h-8 animate-fade-in-up"
                style={{ animationDelay: "0.4s", opacity: 0 }}
              >
                <span className="text-primary">$</span>{" "}
                <TypedText
                  phrases={[
                    "init dev_community --mode=elite",
                    "exploit knowledge --target=growth",
                    "compile friendships --lang=tech",
                    "deploy ideas --env=production",
                  ]}
                  className="text-foreground"
                />
              </div>

              <p
                className="max-w-2xl mx-auto text-muted-foreground mb-10 animate-fade-in-up"
                style={{ animationDelay: "0.6s", opacity: 0 }}
              >
                O servidor Discord da rapaziada tech.{" "}
                <span className="text-foreground">Devs full stack, hackers éticos, makers, estudantes de engenharia e robótica</span>{" "}
                construindo, quebrando e aprendendo juntos. Sem cringe. Sem gatekeeping.
              </p>

              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s", opacity: 0 }}
              >
                <Button onClick={handleJoin} size="lg" className="bg-gradient-primary hover:opacity-90 glow-primary animate-pulse-glow text-base h-12 px-8">
                  <Rocket className="w-5 h-5 mr-2" /> Entrar no servidor
                </Button>
                <Button asChild variant="outline" size="lg" className="glass border-primary/30 hover:border-primary text-base h-12 px-8">
                  <a href="#canais">
                    <Sparkles className="w-5 h-5 mr-2" /> Ver canais
                  </a>
                </Button>
              </div>

              <div className="hidden lg:block">
                <div className="absolute top-10 -left-10 glass rounded-xl p-4 w-56 animate-float" style={{ animationDelay: "0s" }}>
                  <div className="flex items-center gap-2 text-xs text-accent mb-2">
                    <Wifi className="w-3 h-3" /> conexão.segura
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    <div>SSH tunnel: <span className="text-primary">active</span></div>
                    <div>Latency: <span className="text-accent">12ms</span></div>
                  </div>
                </div>
                <div className="absolute top-32 -right-10 glass rounded-xl p-4 w-56 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="flex items-center gap-2 text-xs text-secondary mb-2">
                    <Lock className="w-3 h-3" /> auth.module
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    <div>0xDEADBEEF</div>
                    <div className="text-primary">[ ACCESS_GRANTED ]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs animate-pulse">
            ↓ scroll para hackear ↓
          </div>
        </section>

        {/* Marquee */}
        <div className="relative py-6 border-y border-border/50 overflow-hidden bg-card/30">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-2xl font-bold text-muted-foreground/60">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {["</> CODE", "🔐 HACK", "🤖 BUILD", "⚡ DEPLOY", "🧠 LEARN", "🚀 SHIP", "{ } STUDY", "// SHARE"].map((w, j) => (
                  <span key={j} className="flex items-center gap-12">
                    <span className="text-gradient">{w}</span>
                    <span className="text-primary">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Live Stats from Discord Widget */}
        <section id="sobre" className="py-24 relative">
          <div className="container">
            <Reveal>
              <div className="text-center mb-10">
                <div className="text-primary text-sm font-mono mb-2">{"// live_data --source=discord"}</div>
                <h2 className="text-3xl md:text-4xl font-black">
                  Dados do servidor <span className="text-gradient">em tempo real</span>
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <DiscordLiveStats guildId={DISCORD_GUILD_ID} />
            </Reveal>
            <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
              powered by discord widget api · ative o widget no painel do servidor para ver dados ao vivo
            </p>
          </div>
        </section>

        {/* Channels */}
        <section id="canais" className="py-16 md:py-24 relative">
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
                <div className="text-primary text-sm font-mono mb-3">{"<channels />"}</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4">
                  Os <span className="text-gradient">canais</span> que importam
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Espaços organizados por especialidade. Sem ruído, só conhecimento.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {channels.map((c, i) => (
                <Reveal key={c.name} delay={i * 80}>
                  <div className="group relative glass rounded-xl md:rounded-2xl p-4 md:p-6 h-full overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2">
                    <div className={`absolute -inset-px rounded-xl md:rounded-2xl bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-0`} />
                    <div className="relative z-10">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                        <c.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="font-mono text-sm text-primary mb-2">#{c.name}</div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                      <div className="mt-3 md:mt-4 text-xs text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        → entrar no canal
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stack / Terminal */}
        <section id="stack" className="py-16 md:py-24 relative">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <Reveal>
                <div className="text-primary text-sm font-mono mb-3">{"// stack"}</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                  Tudo que <span className="text-gradient">você curte</span>, em um só lugar
                </h2>
                <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                  De React a Rust, de Kali Linux a Kubernetes. CTFs semanais, hackathons internos,
                  code reviews ao vivo, sessões de estudo de engenharia e mentorias de quem já chegou lá.
                </p>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    { icon: Zap, label: "Hackathons mensais" },
                    { icon: Users, label: "Mentoria 1:1" },
                    { icon: Github, label: "Projetos open source" },
                    { icon: Shield, label: "CTFs semanais" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-2 md:gap-3 glass rounded-lg p-2 md:p-3 hover:border-primary/50 transition-colors">
                      <f.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-xs md:text-sm">{f.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="glass rounded-xl md:rounded-2xl overflow-hidden glow-primary">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-border/50 bg-card/50">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-destructive/70" />
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent/70" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono">~/cyber-world/welcome.sh</span>
                  </div>
                  <div className="p-4 md:p-6 font-mono text-xs md:text-sm space-y-1 md:space-y-2">
                    <div><span className="text-accent">$</span> <span className="text-primary">whoami</span></div>
                    <div className="text-muted-foreground pl-4">→ você, prestes a entrar na melhor comunidade tech</div>
                    <div><span className="text-accent">$</span> <span className="text-primary">cat</span> manifesto.txt</div>
                    <div className="text-muted-foreground pl-4 space-y-1">
                      <div><span className="text-secondary">[01]</span> conhecimento é livre, gatekeepers fora</div>
                      <div><span className="text-secondary">[02]</span> build em público, fail em público</div>
                      <div><span className="text-secondary">[03]</span> mentore alguém, seja mentorado</div>
                      <div><span className="text-secondary">[04]</span> respeito {">"} ego</div>
                    </div>
                    <div><span className="text-accent">$</span> <span className="text-primary">sudo join</span> --community=cyber-world</div>
                    <div className="text-accent pl-4 animate-pulse">[ ✓ READY TO CONNECT ]</div>
                    <div className="flex items-center"><span className="text-accent">$</span> <span className="ml-2 w-2 h-3 md:h-4 bg-primary animate-blink" /></div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="join" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />
          <div className="container px-4 md:px-6">
            <Reveal>
              <div className="relative max-w-4xl mx-auto text-center glass rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 overflow-hidden">
                <div className="absolute -top-20 md:-top-32 -left-20 md:-left-32 w-40 h-40 md:w-64 md:h-64 rounded-full opacity-50 blur-3xl animate-rotate-slow" style={{ background: "var(--gradient-primary)" }} />
                <div className="absolute -bottom-20 md:-bottom-32 -right-20 md:-right-32 w-40 h-40 md:w-64 md:h-64 rounded-full opacity-50 blur-3xl animate-rotate-slow" style={{ background: "var(--gradient-glow)", animationDirection: "reverse" }} />

                <div className="relative">
                  <div className="flex justify-center mb-4 md:mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden ring-2 ring-primary/60 animate-logo-subtle-pulse">
                      <img src={logo} alt="Cyber World" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4 md:mb-6">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-mono">conexão disponível</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6">
                    Pronto pra <span className="text-gradient">entrar no</span> CYBER//WORLD?
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-6 md:mb-10 text-sm md:text-base">
                    Entra de graça. Fica pela vibe. Cresce pela comunidade.
                    A próxima linha de código incrível pode sair de uma conversa no nosso voice.
                  </p>
                  <Button onClick={handleJoin} size="lg" className="bg-gradient-primary hover:opacity-90 glow-primary text-sm md:text-base h-12 md:h-14 px-6 md:px-10 animate-pulse-glow">
                    <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Entrar no Discord agora
                  </Button>
                  <div className="mt-4 md:mt-6 text-xs text-muted-foreground font-mono">
                    exec: ./join_cyber_world.sh — sem cadastro, sem fricção
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded overflow-hidden ring-1 ring-primary/40">
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-mono text-xs md:text-sm">cyber//world — built by hackers, for hackers</span>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-sm">
                <a
                  href="https://github.com/davy-miles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-mono">davy-miles</span>
                </a>
                <div className="font-mono">
                  <span className="text-accent">●</span> all systems operational
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Music Player */}
        <MusicPlayer />
      </div>
    </PageTransition>
  );
};

export default Index;
