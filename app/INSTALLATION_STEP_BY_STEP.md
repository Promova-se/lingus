# 📦 Guia Passo a Passo - Instalação e Configuração LINGUS com Supabase

Este guia detalha todos os passos para instalar as dependências e configurar o projeto com Supabase como banco de dados.

---

## ⚙️ PARTE 1: Pré-requisitos

### Passo 1.1 - Verificar se Node.js está instalado

Abra o terminal/prompt de comando e execute:

```bash
node --version
npm --version
```

**Resultado esperado:**
```
v18.17.0 (ou versão superior)
9.6.7 (ou versão superior)
```

**Se não tiver instalado:**
- Acesse: https://nodejs.org/
- Baixe a versão LTS (Long Term Support)
- Instale normalmente
- Reinicie o terminal

### Passo 1.2 - Criar conta no Supabase

1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Entre com GitHub, Google ou crie uma conta
4. Clique em **"New Project"**
5. Preencha os dados:
   - **Project name:** `lingus`
   - **Database Password:** Crie uma senha forte (guarde bem!)
   - **Region:** Escolha a região mais próxima (ex: South America - São Paulo)
6. Clique em **"Create new project"** e aguarde 2-3 minutos

**Importante:** Guarde a senha do banco de dados - você vai precisar!

---

## 📂 PARTE 2: Estrutura e Navegação

### Passo 2.1 - Abrir o terminal/prompt no diretório correto

**Windows (PowerShell ou CMD):**
```bash
cd C:\Users\[SeuUsuario]\Desktop\promova-se\lingus\app
```

**Mac/Linux:**
```bash
cd ~/Desktop/promova-se/lingus/app
```

Verifique se você está no diretório correto com:
```bash
pwd  # Mac/Linux
cd   # Windows (mostra o caminho atual)
```

Você deve ver uma estrutura assim:
```
app/
├── frontend/
├── backend/
└── docs/
```

### Passo 2.2 - Verificar os arquivos

Para listar os arquivos, execute:

**Windows:**
```bash
dir
```

**Mac/Linux:**
```bash
ls -la
```

Você deve ver as pastas `frontend` e `backend`.

---

## 🎨 PARTE 3: Instalar Dependências do Frontend

### Passo 3.1 - Navegar até a pasta frontend

```bash
cd frontend
```

Verifique que você está no diretório correto:
```bash
pwd  # Mac/Linux - deve mostrar: .../app/frontend
cd   # Windows
```

### Passo 3.2 - Verificar o arquivo package.json

O arquivo já deve estar criado. Para visualizar:

```bash
# Mac/Linux
cat package.json

# Windows (PowerShell)
type package.json
```

### Passo 3.3 - Instalar as dependências

```bash
npm install
```

**O que vai acontecer:**
- Será criada uma pasta `node_modules/` (pode levar 2-5 minutos)
- Um arquivo `package-lock.json` será criado
- Você verá mensagens de download de pacotes

**Resultado esperado:**
```
added 250+ packages, and audited 251 packages in 2m 30s
```

### Passo 3.4 - Verificar a instalação

```bash
npm list react
```

Você deve ver algo como:
```
lingus-frontend@0.1.0 /Users/.../lingus/app/frontend
└── react@18.2.0
```

✅ **Frontend instalado com sucesso!**

### Passo 3.5 - Criar arquivo de configuração do frontend

Crie um arquivo chamado `.env.local` na pasta `frontend`:

**Windows (PowerShell):**
```bash
New-Item -Name ".env.local" -Type File
```

**Mac/Linux:**
```bash
touch .env.local
```

Abra o arquivo com um editor de texto (VSCode, Notepad, etc) e adicione:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

**Nota:** Você preencherá as chaves do Supabase no Passo 5.

---

## 🔧 PARTE 4: Instalar Dependências do Backend

### Passo 4.1 - Voltar para a pasta app

```bash
cd ..
```

Verifique que você está de volta em `app/`:
```bash
pwd  # Mac/Linux - deve mostrar: .../app
```

### Passo 4.2 - Navegar até a pasta backend

