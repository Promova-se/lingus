# 🚀 Deploy LINGUS no Netlify

Guia passo a passo para fazer deploy do frontend no Netlify.

---

## ✅ Pré-requisitos

- Conta no Netlify (https://netlify.com)
- Conta no GitHub (recomendado)
- Backend rodando em produção (ou usar uma URL de staging)

---

## 📋 PASSO 1: Preparar o Projeto Local

### 1.1 - Verificar se tudo está funcionando

```bash
cd frontend
npm run dev
```

Acesse http://localhost:3000 e teste todas as páginas.

### 1.2 - Atualizar a variável de ambiente

Se ainda não tiver `.env.local`, crie com:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://gnqeimbnvhqexmprkcmo.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_qUaZhLgwWi9q8eKlSQ2h8g_bMIRKbkt
```

**Para produção**, será:
```env
VITE_API_URL=https://seu-backend.com/api
VITE_SUPABASE_URL=https://gnqeimbnvhqexmprkcmo.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_qUaZhLgwWi9q8eKlSQ2h8g_bMIRKbkt
```

---

## 📦 PASSO 2: Fazer Build Local

```bash
cd frontend
npm run build
```

**Resultado esperado:**
```
✓ 1234 modules transformed
✓ built in 45.23s
```

Será criada uma pasta `dist/` com os arquivos prontos para deploy.

---

## 🐙 PASSO 3: Push para GitHub (Recomendado)

Se ainda não tiver repositório:

```bash
cd ../..
git init
git add .
git commit -m "LINGUS - Plataforma de contratação de professores"
git remote add origin https://github.com/seu-usuario/lingus.git
git push -u origin main
```

Se já tem:
```bash
git add .
git commit -m "Otimização mobile e preparação para deploy"
git push
```

---

## 🌐 PASSO 4: Deploy no Netlify

### Opção A: Via GitHub (Recomendado)

1. Acesse https://netlify.com
2. Clique em **"New site from Git"**
3. Conecte com GitHub
4. Selecione seu repositório `lingus`
5. Configure:
   - **Base directory:** `app/frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

6. Clique em **"Deploy"**

### Opção B: Drag & Drop

1. Acesse https://netlify.com
2. Clique em **"Deploy manually"**
3. Arraste a pasta `dist/` gerada no build

---

## 🔧 PASSO 5: Configurar Variáveis de Ambiente

No Netlify:

1. Vá para seu site → **Site Settings** → **Build & Deploy** → **Environment**
2. Clique em **"Edit variables"**
3. Adicione:
   ```
   VITE_API_URL = https://seu-backend.com/api
   VITE_SUPABASE_URL = https://gnqeimbnvhqexmprkcmo.supabase.co
   VITE_SUPABASE_ANON_KEY = sb_publishable_qUaZhLgwWi9q8eKlSQ2h8g_bMIRKbkt
   ```

---

## 📝 PASSO 6: Configurar Domain (Opcional)

1. Vá para **Site Settings** → **Domain management**
2. Clique em **"Add domain"**
3. Use um domínio já criado ou compre um através do Netlify

---

## ✨ PASSO 7: Criar arquivo netlify.toml (Opcional)

Crie na raiz do projeto:

```toml
[build]
  base = "app/frontend"
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_API_URL = "https://seu-backend.com/api"
  VITE_SUPABASE_URL = "https://gnqeimbnvhqexmprkcmo.supabase.co"
  VITE_SUPABASE_ANON_KEY = "sb_publishable_qUaZhLgwWi9q8eKlSQ2h8g_bMIRKbkt"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🧪 PASSO 8: Testar Deploy

1. Vá para a URL fornecida pelo Netlify (ex: `lingus-app.netlify.app`)
2. Teste:
   - ✅ Página inicial carrega
   - ✅ Cadastro funciona
   - ✅ Login funciona
   - ✅ Dashboards carregam
   - ✅ Responsivo em mobile (abra DevTools F12)

---

## 🔄 PASSO 9: Configurar Deploy Automático

Se usou GitHub:

1. Qualquer `git push` para `main` fará deploy automático
2. Vá para **Deploy** → **Deploy log** para ver o status
3. Verifique se o build passou

---

## 🐛 Troubleshooting

### ❌ "Build failed"

**Solução:**
```bash
rm -rf node_modules
npm install
npm run build
```

### ❌ "Cannot find module"

**Solução:**
- Verifique se todas as dependências estão em `package.json`
- No Netlify, vá em **Deploy settings** e refaça o deploy

### ❌ "Blank page ou 404"

**Solução:**
- Adicione o arquivo `netlify.toml` (veja PASSO 7)
- Isso redireciona rotas para `index.html` (SPA)

### ❌ "API não responde"

**Solução:**
- Verifique `VITE_API_URL` no environment
- Certifique-se que o backend está acessível públicamente

---

## 📊 Checklist Final

- [ ] Build local funciona (`npm run build`)
- [ ] Pasta `dist/` foi gerada
- [ ] Repositório GitHub criado
- [ ] Site criado no Netlify
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy completou com sucesso
- [ ] Site abre e funciona em produção
- [ ] Responsivo em mobile (F12 → toggle device)
- [ ] Todas as páginas carregam
- [ ] API responde corretamente

---

## 🎉 Pronto!

Seu app LINGUS está online! 🚀

**URL do Site:** https://seu-site.netlify.app

---

## 📞 Próximos Passos

- [ ] Customizar domínio
- [ ] Configurar Analytics
- [ ] Implementar CI/CD mais avançado
- [ ] Adicionar testes
- [ ] Fazer deploy do backend
