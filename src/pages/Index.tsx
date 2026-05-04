import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Code2, Shield, Cpu, Bot, Terminal, Users, Zap, Github,
  ChevronRight, Lock, Wifi, Database, Rocket, Sparkles
} from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import TypedText from "@/components/TypedText";
import Reveal from "@/components/Reveal";

const DISCORD_URL = "https://discord.gg/your-invite";

const channels = [
  { icon: Code2, name: "dev-fullstack", desc: "React, Node, Python, Go — code reviews, pair programming e projetos open source.", color: "from-purple-500 to-blue-500" },
  { icon: Shield, name: "cybersec-lab", desc: "CTFs semanais, write-ups, pentest, OSINT e hardening de sistemas.", color: "from-blue-500 to-cyan-400" },
  { icon: Bot, name: "robotica-iot", desc: "Arduino, ESP32, Raspberry Pi, ROS — do circuito ao deploy.", color: "from-fuchsia-500 to-purple-500" },
  { icon: Cpu, name: "engenharia", desc: "Cálculo, simulações, hardware design e estudos colaborativos.", color: "from-purple-600 to-indigo-500" },
  { icon: Terminal, name: "shell-zone", desc: "Linux, dotfiles, neovim, terminais e produtividade dev.", color: "from-indigo-500 to-blue-600" },
  { icon: Database, name: "data-ai", desc: "ML, LLMs, data engineering e pipelines em produção.", color: "from-violet-500 to-purple-600" },
];

const stats = [
  { value: "5.2K+", label: "Membros ativos" },
  { value: "120+", label: "Canais técnicos" },
  { value: "24/7", label: "Comunidade online" },
  { value: "300+", label: "Projetos open source" },
];