```bash
cd backend
```

### Passo 4.3 - Instalar as dependências

```bash
npm install
```

**O que vai acontecer:**
- Será criada uma pasta `node_modules/` (pode levar 3-5 minutos)
- Um arquivo `package-lock.json` será criado

**Resultado esperado:**
```
added 150+ packages, and audited 151 packages in 3m 45s
```

### Passo 4.4 - Verificar a instalação

```bash
npm list express
```

Você deve ver:
```
lingus-backend@0.1.0 /Users/.../lingus/app/backend
└── express@4.18.2
```

✅ **Backend instalado com sucesso!**

### Passo 4.5 - Criar arquivo .env para o backend

Copie o arquivo `.env.example`:

**Windows (PowerShell):**
```bash
Copy-Item .env.example -Destination .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

Abra o arquivo `.env` com um editor de texto e atualize com:

```env
# Server
NODE_ENV=development
PORT=5000

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua_chave_de_serviço_aqui
SUPABASE_ANON_KEY=sua_chave_anon_aqui

# JWT
JWT_SECRET=sua_chave_super_secreta_mudar_em_producao_12345
JWT_EXPIRE=7d

# Stripe (opcional por enquanto)
STRIPE_SECRET_KEY=sk_test_sua_chave
STRIPE_PUBLIC_KEY=pk_test_sua_chave

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Nota:** Você preencherá as chaves do Supabase no Passo 5.

---

## 🔑 PARTE 5: Configurar Supabase

### Passo 5.1 - Acessar o dashboard do Supabase

1. Vá para: https://supabase.com/dashboard
2. Selecione o projeto `lingus` que você criou
3. Você deve estar na aba **Home**

### Passo 5.2 - Obter as chaves de API

1. No menu lateral, clique em **Settings** (⚙️)
2. Clique em **API** (no submenu)
3. Você verá duas seções:

**Project API Keys:**
- **anon public** - Copie esta chave
- **service_role** - Copie esta chave também

**Copie as URLs e chaves:**
```
Project URL: https://seu-projeto.supabase.co
Anon Key: eyJhbGc...
Service Key: eyJhbGc... (maior e diferente da anon)
```

### Passo 5.3 - Atualizar arquivo .env do frontend

Abra `frontend/.env.local` e atualize com as chaves do Passo 5.2:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (a chave anon)
```

### Passo 5.4 - Atualizar arquivo .env do backend

Abra `backend/.env` e atualize:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=eyJhbGc... (a chave service_role - a maior)
SUPABASE_ANON_KEY=eyJhbGc... (a chave anon)
JWT_SECRET=qualquer_string_aleatoria_aqui_123456789
```

---

## 🗄️ PARTE 6: Criar Tabelas no Supabase

### Passo 6.1 - Acessar o SQL Editor

1. No dashboard do Supabase
2. Clique em **SQL Editor** (no menu lateral)
3. Clique em **New Query**

### Passo 6.2 - Criar tabela de usuários

