# Arquitetura da Aplicação

## Visão Geral

A SaaS Platform é construída com uma arquitetura moderna, escalável e segura, seguindo princípios de clean code e separação de responsabilidades.

## Stack Tecnológico

### Frontend
- **Next.js 15**: Framework React com SSR/SSG integrado
- **TypeScript**: Type safety em toda a aplicação
- **Tailwind CSS**: Styling utilitário e responsivo
- **React Hook Form + Zod**: Validação de formulários tipada
- **Zustand**: Gerenciamento de estado leve

### Backend
- **Next.js Route Handlers**: API endpoints sem framework externo
- **Supabase**: PostgreSQL + Auth + RLS integrados
- **Row Level Security**: Segurança em nível de banco de dados

### Banco de Dados
- **PostgreSQL** (via Supabase)
- **RLS Policies**: Controle de acesso automático
- **Migrations**: Versionamento de schema

## Arquitetura de Pastas

```
app/
├── (auth)/                 # Rotas públicas de autenticação
│   ├── login/
│   ├── register/
│   └── layout.tsx
│
├── (dashboard)/            # Rotas protegidas
│   ├── page.tsx           # Dashboard principal
│   ├── help-desk/
│   ├── quiz/
│   ├── simulador/
│   ├── gerador-senhas/
│   ├── financeiro/
│   └── layout.tsx
│
└── api/                    # API endpoints
    ├── help-desk/
    │   ├── route.ts       # GET/POST
    │   └── [id]/route.ts  # GET/PATCH/DELETE
    └── ...

src/
├── components/
│   ├── ui/                # Componentes base (Button, Input, etc)
│   ├── auth/              # LoginForm, RegisterForm, etc
│   ├── common/            # Header, Sidebar, Footer
│   └── modules/           # Componentes por módulo
│
├── services/              # Lógica de negócio
│   ├── authService.ts
│   ├── helpDeskService.ts
│   └── ...
│
├── lib/
│   ├── supabase.ts        # Cliente Supabase
│   ├── validations.ts     # Schemas Zod
│   ├── env.ts             # Configuração
│   └── utils.ts           # Utilidades
│
├── hooks/
│   └── useAuth.ts         # Custom hooks
│
├── store/
│   └── userStore.ts       # Zustand store
│
├── types/
│   └── index.ts           # TypeScript types
│
├── middleware/
│   └── auth.ts            # Middleware de autenticação
│
└── styles/
    └── globals.css        # Estilos globais
```

## Fluxo de Dados

### Autenticação
```
User → Login Form
       ↓
   authService.login()
       ↓
   Supabase Auth
       ↓
   JWT Token + User Data
       ↓
   Zustand Store
       ↓
   Redirect /dashboard
```

### Criação de Ticket
```
User Input → CreateTicketForm
              ↓
          Validação (Zod)
              ↓
          helpDeskService.createTicket()
              ↓
          API POST /api/help-desk
              ↓
          Supabase RLS Check
              ↓
          INSERT into help_desk_tickets
              ↓
          Response + UI Update
```

## Security Measures

### 1. Autenticação
- Supabase Auth com JWT tokens
- Session management automático
- Email/Password ou OAuth

### 2. Autorização
- RLS (Row Level Security) no banco
- Middleware de autenticação
- ProtectedRoute component

### 3. Validação
- Zod schemas no frontend
- Validação dupla no backend
- Parametrized queries (Supabase)

### 4. Proteção de Dados
- Variáveis de ambiente (chaves secretas)
- CORS configurado
- Rate limiting (pronto para implementar)

## Escalabilidade

### Horizontal
- Stateless application (Next.js)
- Deploy em múltiplas instâncias
- CDN para assets (Vercel)

### Vertical
- Database indexes otimizados
- Query caching (Zustand)
- Component lazy loading

### Monitoramento
- Erro tracking (pronto para Sentry)
- Analytics (pronto para Vercel Analytics)
- Custom dashboards

## Performance

### Frontend
- Code splitting automático
- Image optimization
- CSS tree-shaking (Tailwind)
- Font optimization

### Backend
- Database connection pooling (Supabase)
- API response caching
- Query optimization

## Padrões de Código

### Componentes
```typescript
// Client component
'use client'

interface Props {
  data: string
  onSubmit: (value: string) => void
}

export function MyComponent({ data, onSubmit }: Props) {
  // ...
}
```

### Services
```typescript
// Lógica de negócio isolada
export const myService = {
  async getData(): Promise<ApiResponse<Data>> {
    // ...
  }
}
```

### Validação
```typescript
// Zod schemas
const schema = z.object({
  email: z.string().email(),
})

type Input = z.infer<typeof schema>
```

## Próximos Passos

1. **Stripe Integration**: Implementar pagamentos
2. **Testes**: Unit, Integration, E2E
3. **CI/CD**: GitHub Actions
4. **Monitoring**: Sentry, Analytics
5. **Performance**: Otimizações avançadas