const Index = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MatrixRain />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold">
            <div className="w-8 h-8 rounded-md bg-gradient-primary glow-primary flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-gradient">root@nexus</span>
            <span className="text-muted-foreground hidden sm:inline">~/</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#sobre" className="hover:text-foreground transition-colors">./sobre</a>
            <a href="#canais" className="hover:text-foreground transition-colors">./canais</a>
            <a href="#stack" className="hover:text-foreground transition-colors">./stack</a>
            <a href="#join" className="hover:text-foreground transition-colors">./join</a>
          </div>
          <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 glow-primary">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer">Entrar <ChevronRight className="w-4 h-4 ml-1" /></a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 grid-bg scanline">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background: "radial-gradient(circle at center, hsl(270 95% 30% / 0.4), transparent 60%)",
            transform: `translate(${mouse.x}px, ${mouse.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground">5.247 hackers conectados agora</span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s", opacity: 0 }}
            >
              <span className="block text-foreground/80">Bem-vindo ao</span>
              <span
                className="block text-gradient text-glow bg-[length:200%_auto] animate-gradient-shift"
                style={{ backgroundImage: "linear-gradient(90deg, hsl(270 95% 65%), hsl(220 100% 60%), hsl(280 100% 75%), hsl(270 95% 65%))" }}
              >
                NEXUS//TECH
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
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 glow-primary animate-pulse-glow text-base h-12 px-8">
                <a href={DISCORD_URL} target="_blank" rel="noreferrer">
                  <Rocket className="w-5 h-5 mr-2" /> Entrar no servidor
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass border-primary/30 hover:border-primary text-base h-12 px-8">
                <a href="#canais">
                  <Sparkles className="w-5 h-5 mr-2" /> Ver canais
                </a>
              </Button>
            </div>

            {/* Floating cards */}
            <div className="hidden lg:block">
              <div
                className="absolute top-10 -left-10 glass rounded-xl p-4 w-56 animate-float"
                style={{ animationDelay: "0s" }}
              >
                <div className="flex items-center gap-2 text-xs text-accent mb-2">
                  <Wifi className="w-3 h-3" /> conexão.segura
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  <div>SSH tunnel: <span className="text-primary">active</span></div>
                  <div>Latency: <span className="text-accent">12ms</span></div>
                </div>
              </div>
              <div
                className="absolute top-32 -right-10 glass rounded-xl p-4 w-56 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
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

      {/* Stats */}
      <section id="sobre" className="py-24 relative">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="glass rounded-2xl p-6 text-center hover:border-primary/60 transition-all hover:-translate-y-1 hover:glow-primary">
                  <div className="text-3xl md:text-5xl font-black text-gradient mb-1">{s.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section id="canais" className="py-24 relative">
        <div className="container">
          <Reveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="text-primary text-sm font-mono mb-3">{"<channels />"}</div>
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                Os <span className="text-gradient">canais</span> que importam
              </h2>
              <p className="text-muted-foreground">
                Espaços organizados por especialidade. Sem ruído, só conhecimento.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <div className="group relative glass rounded-2xl p-6 h-full overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-2">
                  <div
                    className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-0`}
                  />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                      <c.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-mono text-sm text-primary mb-2">#{c.name}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                    <div className="mt-4 text-xs text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
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
      <section id="stack" className="py-24 relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="text-primary text-sm font-mono mb-3">{"// stack"}</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Tudo que <span className="text-gradient">você curte</span>, em um só lugar
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                De React a Rust, de Kali Linux a Kubernetes. CTFs semanais, hackathons internos,
                code reviews ao vivo, sessões de estudo de engenharia e mentorias de quem já chegou lá.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Zap, label: "Hackathons mensais" },
                  { icon: Users, label: "Mentoria 1:1" },
                  { icon: Github, label: "Projetos open source" },
                  { icon: Shield, label: "CTFs semanais" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3 glass rounded-lg p-3 hover:border-primary/50 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{f.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="glass rounded-2xl overflow-hidden glow-primary">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-accent/70" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">~/nexus/welcome.sh</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div><span className="text-accent">$</span> <span className="text-primary">whoami</span></div>
                  <div className="text-muted-foreground pl-4">→ você, prestes a entrar na melhor comunidade tech</div>
                  <div><span className="text-accent">$</span> <span className="text-primary">cat</span> manifesto.txt</div>
                  <div className="text-muted-foreground pl-4 space-y-1">
                    <div><span className="text-secondary">[01]</span> conhecimento é livre, gatekeepers fora</div>
                    <div><span className="text-secondary">[02]</span> build em público, fail em público</div>
                    <div><span className="text-secondary">[03]</span> mentore alguém, seja mentorado</div>
                    <div><span className="text-secondary">[04]</span> respeito {">"} ego</div>
                  </div>
                  <div><span className="text-accent">$</span> <span className="text-primary">sudo join</span> --community=nexus</div>
                  <div className="text-accent pl-4 animate-pulse">[ ✓ READY TO CONNECT ]</div>
                  <div className="flex items-center"><span className="text-accent">$</span> <span className="ml-2 w-2 h-4 bg-primary animate-blink" /></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />
        <div className="container">
          <Reveal>
            <div className="relative max-w-4xl mx-auto text-center glass rounded-3xl p-12 md:p-16 overflow-hidden">
              <div
                className="absolute -top-32 -left-32 w-64 h-64 rounded-full opacity-50 blur-3xl animate-rotate-slow"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div
                className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full opacity-50 blur-3xl animate-rotate-slow"
                style={{ background: "var(--gradient-glow)", animationDirection: "reverse" }}
              />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-mono">conexão disponível</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Pronto pra <span className="text-gradient">se conectar</span>?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                  Entra de graça. Fica pela vibe. Cresce pela comunidade.
                  A próxima linha de código incrível pode sair de uma conversa no nosso voice.
                </p>
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 glow-primary text-base h-14 px-10 animate-pulse-glow">
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer">
                    <Rocket className="w-5 h-5 mr-2" />
                    Entrar no Discord agora
                  </a>
                </Button>
                <div className="mt-6 text-xs text-muted-foreground font-mono">
                  exec: ./join_nexus.sh — sem cadastro, sem fricção
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono">nexus//tech — built by hackers, for hackers</span>
          </div>
          <div className="font-mono text-xs">
            <span className="text-accent">●</span> all systems operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
