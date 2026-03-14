-- ============================================================================
-- 003_seed_data.sql
-- Dados iniciais para teste
-- ============================================================================

-- ============================================================================
-- INSERT SUBSCRIPTION PLANS
-- ============================================================================
INSERT INTO subscription_plans (name, price, billing_period, features, max_tickets, max_storage)
VALUES
  ('free', 0, 'monthly', '{"users": 1, "support": "email"}'::jsonb, 10, 1073741824),
  ('pro', 99.00, 'monthly', '{"users": 5, "support": "priority"}'::jsonb, 100, 53687091200),
  ('enterprise', 0, 'monthly', '{"users": -1, "support": "dedicated"}'::jsonb, -1, 1099511627776)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- COMENTÁRIOS
-- ============================================================================
-- Os dados de usuários e organizações serão criados durante o processo de autenticação
-- Este script insere apenas dados padrão que não dependem de autenticação
