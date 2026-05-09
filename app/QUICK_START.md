# 🚀 Quick Start - Do Zero ao Rodando em 5 Minutos

Você já está na pasta `app`. Vamos colocar para rodar agora!

---

## ✅ Passo 1: Copiar as Chaves do Supabase (2 min)

### Obter as chaves:

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto `lingus`
3. Menu lateral → **Settings** (⚙️)
4. Clique em **API**
5. Copie:
   - **Project URL:** `https://seu-projeto.supabase.co`
   - **anon public:** (chave menor)
   - **service_role:** (chave maior)

**Salve essas 3 informações!**

---

## ✅ Passo 2: Configurar Backend (1 min)

No terminal (já está na pasta `app`):

```bash
cd backend
```

Criar arquivo `.env`:

```bash
type .env.example > .env
```

Abra o arquivo `.env` com qualquer editor (VSCode, Notepad, etc) e atualize:

```env
NODE_ENV=development
PORT=5000

SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sk_seu_service_role_key_aqui_copie_a_maior
SUPABASE_ANON_KEY=eyJhbGc...sua_anon_key_copie_a_menor

JWT_SECRET=qualquer_coisa_aleatoria_123456789
JWT_EXPIRE=7d

STRIPE_SECRET_KEY=sk_test_123
STRIPE_PUBLIC_KEY=pk_test_123

FRONTEND_URL=http://localhost:3000
```

**Salve o arquivo!**

---

## ✅ Passo 3: Instalar Dependências Backend (3-5 min)

Ainda na pasta `backend`:

```bash
npm install
```

Aguarde até ver:
```
added XXX packages in Xm Xs
```

---

## ✅ Passo 4: Configurar Frontend (1 min)

Abra **outro terminal** na mesma pasta e:

```bash
cd app/frontend
```

Criar arquivo `.env.local`:

```bash
New-Item -Name ".env.local" -ItemProperty @{Value=""} -Force
```

Abra o arquivo `.env.local` e adicione:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...sua_anon_key_copie_a_menor
```

**Salve o arquivo!**

---

## ✅ Passo 5: Instalar Dependências Frontend (3-5 min)

Ainda no terminal da pasta `frontend`:

```bash
npm install
```

Aguarde até ver:
```
added XXX packages in Xm Xs
```

---

## ✅ Passo 6: Criar Tabelas no Supabase (3 min)

1. Acesse: https://supabase.com/dashboard
2. Seu projeto → **SQL Editor**
3. Clique em **New Query**
4. Cole este SQL:

```sql
-- Criar tabela de usuários
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

CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_user_type_idx ON users(user_type);

-- Criar tabela de pedidos de trabalho
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

CREATE INDEX job_requests_school_id_idx ON job_requests(school_id);
CREATE INDEX job_requests_status_idx ON job_requests(status);

-- Criar tabela de aplicações
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

CREATE INDEX applications_job_request_id_idx ON applications(job_request_id);
CREATE INDEX applications_teacher_id_idx ON applications(teacher_id);
```

5. Clique em **Run**
6. Aguarde aparecer "✓ Success"

---

## ✅ Passo 7: RODAR O PROJETO! 🎉

### Terminal 1 (Backend):
```bash
cd C:\Users\allan\Desktop\promova-se\lingus\app\backend
npm run dev
```

Você deve ver:
```
✅ Server running on port 5000
Environment: development
```

### Terminal 2 (Frontend):
```bash
cd C:\Users\allan\Desktop\promova-se\lingus\app\frontend
npm run dev
```

Você deve ver:
```
  VITE v4.2.0  ready in 300 ms

  ➜  Local:   http://localhost:3000/
```

### Abra o navegador:
**http://localhost:3000**

---

## ✨ Pronto! Você deve ver:

✅ Página inicial do LINGUS
✅ Botão "Cadastro" em verde
✅ Navbar com logo LINGUS
✅ Footer

---

## 🐛 Se der erro:

### ❌ "Cannot find module"
```bash
# Delete node_modules e reinstale
rm -r node_modules
npm install
```

### ❌ "SUPABASE_URL is required"
Verifique se os valores em `.env` (backend) e `.env.local` (frontend) estão corretos
- Não pode ter espaços extras
- A URL deve começar com `https://`

### ❌ "Porta 3000 ou 5000 já está em uso"
```bash
netstat -ano | findstr :3000
taskkill /PID <numero> /F
```

### ❌ "SQL Error"
Verifique se:
- As chaves estão corretas
- O SQL foi colado corretamente (sem espaços extras)
- Cada comando SQL está bem formado

---

## 📱 Testar a Aplicação

1. Vá para http://localhost:3000
2. Clique em "Cadastro"
3. Escolha "Sou Escola" ou "Sou Professor"
4. Preencha os dados
5. Clique em "Cadastrar"

Após clicar, verifique em https://supabase.com se a tabela `users` recebeu o novo registro!

---

## 🎯 Próximas Features para Adicionar

- [ ] Integrar registro com Supabase
- [ ] Integrar login com JWT
- [ ] Dashboard de escolas
- [ ] Dashboard de professores
- [ ] Sistema de matching
- [ ] Sistema de pagamento (Stripe)

---

**Pronto? Bora lá! 🚀**
