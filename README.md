# SaaS Platform

Plataforma SaaS escalável com múltiplos módulos integrados.

## Features

- ✅ Autenticação com Supabase
- ✅ Multi-tenant com organizações
- ✅ Help Desk para suporte
- ✅ Sistema de Quiz
- ✅ Simulador de PC
- ✅ Gerador de Senhas
- ✅ Controle Financeiro
- ✅ Sistema de Pagamentos (Stripe)
- ✅ RBAC (Role-Based Access Control)
- ✅ Row Level Security (RLS)

## Setup Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase
- Conta Stripe (opcional)

### Instalação

```bash
# Clonar repositório
git clone <repo>
cd saas-platform

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar migrações
npm run db:push

# Iniciar dev server
npm run dev
```

## Estrutura do Projeto

```
project-root/
├── app/                 # Next.js app directory
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # Serviços de API
│   ├── lib/             # Utilitários
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript types
│   ├── store/           # Zustand stores
│   ├── middleware/      # Middlewares
│   └── styles/          # Estilos globais
├── supabase/            # Migrações e seeds
├── public/              # Assets estáticos
└── tests/               # Testes
```

## Roadmap

### Fase 1: MVP
- [x] Setup Next.js e Supabase
- [ ] Autenticação
- [ ] Dashboard básico
- [ ] Help Desk

### Fase 2: Funcionalidades
- [ ] Quiz
- [ ] Simulador
- [ ] Financeiro
- [ ] Senhas

### Fase 3: Monetização
- [ ] Planos
- [ ] Stripe integration
- [ ] Billing dashboard

### Fase 4: Enterprise
- [ ] API pública
- [ ] Webhooks
- [ ] Multi-org
