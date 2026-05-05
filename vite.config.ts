import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Vite Configuration
 * ==================
 * Configura o build, servidor dev e otimizações do projeto
 * 
 * Funcionalidades:
 * - React SWC: compilador mais rápido que Babel
 * - Path alias: importa com @ em vez de paths relativos
 * - Component Tagger: debug em desenvolvimento
 * - Deduplicação: evita múltiplas versões do mesmo pacote
 */
export default defineConfig(({ mode }) => ({
  // Base path para GitHub Pages - BRANCH DEPLOY
  // Para project sites: base: '/repo-name/'
  // Para user sites: base: '/'
  // Seu repo: cyber-world → base: '/cyber-world/'
  base: '/cyber-world/',
  
  /**
   * Servidor de Desenvolvimento
   * ===========================
   * host: "::" - IPv6, acessível de qualquer interface
   * port: 8080 - porta customizada
   * hmr.overlay: false - desativa overlay de erros do vite (usamos custom)
   */
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  
  /**
   * Build Configuration
   * ===================
   * Otimizações para produção
   */
  build: {
    // Minifica com terser (mais eficiente que esbuild)
    minify: 'terser',
    // Source maps: false para reduzir tamanho (true para debug remoto)
    sourcemap: false,
    // Limite de warning para chunks grandes
    chunkSizeWarningLimit: 1000,
  },
  
  // Plugins: React + Component Tagger (dev only)
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  
  /**
   * Module Resolution
   * ==================
   * @ = src/ para imports limpos
   * dedupe = evita duplicatas de dependências no bundle
   */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
