# Deployment Guide

Guia completo para fazer deploy da SaaS Platform em produção.

## Prerequisitos

- GitHub com repositório configurado
- Vercel account (https://vercel.com)
- Supabase project configurado
- Stripe account (opcional, para pagamentos)

## Passo 1: Preparar o Repositório

### 1.1 Adicionar arquivos importantes

```bash
# Certifique-se que tem estes arquivos
- .env.example          # Variáveis de exemplo
- .gitignore           # Arquivos a ignorar
- README.md            # Documentação
- package.json         # Dependências
```

### 1.2 Push para GitHub

```bash
git add .
git commit -m "Initial SaaS Platform setup"
git push origin main
```

## Passo 2: Deploy no Vercel

### 2.1 Conectar Repositório

1. Acesse https://vercel.com
2. Clique em "New Project"
3. Selecione seu repositório GitHub
4. Configure as variáveis de ambiente

### 2.2 Variáveis de Ambiente

Na dashboard do Vercel, adicione:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
STRIPE_SECRET_KEY=your_secret_key
```

### 2.3 Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Seu app estará disponível em `*.vercel.app`

## Passo 3: Configurar Domínio

### 3.1 Adicionar Domínio Personalizado

1. Vá em "Settings" > "Domains"
2. Clique em "Add"
3. Insira seu domínio
4. Configure DNS records conforme instruções

## Passo 4: Configurar Email (Opcional)

Para confirmação de email e notifications:

1. Supabase > Authentication > Email Templates
2. Configure templates personalizados
3. Configure provider externo (SendGrid, Mailgun, etc)

## Passo 5: Monitoramento

### 5.1 Configurar Error Tracking

**Sentry**:
1. Criar account em https://sentry.io
2. Criar projeto Next.js
3. Instalar SDK:
   ```bash
   npm install @sentry/nextjs
   ```
4. Configurar `next.config.ts`

### 5.2 Analytics

**Vercel Analytics**:
1. Dashboard Vercel > Analytics
2. Habilitado por padrão
3. Ver Web Vitals

## Checklist de Deployment

- [ ] Variáveis de ambiente configuradas
- [ ] Supabase migrations rodadas
- [ ] RLS policies habilitadas
- [ ] Domínio configurado
- [ ] SSL/HTTPS funcionando
- [ ] Email configurado
- [ ] Stripe integrado (se necessário)
- [ ] Error tracking ativo
- [ ] Analytics ativo
- [ ] Backups do banco configurados

## Production Best Practices

### 1. Segurança

```bash
# Use variáveis de ambiente para tudo sensível
# Nunca commite .env.local
# Ative CORS apropriadamente
# Configure rate limiting
# Use HTTPS apenas
```

### 2. Performance

```bash
# Otimize imagens
# Minimize bundle size
# Cache estratégico
# Database indexes
# CDN para assets
```

### 3. Confiabilidade

```bash
# Backups automáticos
# Monitoring 24/7
# Error logging
# Uptime tracking
# Disaster recovery plan
```

## Troubleshooting

### Erro: "Build failed"
- Verifique a saída do build
- Certifique-se que TypeScript está correto
- Verifique imports/exports

### Erro: "Database connection error"
- Verifique NEXT_PUBLIC_SUPABASE_URL
- Confirme IP whitelist do Supabase
- Teste conexão em SQL Editor

### Erro: "Auth not working"
- Verifique NEXT_PUBLIC_SUPABASE_ANON_KEY
- Confirme provider email habilitado
- Teste em Supabase Auth page

## Rollback

Se precisar reverter um deploy:

```bash
# No Vercel dashboard:
1. Vá em Deployments
2. Selecione deploy anterior
3. Clique em "Promote to Production"
```

## Escalabilidade Futura

### Multi-Region Replication
- Supabase oferece replication cross-region
- Configure em database settings

### Read Replicas
- Para leitura de dados em volume
- Configure em Supabase

### Caching
- Upstash Redis para caching distribuído
- Implement cache-aside pattern

### Background Jobs
- Pg_cron para jobs agendados
- Bull para queue processing

## Documentação Útil

- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Stripe Integration: https://stripe.com/docs
