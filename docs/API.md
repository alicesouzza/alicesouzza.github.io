# API Reference

Documentação de referência rápida para todos os endpoints da API.

## Authentication

### POST /api/auth/login
Fazer login com email e senha.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "User Name",
      "role": "user",
      "organization_id": "org-uuid"
    },
    "token": "jwt-token"
  }
}
```

### POST /api/auth/register
Registrar novo usuário.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "User Name"
}
```

**Response:** Mesmo formato de login

### POST /api/auth/logout
Fazer logout (destrói sessão).

## Help Desk

### GET /api/help-desk?organization_id=org-id
Listar tickets.

**Query Parameters:**
- `organization_id` (required): UUID da organização

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Problema com login",
      "description": "Não consigo fazer login",
      "status": "open",
      "priority": "high",
      "created_at": "2024-03-13T10:30:00Z"
    }
  ]
}
```

### POST /api/help-desk
Criar novo ticket.

**Request:**
```json
{
  "organization_id": "org-uuid",
  "user_id": "user-uuid",
  "title": "Título do ticket",
  "description": "Descrição detalhada",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Título do ticket",
    "status": "open",
    "created_at": "2024-03-13T10:30:00Z"
  }
}
```

### GET /api/help-desk/[id]
Obter ticket específico.

**Response:** Ticket object

### PATCH /api/help-desk/[id]
Atualizar ticket.

**Request:**
```json
{
  "status": "in_progress",
  "priority": "low",
  "assigned_to": "user-uuid"
}
```

### DELETE /api/help-desk/[id]
Deletar ticket.

## Webhooks

### Stripe Webhooks

**Endpoint:** `POST /api/webhooks/stripe`

**Eventos Suportados:**
- `checkout.session.completed` - Sessão de checkout finalizada
- `customer.subscription.updated` - Assinatura atualizada
- `customer.subscription.deleted` - Assinatura cancelada
- `invoice.payment_succeeded` - Pagamento bem-sucedido
- `invoice.payment_failed` - Pagamento falhou

## Response Format

Todos os endpoints retornam no formato:

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: string
}
```

## Error Codes

| Code | Status | Significado |
|------|--------|------------|
| MISSING_PARAMS | 400 | Parâmetros obrigatórios não fornecidos |
| INVALID_INPUT | 400 | Validação de entrada falhou |
| AUTH_ERROR | 401 | Erro de autenticação |
| NOT_FOUND | 404 | Recurso não encontrado |
| CONFLICT | 409 | Conflito (ex: email duplicado) |
| STRIPE_ERROR | 402 | Erro no processamento Stripe |
| UNKNOWN_ERROR | 500 | Erro desconhecido do servidor |

## Status Codes

- `200 OK` - Sucesso
- `400 Bad Request` - Requisição inválida
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Não autorizado
- `404 Not Found` - Recurso não encontrado
- `409 Conflict` - Conflito
- `500 Internal Server Error` - Erro do servidor

## Autenticação

Incluir JWT token no header:

```bash
curl -H "Authorization: Bearer token" \
  https://api.seu-dominio.com/api/help-desk
```

## Rate Limiting

Limites por hora:
- Login: 10 requisições
- API geral: 1000 requisições

Headers de resposta:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1710348600
```

## Exemplos de Uso

### JavaScript/TypeScript

```typescript
// Criar ticket
const response = await fetch('/api/help-desk', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    organization_id: orgId,
    user_id: userId,
    title: 'Meu ticket',
    description: 'Descrição',
    priority: 'high'
  })
})

const data = await response.json()
```

### cURL

```bash
curl -X POST https://seu-dominio.com/api/help-desk \
  -H "Content-Type: application/json" \
  -d '{
    "organization_id": "org-uuid",
    "user_id": "user-uuid",
    "title": "Ticket",
    "description": "Descrição",
    "priority": "medium"
  }'
```

## Changelog

### v1.0.0 (2024-03-13)
- Initial release
- Authentication
- Help Desk
- Pricing
- Stripe integration

## Feedback

Para reportar bugs ou sugerir melhorias:
- GitHub Issues: https://github.com/seu-usuario/saas-platform/issues
- Email: api-support@seu-dominio.com
