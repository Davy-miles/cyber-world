# 🚀 GitHub Pages Setup - Guia Completo

## 📋 Pré-requisitos
- ✅ Workflow configurado (já feito)
- ✅ Código no GitHub (já feito)
- ⚠️ **Configurar Pages manualmente** (precisa fazer agora)

---

## 🔧 Passo 1: Acessar Settings do Repositório

1. Vá para: https://github.com/davy-miles/cyber-world
2. Clique na aba **"Settings"** (última aba no topo)
3. No menu lateral esquerdo, role até **"Pages"** (seção "Code and automation")

---

## ⚙️ Passo 2: Configurar GitHub Pages

### Configuração Correta:
```
Build and deployment
├── Source: GitHub Actions
└── (não selecione "Deploy from a branch")
```

**IMPORTANTE**:
- ✅ **SELECIONE** "GitHub Actions"
- ❌ **NÃO** selecione "Deploy from a branch"

### Por que GitHub Actions?
- Nosso workflow `.github/workflows/deploy.yml` já faz tudo
- Build automático com Vite
- Deploy direto via GitHub Pages
- Melhor performance e confiabilidade

---

## 🎯 Passo 3: Verificar Configuração

Após selecionar "GitHub Actions":

1. **GitHub Pages link**: Aparecerá um link verde no topo
   ```
   🌐 Your site is published at https://davy-miles.github.io/cyber-world/
   ```

2. **Workflow status**: Role para baixo para ver workflows
   - Deve mostrar "Deploy to GitHub Pages (Actions)" como ativo

---

## 🔄 Passo 4: Verificar Workflow

1. Vá para: https://github.com/davy-miles/cyber-world/actions
2. Procure o workflow "Deploy to GitHub Pages (Actions)"
3. Deve estar **✅ verde** (sucesso) ou **🟡 amarelo** (executando)

### Se estiver vermelho ❌:
- Clique no workflow para ver erros
- Geralmente é problema de permissões ou build

---

## 🔐 Passo 5: Verificar Permissões

Se o workflow falhar, verifique permissões:

1. **Settings > Actions > General**
2. **Workflow permissions**:
   ```
   ✅ Read and write permissions
   ```

3. **Save changes**

---

## ⏱️ Passo 6: Aguardar Deploy

Primeiro deploy pode demorar **5-10 minutos**:

1. **Actions tab**: Monitore o progresso
2. **Pages tab**: Aguardar link aparecer
3. **Teste**: Acesse https://davy-miles.github.io/cyber-world/

---

## 🐛 Troubleshooting Comum

### Erro 1: "Pages not found"
```
❌ 404 Site not found
```
**Solução**:
- Verifique se selecionou "GitHub Actions" em Settings > Pages
- Aguarde o workflow terminar (pode demorar 10 min)

### Erro 2: "Tela branca"
```
❌ White screen
```
**Solução**:
- Verifique se o `base` no `vite.config.ts` está correto: `'/cyber-world/'`
- Verifique se o `BrowserRouter` no `App.tsx` tem `basename="/cyber-world/"`
- Abra o console do navegador (F12) para ver erros JavaScript

### Erro 3: "Build falha"
```
❌ Build failed
```
**Solução**:
- Vá para Actions tab e clique no workflow vermelho
- Verifique os logs de erro
- Geralmente é problema de dependências ou sintaxe

### Erro 2: "Workflow failed"
```
❌ Permission denied
```
**Solução**:
- Settings > Actions > General
- Ative "Read and write permissions"
- Re-run o workflow falhado

### Erro 3: "Blank page"
```
❌ Página carrega mas fica em branco
```
**Solução**:
- Abra DevTools (F12)
- Verifique Console para erros
- Geralmente é erro de caminho (base URL)

---

## 🎯 Verificação Final

Quando tudo estiver funcionando:

### ✅ Checklist:
- [ ] Settings > Pages > Source = "GitHub Actions"
- [ ] Workflow "Deploy to GitHub Pages" = ✅ verde
- [ ] Link do site aparece em Pages
- [ ] Site acessível em https://davy-miles.github.io/cyber-world/
- [ ] Player de música funciona
- [ ] Discord stats aparecem
- [ ] Animações rodam

### 🔍 Testes:
1. **Desktop**: Abrir em Chrome/Firefox
2. **Mobile**: Testar no celular (responsivo)
3. **Console**: F12 > Console - sem erros
4. **Network**: F12 > Network - 200 OK para todos os arquivos

---

## 🚀 Deploy Automático (Futuro)

Depois de configurado uma vez, todo push automático:

```bash
# Qualquer mudança
git add .
git commit -m "Nova feature"
git push main

# 🎉 Deploy automático em 2-3 minutos!
```

---

## 📱 Links Úteis

- **Seu site**: https://davy-miles.github.io/cyber-world/
- **Actions**: https://github.com/davy-miles/cyber-world/actions
- **Settings**: https://github.com/davy-miles/cyber-world/settings
- **Pages**: https://github.com/davy-miles/cyber-world/settings/pages

---

## 🆘 Ajuda

Se algo der errado:
1. **Print do erro** (printscreen)
2. **Link do workflow** (Actions > clique no failed workflow)
3. **Console errors** (F12 > Console)

Pode me mostrar que ajudo a resolver!

---

**🎯 Resumo**: Vá em Settings > Pages > selecione "GitHub Actions" > salve > aguarde!
