# Setup Guide - SaaS Platform

Guia passo a passo para configurar o projeto localmente.

## Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm
- Git
- Conta Supabase (https://supabase.com)
- Conta Stripe (opcional, para pagamentos)

## Instalação Rápida

```bash
# 1. Clonar repositório
git clone <seu-repo>
cd saas-platform

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local

# 4. Editar .env.local com suas credenciais

# 5. Executar migrações do banco
npm run db:push

# 6. Iniciar dev server
npm run dev
```

Acesse `http://localhost:3000`

## Configuração Detalhada

### Passo 1: Clonar Repositório

```bash
git clone https://github.com/seu-usuario/saas-platform.git
cd saas-platform
```

### Passo 2: Instalar Dependências

```bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm
pnpm install
```

### Passo 3: Configurar Supabase

1. Criar conta em https://supabase.com
2. Criar novo projeto
3. Aguardar criação (5-10 minutos)
4. Ir em Settings > API
5. Copiar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Passo 4: Variáveis de Ambiente

Criar arquivo `.env.local`:

```bash
cp .env.example .env.local
```

Editar `.env.local` e adicionar:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Stripe (opcional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Passo 5: Executar Migrações

```bash
# Push do schema atual
npm run db:push

# Ou usar Supabase CLI
supabase db push
```

### Passo 6: Iniciar Servidor

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Primeiro Acesso

1. Ir para http://localhost:3000
2. Clique em "Cadastrar"
3. Preencha email, nome e senha
4. Será redirecionado para login
5. Faça login com as credenciais
6. Acesse o Dashboard

## Estrutura de Pastas

```
saas-platform/
├── app/                    # Next.js App Router
├── src/
│   ├── components/         # Componentes React
│   ├── services/          # Serviços de API
│   ├── lib/               # Utilitários e config
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   ├── store/             # Zustand stores
│   └── styles/            # CSS global
├── supabase/
│   └── migrations/        # Migrações SQL
├── docs/                  # Documentação
├── public/                # Assets estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server
npm run build           # Build para produção
npm run start           # Inicia servidor de produção
npm run lint            # Lint do código
npm run type-check      # Verificação TypeScript

# Database
npm run db:push         # Push de schema ao Supabase
npm run db:migrate      # Cria migration
npm run db:seed         # Seed de dados

# Troubleshooting
npm install             # Reinstala dependências
npm cache clean --force # Limpa cache npm
```

## Troubleshooting

### Erro: "NEXT_PUBLIC_SUPABASE_URL not set"

**Solução**: Verifique se `.env.local` existe e tem a variável.

```bash
cat .env.local  # Verificar conteúdo
```

### Erro: "Autenticação falhou"

**Solução**: 
1. Verifique NEXT_PUBLIC_SUPABASE_ANON_KEY
2. Confirme que email/password está habilitado em Supabase Auth
3. Verifique os logs em Supabase > Authentication > Logs

### Erro: "Connection refused"

**Solução**:
1. Supabase pode estar offline
2. Verifique conexão de internet
3. Teste em https://status.supabase.com

### Erro ao rodar migrações

**Solução**:
```bash
# Tentar novamente
npm run db:push

# Ou usar SQL Editor do Supabase manualmente
```

### Porta 3000 já em uso

**Solução**:
```bash
# Usar outra porta
npm run dev -- -p 3001
```

## Desenvolvimento

### Adicionar Nova Página

```bash
# Criar arquivo
touch app/(dashboard)/minha-pagina/page.tsx
```

```typescript
// app/(dashboard)/minha-pagina/page.tsx
export default function MinhaPage() {
  return <div>Conteúdo</div>
}
```

### Adicionar Novo Componente

```bash
mkdir -p src/components/modules/meu-modulo
touch src/components/modules/meu-modulo/MeuComponente.tsx
```

### Adicionar Novo Hook

```bash
touch src/hooks/useMeuHook.ts
```

```typescript
export function useMeuHook() {
  // Hook logic
}
```

### Adicionar Validação

```typescript
// Editar src/lib/validations.ts
export const meuSchema = z.object({
  // ...
})
```

## Testing (Futuro)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## Deployment

Ver [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## Documentação Adicional

- [Arquitetura](./docs/ARCHITECTURE.md)
- [Database](./docs/DATABASE.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Stripe Integration](./docs/STRIPE_INTEGRATION.md)

## Suporte

- Abra uma issue no GitHub
- Envie email para support@seu-dominio.com
- Slack/Discord da comunidade

## Licença

MIT

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
