# Quick Reference & Best Practices

Guia rápido com dicas e boas práticas para desenvolvimento.

## Estrutura de Pastas - Localizar Arquivos

```
Preciso de um novo componente?
→ src/components/modules/meu-modulo/MeuComponente.tsx

Preciso de lógica de negócio?
→ src/services/meuService.ts

Preciso de um hook customizado?
→ src/hooks/useMeuHook.ts

Preciso de tipos TypeScript?
→ src/types/index.ts

Preciso de uma validação?
→ src/lib/validations.ts

Preciso de uma página?
→ app/(dashboard)/minha-page/page.tsx

Preciso de um endpoint API?
→ app/api/meu-recurso/route.ts
```

## Padrões de Código

### Criar Componente Cliente

```typescript
'use client'

import { useState } from 'react'

interface MyComponentProps {
  title: string
  onAction: (value: string) => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState<string>('')

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
```

### Usar Service

```typescript
import { myService } from '@/services/myService'

const response = await myService.getData()
if (response.success) {
  // Use response.data
}
```

### Validar Formulário

```typescript
import { createTicketSchema, type CreateTicketInput } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const { register, formState: { errors } } = useForm<CreateTicketInput>({
  resolver: zodResolver(createTicketSchema),
})
```

### Acessar Dados do Usuário

```typescript
import { useAuth } from '@/hooks/useAuth'

export function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) return <p>Não autenticado</p>

  return <p>Olá, {user?.full_name}</p>
}
```

## Supabase - Cheat Sheet

### Buscar Dados

```typescript
const { data, error } = await supabase
  .from('help_desk_tickets')
  .select('*')
  .eq('organization_id', orgId)
  .order('created_at', { ascending: false })
```

### Inserir Dados

```typescript
const { data, error } = await supabase
  .from('help_desk_tickets')
  .insert({ title, description, organization_id })
  .select()
  .single()
```

### Atualizar Dados

```typescript
const { data, error } = await supabase
  .from('help_desk_tickets')
  .update({ status: 'closed' })
  .eq('id', ticketId)
  .select()
  .single()
```

### Deletar Dados

```typescript
const { error } = await supabase
  .from('help_desk_tickets')
  .delete()
  .eq('id', ticketId)
```

## Tailwind CSS - Classes Comuns

```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Padding/Margin -->
<div class="p-4 mb-4 mt-2 px-6 py-3">

<!-- Text -->
<h1 class="text-3xl font-bold text-foreground">
<p class="text-sm text-muted-foreground">

<!-- Colors -->
<div class="bg-primary text-primary-foreground">
<div class="bg-secondary text-secondary-foreground">
<div class="bg-destructive text-destructive-foreground">

<!-- States -->
<button class="hover:bg-primary/90 disabled:opacity-50">
```

## Debugging

### Adicionar Logs

```typescript
console.log('[v0] Debug message:', value)
```

### Inspecionar Estado

```typescript
console.log('[v0] User state:', user)
console.log('[v0] Form errors:', formState.errors)
```

### Testar API

```bash
# Usar curl
curl -X GET http://localhost:3000/api/help-desk?organization_id=uuid

# Usar fetch no console
fetch('/api/help-desk?organization_id=uuid')
  .then(r => r.json())
  .then(d => console.log(d))
```

## Performance Tips

### Lazy Load Componentes

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <p>Carregando...</p> }
)
```

### Memoizar Componentes

```typescript
import { memo } from 'react'

const MyComponent = memo(({ data }: Props) => {
  return <div>{data}</div>
})
```

### Usar SWR para Fetch

```typescript
import useSWR from 'swr'

function MyComponent() {
  const { data, error, isLoading } = useSWR(
    '/api/help-desk?organization_id=id',
    fetcher
  )
}
```

## Security Checklist

- [ ] Nunca commitar .env.local
- [ ] Sempre validar input (Zod)
- [ ] Usar RLS no Supabase
- [ ] HTTPS em produção
- [ ] Rate limiting ativado
- [ ] Secrets em variáveis de ambiente
- [ ] Verificar CORS
- [ ] Validar JWT tokens

## Git Workflow

```bash
# Criar branch
git checkout -b feature/minha-feature

# Fazer mudanças
git add .
git commit -m "feat: descrição da mudança"

# Push
git push origin feature/minha-feature

# Criar PR no GitHub
```

## Testing

### Unit Test Exemplo

```typescript
// __tests__/utils.test.ts
import { formatCurrency } from '@/lib/utils'

describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(100)).toBe('R$ 100,00')
  })
})
```

### E2E Test Exemplo

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.fill('[name="email"]', 'test@test.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/dashboard')
})
```

## Deployment Checklist

- [ ] Variáveis de ambiente configuradas
- [ ] Build testado localmente (`npm run build`)
- [ ] Migrações aplicadas ao Supabase
- [ ] Domínio configurado
- [ ] SSL/HTTPS ativado
- [ ] Error tracking (Sentry) configurado
- [ ] Backups automáticos ativados
- [ ] Monitoring ativado

## Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Module not found" | Verificar importes, rodar `npm install` |
| "Type error" | Executar `npm run type-check` |
| "Build failed" | Ver erro completo, verificar sintaxe |
| "Auth not working" | Verificar .env.local, confirmar chaves |
| "Banco vazio" | Rodar migrations: `npm run db:push` |
| "Porta em uso" | `npm run dev -- -p 3001` |

## Recursos Úteis

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **TypeScript**: https://typescriptlang.org
- **Tailwind**: https://tailwindcss.com
- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs

## Contato & Suporte

- 🐛 Bug Report: GitHub Issues
- 💬 Discussões: GitHub Discussions
- 📧 Email: support@seu-dominio.com
- 🤝 Contribuições: Bem-vindas!
