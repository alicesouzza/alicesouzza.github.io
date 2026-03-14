# Database Setup - Supabase

Guia completo para configurar o Supabase para o projeto SaaS Platform.

## Pré-requisitos

- Conta Supabase (https://supabase.com)
- Supabase CLI instalado

## Passos para Setup

### 1. Criar Projeto Supabase

1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha os dados:
   - Name: `saas-platform`
   - Database Password: (salve em local seguro)
   - Region: (escolha mais próximo)
4. Aguarde a criação (pode levar alguns minutos)

### 2. Configurar Variáveis de Ambiente

Após criar o projeto, vá em "Settings" > "API":

```bash
cp .env.example .env.local
```

Copie para `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave Anon Key

### 3. Aplicar Migrações

Usando Supabase CLI:

```bash
supabase db push
```

Ou manualmente via SQL Editor do Supabase:

1. Vá em "SQL Editor"
2. Execute os scripts em ordem:
   - `supabase/migrations/001_init_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_seed_data.sql`

### 4. Configurar Autenticação

#### Email/Password Authentication

1. Vá em "Authentication" > "Providers"
2. Habilite "Email" (padrão)
3. Clique em "Email" e configure:
   - Confirme a autenticação por email se desejar
   - Redefina configurações se necessário

#### (Opcional) Outros Provedores

Você pode habilitar provedores como:
- Google
- GitHub
- Microsoft
- LinkedIn

## Estrutura do Banco de Dados

### Tabelas Principais

#### `organizations`
Workspace/organização do usuário.
- Suporta múltiplos usuários
- Plano de assinatura
- Armazenamento e limites

#### `users`
Usuários autenticados vinculados às organizações.
- Roles: admin, user, support
- Metadados de perfil
- Rastreamento de data

#### `help_desk_tickets`
Tickets de suporte gerenciados.
- Prioridade (low, medium, high)
- Status (open, in_progress, closed)
- Atribuição a usuários

#### `quiz_responses`
Respostas de quizzes para análise.
- Rastreamento de performance
- Análise de acertos/erros

#### `financial_transactions`
Transações financeiras registradas.
- Tipo (income, expense)
- Organização associada
- Histórico completo

#### `subscriptions`
Assinaturas ativas de planos.
- Vinculação Stripe
- Período de cobrança
- Status de pagamento

## Row Level Security (RLS)

O projeto usa RLS para garantir segurança:

- Usuários só veem dados de suas organizações
- Tickets: visíveis para membros da organização
- Transações: privadas por usuário/organização
- Políticas automáticas por role

## Backup e Restore

### Backup Automático
Supabase faz backups automáticos. Acesse em:
- Settings > Database > Backups

### Backup Manual
```bash
supabase db dump > backup.sql
```

### Restore
```bash
supabase db restore < backup.sql
```

## Troubleshooting

### Erro: "NEXT_PUBLIC_SUPABASE_URL not set"
Certifique-se de que `.env.local` existe e tem as variáveis.

### RLS Policies não funcionam
1. Verifique se RLS está habilitado
2. Aguarde alguns minutos para políticas se propaguarem
3. Teste no SQL Editor

### Autenticação não funciona
1. Verifique se email/password está habilitado
2. Confirme as variáveis de ambiente
3. Verifique os logs em Authentication > Logs

## Documentação Oficial

- https://supabase.com/docs/guides/database
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/reference/sql/functions
