# 🌐 CYBER//WORLD

> **Landing page cyberpunk para comunidade tech Discord**  
> Built with React, Vite, TailwindCSS e shadcn/ui

## 🚀 Deploy Status

[![Deploy to GitHub Pages](https://github.com/davy-miles/cyber-world/actions/workflows/deploy.yml/badge.svg)](https://github.com/davy-miles/cyber-world/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/live-site-blue?style=flat-square)](https://davy-miles.github.io/cyber-world/)

## ✨ Funcionalidades

### 🎨 Design & Animações
- **Tema Cyberpunk**: Gradientes neon, efeitos glow, glassmorphism
- **Animações Avançadas**: Matrix rain background, transições suaves, efeitos de glitch
- **Responsivo Total**: Mobile-first design com breakpoints otimizados
- **Efeitos Interativos**: Hover states, parallax mouse tracking, loading animations

### 🎵 Player de Música
- **Visualizador Animado**: Barras de áudio que reagem à música
- **Controles Completos**: Play/pause, next/previous, shuffle, repeat
- **Playlist Integrada**: Múltiplas faixas com navegação fácil
- **Volume Control**: Slider customizado com feedback visual

### 💬 Integração Discord
- **Live Stats**: Membros online em tempo real via Widget API
- **Canais Destaque**: Seção especializada por tecnologia
- **Call-to-Action**: Botões com transições animadas para o servidor

## 🛠️ Stack Tecnológico

```json
{
  "frontend": {
    "framework": "React 18.3.1",
    "bundler": "Vite 5.4.21",
    "styling": "TailwindCSS 3.4.17",
    "components": "shadcn/ui",
    "icons": "Lucide React",
    "router": "React Router DOM",
    "state": "TanStack Query"
  },
  "build": {
    "minification": "Terser",
    "target": "ES2020",
    "optimization": "Tree-shaking + Code splitting"
  }
}
```

## 🚀 Deploy Automático

O projeto está configurado para **GitHub Pages** com CI/CD automatizado:

1. **Trigger**: Push para branch `main`
2. **Build**: `npm run build` (otimizado para produção)
3. **Deploy**: GitHub Pages via GitHub Actions
4. **URL**: `https://davy-miles.github.io/cyber-world/`

### Configuração do Deploy

- **Base URL**: `/cyber-world/` (configurado em `vite.config.ts`)
- **Workflow**: `.github/workflows/deploy.yml`
- **Permissões**: Pages write + ID token (OIDC)
- **Cache**: npm dependencies aceleram builds

## 📁 Estrutura do Projeto

```
cyber-world/
├── src/
│   ├── components/          # Componentes React
│   │   ├── MusicPlayer.tsx  # 🎵 Player animado
│   │   ├── MatrixRain.tsx   # 🌧️ Background animado
│   │   ├── DiscordLiveStats.tsx  # 📊 Stats do Discord
│   │   ├── PageTransition.tsx    # 🎬 Transições cyberpunk
│   │   ├── TypedText.tsx    # ⌨️ Efeito de digitação
│   │   └── Reveal.tsx       # 👁️ Scroll animations
│   ├── pages/               # Páginas principais
│   ├── assets/              # Imagens e recursos
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilitários
│   └── index.css           # Estilos globais + animações
├── .github/workflows/       # CI/CD configuration
├── dist/                    # Build output
└── public/                  # Static assets
```

## 🎮 Como Usar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar: http://localhost:8080
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Preview local do build
npm run preview
```

### Deploy Manual

```bash
# Fazer deploy (via GitHub Actions)
git push main  # Automático!

# ou manualmente
npm run build
# Upload pasta /dist para GitHub Pages
```

## ⚙️ Configurações Importantes

### Discord Widget API

Para funcionar, o servidor Discord precisa ter:

1. **Server Settings → Widget → Enable Server Widget**: ✅ ON
2. **Server ID**: `1499736443860422686`
3. **Widget URL**: `https://discord.com/api/guilds/1499736443860422686/widget.json`

### Variáveis de Ambiente

```typescript
// src/pages/Index.tsx
const DISCORD_GUILD_ID = "1499736443860422686";
const DISCORD_URL = "https://discord.gg/3TqHTUJMcw";
```

## 🎨 Customização

### Cores e Tema

As cores cyberpunk estão definidas em `src/index.css`:

```css
:root {
  --primary: 270 95% 65%;      /* Roxo neon */
  --secondary: 220 100% 60%;   /* Azul cyber */
  --accent: 180 100% 60%;      /* Ciano tech */
}
```

### Animações

Todas as animações são CSS-based para performance:

- `animate-gradient-shift`: Gradientes animados
- `animate-logo-spin-glow`: Logo 3D com glow
- `animate-glitch`: Efeito glitch cyberpunk
- `animate-float`: Elementos flutuantes

## 🐛 Troubleshooting

### Build Issues

- **Node version**: Use Node 18+ (configurado no workflow)
- **Dependencies**: `npm audit fix` para vulnerabilidades
- **Memory**: Aumente `NODE_OPTIONS=--max-old-space-size=4096` se necessário

### Discord Widget Não Funciona?

1. Verifique se o widget está ativado no servidor
2. Confirme o Server ID está correto
3. Teste a API: `curl https://discord.com/api/guilds/YOUR_ID/widget.json`

### GitHub Pages 404?

1. Verifique `base: '/cyber-world/'` no `vite.config.ts`
2. Confirme branch `gh-pages` em Settings > Pages
3. Limpe cache do navegador

## 🤝 Contribuição

1. Fork o projeto
2. Crie branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m "Add: nova feature cyberpunk"`
4. Push: `git push origin feature/nova-funcionalidade`
5. Pull Request

## 📄 Licença

MIT License - livre para uso pessoal e comercial

---

**Built with ❤️ by the Cyber World community**  
`// root@nexus:~$ ./deploy_cyber_world.sh --mode=production`
