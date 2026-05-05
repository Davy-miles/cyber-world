# 🚀 GitHub Pages Branch Deploy - Guia Automatizado

## ⚡ **Configuração Automática Completa**

Tudo já foi configurado para você! Apenas **2 passos manuais**:

---

## 🔧 **Passo 1: Configurar GitHub Pages (2 minutos)**

1. **Acesse**: https://github.com/davy-miles/cyber-world/settings/pages
2. **Build and deployment**:
   ```
   Source: Deploy from a branch ⬇️
   Branch: gh-pages / (root) ⬇️
   ```
3. **Save** ✅

---

## 🚀 **Passo 2: Deploy Automático**

Execute o script (ou faça push manual):

```bash
# Deploy automático com script
./deploy.sh

# Ou push manual
git add .
git commit -m "Deploy"
git push main
```

---

## 🔄 **Como Funciona a Automação**

### **Workflow GitHub Actions** (.github/workflows/deploy.yml):
```
Push para main 
    ↓
Trigger workflow automático
    ↓
npm install (cache acelerado)
    ↓
npm run build (otimizado)
    ↓
Deploy para branch gh-pages
    ↓
GitHub Pages publica gh-pages
    ↓
Site online! 🌐
```

### **Vite Config** (vite.config.ts):
```typescript
base: '/cyber-world/'  // ✅ Já configurado
```

---

## 📊 **Status Atual**

### ✅ **Configurado Automaticamente:**
- [x] Workflow GitHub Actions
- [x] Permissões (contents: write)
- [x] Build otimizado
- [x] Base path correto
- [x] Deploy script
- [x] Branch gh-pages automática

### ⚠️ **Ação Manual Necessária:**
- [ ] Settings > Pages > Source: "Deploy from a branch"
- [ ] Branch: "gh-pages" / "(root)"

---

## 🎯 **Deploy em 3 Passos**

### **Opção 1: Script Automático**
```bash
./deploy.sh --force
```

### **Opção 2: Git Push**
```bash
git add .
git commit -m "🚀 New feature"
git push main
```

### **Opção 3: GitHub UI**
1. Commit no GitHub
2. Actions tab para monitorar
3. Aguardar 2-3 minutos

---

## 🔍 **Monitoramento**

### **Links Úteis:**
- **Site**: https://davy-miles.github.io/cyber-world/
- **Actions**: https://github.com/davy-miles/cyber-world/actions
- **Settings**: https://github.com/davy-miles/cyber-world/settings/pages
- **Branches**: https://github.com/davy-miles/cyber-world/branches

### **O que Monitorar:**
1. **Actions tab**: Workflow ✅ verde?
2. **Branches tab**: gh-pages criada?
3. **Pages tab**: Site publicado?
4. **Site**: Carrega corretamente?

---

## 🐛 **Troubleshooting**

### **Workflow Falha ❌**
```bash
# Verificar:
1. Actions tab > ver erro
2. Geralmente é permissão ou dependência
3. Re-run workflow manualmente
```

### **Branch gh-pages Não Aparece**
```bash
# Aguardar workflow terminar
# Se falhar, verificar permissions:
Settings > Actions > General > Workflow permissions
```

### **Site 404**
```bash
# Verificar:
1. Settings > Pages > Source = "Deploy from a branch"
2. Branch = "gh-pages" / "(root)"
3. Aguardar 2-3 minutos após workflow
```

### **CSS/JS Não Carrega**
```bash
# Verificar vite.config.ts:
base: '/cyber-world/'  // ✅ Correto

# Se for user site, mudar para:
base: '/'
```

---

## ⚡ **Performance Otimizada**

### **Build Stats:**
- **JS**: 335KB → 105KB (gzipped)
- **CSS**: 69KB → 12KB (gzipped)
- **Total**: 524KB → 117KB (gzipped)

### **Cache Automático:**
- **npm cache**: Acelera installs
- **GitHub Actions cache**: Reutiliza dependências
- **Browser cache**: Headers otimizados

---

## 🎉 **Vantagens do Branch Deploy**

### **vs GitHub Actions (antes):**
- ❌ Complexo, múltiplos jobs
- ❌ Permissões complexas (OIDC)
- ❌ Debug difícil

### **vs Branch Deploy (agora):**
- ✅ Simples, 1 job só
- ✅ Permissões simples (contents: write)
- ✅ Debug fácil
- ✅ Branch visível no GitHub
- ✅ Rollback fácil (git checkout)

---

## 🔄 **Deploy Futuro**

Depois de configurado uma vez:

```bash
# Qualquer mudança = deploy automático
git add .
git commit -m "Nova feature"
git push main

# 🎉 2-3 minutos e está online!
```

---

## 🆘 **Ajuda**

Se algo der errado:

1. **Print do erro** (Settings > Pages)
2. **Link do workflow** (Actions > failed workflow)
3. **Console errors** (F12 > Console)

**Me mostra que ajudo a resolver!**

---

## 📋 **Checklist Final**

- [ ] Settings > Pages > Source: "Deploy from a branch"
- [ ] Branch: "gh-pages" / "(root)"
- [ ] Push para main
- [ ] Workflow ✅ verde
- [ ] Branch gh-pages criada
- [ ] Site acessível
- [ ] Funcionalidades testadas

---

**🚀 Resumo: Configure Settings > Pages e faça push! O resto é automático!**
