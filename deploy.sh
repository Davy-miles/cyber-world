#!/bin/bash

# Cyber World Deploy Script
# ========================
# Script automatizado para deploy no GitHub Pages
# Uso: ./deploy.sh [--dev] [--force]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logo
echo -e "${CYAN}"
echo "    ╔══════════════════════════════════════════════════════════════╗"
echo "    ║                                                              ║"
echo "    ║    ███╗   ██╗███████╗██╗    ██╗      █████╗ ██████╗ ██╗   ║"
echo "    ║    ████╗  ██║██╔════╝██║    ██║     ██╔══██╗██╔══██╗██║   ║"
echo "    ║    ██╔██╗ ██║█████╗  ██║ █╗ ██║     ███████║██████╔╝██║   ║"
echo "    ║    ██║╚██╗██║██╔══╝  ██║███╗██║     ██╔══██║██╔═══╝ ██║   ║"
echo "    ║    ██║ ╚████║███████╗╚███╔███╔╝     ██║  ██║██║     ██║   ║"
echo "    ║    ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝      ╚═╝  ╚═╝╚═╝     ╚═╝   ║"
echo "    ║                                                              ║"
echo "    ║                    CYBER//WORLD DEPLOY                      ║"
echo "    ║                                                              ║"
echo "    ╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Parse arguments
MODE="production"
FORCE="false"

for arg in "$@"; do
    case $arg in
        --dev)
            MODE="development"
            shift
            ;;
        --force)
            FORCE="true"
            shift
            ;;
        --help|-h)
            echo "Uso: ./deploy.sh [OPÇÕES]"
            echo ""
            echo "Opções:"
            echo "  --dev      Build em modo development (mais rápido, não otimizado)"
            echo "  --force    Força rebuild mesmo se não há mudanças"
            echo "  --help     Mostra esta ajuda"
            echo ""
            echo "Exemplos:"
            echo "  ./deploy.sh           # Deploy produção normal"
            echo "  ./deploy.sh --dev      # Deploy development"
            echo "  ./deploy.sh --force    # Força rebuild"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Opção desconhecida: $arg${NC}"
            echo "Use --help para ver opções disponíveis"
            exit 1
            ;;
    esac
done

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vite.config.ts" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto cyber-world${NC}"
    exit 1
fi

# Check git status
if [ "$FORCE" = "false" ]; then
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠️  Você tem mudanças não commitadas:${NC}"
        git status --short
        echo ""
        read -p "$(echo -e ${YELLOW}Deseja continuar mesmo assim? [y/N]: ${NC})" -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}ℹ️  Deploy cancelado. Commit suas mudanças primeiro.${NC}"
            exit 0
        fi
    fi
fi

# Show deployment info
echo -e "${BLUE}📋 Informações do Deploy:${NC}"
echo -e "   🌐 Modo: ${CYAN}$MODE${NC}"
echo -e "   📁 Output: ${CYAN}dist/${NC}"
echo -e "   🔗 URL: ${CYAN}https://davy-miles.github.io/cyber-world/${NC}"
echo ""

# Step 1: Clean previous build
echo -e "${YELLOW}🧹 Limpando build anterior...${NC}"
rm -rf dist/
echo -e "${GREEN}✅ Build anterior removido${NC}"

# Step 2: Install dependencies (if needed)
if [ ! -d "node_modules" ] || [ "$FORCE" = "true" ]; then
    echo -e "${YELLOW}📦 Instalando dependências...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependências instaladas${NC}"
else
    echo -e "${BLUE}ℹ️  Dependências já instaladas${NC}"
fi

# Step 3: Build
echo -e "${YELLOW}🔨 Build do projeto (modo: $MODE)...${NC}"
if [ "$MODE" = "development" ]; then
    npm run build:dev
else
    npm run build
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
else
    echo -e "${RED}❌ Build falhou!${NC}"
    exit 1
fi

# Step 4: Show build stats
echo -e "${BLUE}📊 Estatísticas do Build:${NC}"
if [ -d "dist" ]; then
    echo -e "   📁 Tamanho total: ${CYAN}$(du -sh dist | cut -f1)${NC}"
    echo -e "   📄 Arquivos: ${CYAN}$(find dist -type f | wc -l)${NC}"
    
    # Show largest files
    echo -e "   📈 Maiores arquivos:"
    find dist -type f -exec ls -lh {} \; | sort -rh -k 5 | head -3 | while read -r line; do
        echo -e "      ${CYAN}$line${NC}"
    done
fi

# Step 5: Git operations
echo -e "${YELLOW}🚀 Preparando deploy...${NC}"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  Você não está na branch 'main' (atual: $CURRENT_BRANCH)${NC}"
    read -p "$(echo -e ${YELLOW}Deseja fazer push para $CURRENT_BRANCH mesmo assim? [y/N]: ${NC})" -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ️  Mude para branch main com: git checkout main${NC}"
        exit 0
    fi
fi

# Add, commit and push
echo -e "${YELLOW}📝 Commitando mudanças...${NC}"
git add .
git commit -m "🚀 Deploy: $(date '+%Y-%m-%d %H:%M:%S') | Mode: $MODE"

echo -e "${YELLOW}📤 Push para GitHub...${NC}"
git push origin $CURRENT_BRANCH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Push realizado com sucesso!${NC}"
else
    echo -e "${RED}❌ Push falhou!${NC}"
    exit 1
fi

# Step 6: GitHub Pages Configuration Check
echo ""
echo -e "${YELLOW}⚙️  Verificando configuração GitHub Pages...${NC}"
echo -e "${BLUE}📋 CONFIGURAÇÃO MANUAL NECESSÁRIA:${NC}"
echo -e "   1. 🌐 Acesse: https://github.com/davy-miles/cyber-world/settings/pages"
echo -e "   2. 📡 Source: Selecione ${CYAN}Deploy from a branch${NC}"
echo -e "   3. 🌿 Branch: Selecione ${CYAN}gh-pages${NC} / ${CYAN}(root)${NC}"
echo -e "   4. 💾 Save e aguarde 2-3 minutos"
echo ""

# Step 7: Final message
echo -e "${GREEN}🎉 Deploy iniciado com sucesso!${NC}"
echo -e "${BLUE}📌 Workflow GitHub Actions vai criar branch gh-pages automaticamente${NC}"
echo -e "${CYAN}🔗 Monitorar: https://github.com/davy-miles/cyber-world/actions${NC}"
echo -e "${CYAN}🌐 Site: https://davy-miles.github.io/cyber-world/${NC}"
echo ""

# Show next steps
echo -e "${BLUE}📋 Próximos passos:${NC}"
echo -e "   1. ⚙️  Configure GitHub Pages (acima)"
echo -e "   2. ⏱️  Aguardar workflow (2-5 minutos)"
echo -e "   3. 🔍 Verificar branch gh-pages criada"
echo -e "   4. 🌐 Acessar site quando publicado"
echo -e "   5. 🐛 Problemas? Verifique Actions tab"
echo ""

echo -e "${GREEN}✨ CYBER//WORLD branch deploy concluído! ✨${NC}"