Cole o seguinte SQL e clique em **Run**:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('school', 'teacher')),
  bio TEXT,
  phone VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  avatar_url VARCHAR(500),
  rating DECIMAL(3,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_user_type_idx ON users(user_type);
CREATE INDEX users_created_at_idx ON users(created_at DESC);
```

### Passo 6.3 - Criar tabela de pedidos de trabalho

Cole o seguinte SQL e clique em **Run**:

```sql
CREATE TABLE job_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES users(id),
  subject VARCHAR(100) NOT NULL,
  grade VARCHAR(50) NOT NULL,
  hours_per_week INTEGER NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed', 'cancelled')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices
CREATE INDEX job_requests_school_id_idx ON job_requests(school_id);
CREATE INDEX job_requests_subject_idx ON job_requests(subject);
CREATE INDEX job_requests_status_idx ON job_requests(status);
CREATE INDEX job_requests_created_at_idx ON job_requests(created_at DESC);
```

### Passo 6.4 - Criar tabela de aplicações

Cole e execute:

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_request_id UUID NOT NULL REFERENCES job_requests(id),
  teacher_id UUID NOT NULL REFERENCES users(id),
  proposal TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  match_score INTEGER,
  submitted_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices
CREATE INDEX applications_job_request_id_idx ON applications(job_request_id);
CREATE INDEX applications_teacher_id_idx ON applications(teacher_id);
CREATE INDEX applications_status_idx ON applications(status);
```

### Passo 6.5 - Habilitar RLS (Row Level Security)

Para cada tabela criada, habilite RLS:

1. Vá para **Authentication** (menu lateral)
2. Clique em **Policies**
3. Para cada tabela, clique em **Enable RLS** (você fará isso depois)

Por enquanto, deixe como está para desenvolvimento.

---

## ✅ VERIFICAÇÃO: Testar a Instalação

### Teste 1 - Verificar Frontend

Abra um terminal na pasta `frontend`:

```bash
cd /caminho/para/lingus/app/frontend
npm run dev
```

**Resultado esperado:**
```
  VITE v4.2.0  ready in 300 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Abra no navegador: http://localhost:3000

Você deve ver a página home do LINGUS com o botão "Cadastro" em verde.

✅ **Parar com:** `Ctrl + C`

### Teste 2 - Verificar Backend

Abra outro terminal na pasta `backend`:

```bash
cd /caminho/para/lingus/app/backend
npm run dev
```

**Resultado esperado:**
```
✅ Server running on port 5000
Environment: development
```

Abra no navegador: http://localhost:5000/api/health

Você deve ver:
```json
{
  "status": "Server is running"
}
```

✅ **Parar com:** `Ctrl + C`

---

## 🚀 PARTE 7: Iniciar o Projeto

Agora que tudo está instalado, para iniciar o projeto:

### Terminal 1 - Backend

```bash
cd /caminho/para/lingus/app/backend
npm run dev
```

### Terminal 2 - Frontend (em outro terminal)

```bash
cd /caminho/para/lingus/app/frontend
npm run dev
```

### Acessar a aplicação

Abra o navegador em: **http://localhost:3000**

---

## 🐛 Troubleshooting - Soluções para Problemas Comuns

### ❌ "npm: command not found"

**Problema:** Node.js não foi instalado corretamente

**Solução:**
1. Acesse: https://nodejs.org/
2. Baixe e instale a versão LTS
3. Reinicie o terminal
4. Execute: `node --version`

### ❌ "EACCES: permission denied"

**Problema:** Permissão negada ao instalar

**Solução (Mac/Linux):**
```bash
sudo npm install -g npm@latest
npm cache clean --force
rm -rf node_modules
npm install
```

### ❌ "npm ERR! ERESOLVE unable to resolve dependency tree"

**Problema:** Conflito de versões de pacotes

**Solução:**
```bash
npm install --legacy-peer-deps
```

### ❌ "Cannot find module 'react'"

**Problema:** Dependências não foram instaladas

**Solução:**
```bash
rm -rf node_modules
npm install
```

### ❌ Porta 3000 ou 5000 já está em uso

**Problema:** Outro programa está usando a porta

**Solução (Windows):**
```bash
netstat -ano | findstr :3000
taskkill /PID <numero_que_apareceu> /F
```

**Solução (Mac/Linux):**
```bash
lsof -ti :3000 | xargs kill -9
```

---

## 📚 Próximos Passos

1. ✅ Dependências instaladas
2. ✅ Supabase configurado
3. ✅ Variáveis de ambiente configuradas
4. 📝 Agora você pode:
   - Criar componentes no frontend
   - Implementar rotas no backend
   - Conectar ao banco de dados Supabase
   - Adicionar autenticação
   - Criar features do app

---

## 💡 Dicas Importantes

- **Sempre use `.env` para variáveis sensíveis**
- **Nunca commit `.env` ou `node_modules/` no Git**
- **Mantenha `npm install` atualizado:** `npm update`
- **Para ver versões dos pacotes:** `npm list`
- **Limpe cache se tiver problemas:** `npm cache clean --force`

---

**Sucesso! 🎉 Seu projeto LINGUS está pronto para desenvolvimento!**
