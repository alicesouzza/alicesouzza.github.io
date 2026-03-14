-- ============================================================================
-- 002_rls_policies.sql
-- Políticas de Row Level Security (RLS)
-- ============================================================================

-- ============================================================================
-- ENABLE RLS ON TABLES
-- ============================================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_desk_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- ORGANIZATIONS POLICIES
-- ============================================================================
CREATE POLICY "Users can view their organization"
  ON organizations FOR SELECT
  USING (owner_id = auth.uid() OR id IN (
    SELECT organization_id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Owners can update their organization"
  ON organizations FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their organization"
  ON organizations FOR DELETE
  USING (owner_id = auth.uid());

CREATE POLICY "Authenticated users can create organizations"
  ON organizations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- USERS POLICIES
-- ============================================================================
CREATE POLICY "Users can view their organization members"
  ON users FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth_id = auth.uid());

CREATE POLICY "Admins can create new users"
  ON users FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- HELP DESK TICKETS POLICIES
-- ============================================================================
CREATE POLICY "Users can view tickets in their organization"
  ON help_desk_tickets FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can create tickets"
  ON help_desk_tickets FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()
    ) AND user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own tickets or assigned tickets"
  ON help_desk_tickets FOR UPDATE
  USING (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    assigned_to = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can delete their own tickets"
  ON help_desk_tickets FOR DELETE
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- ============================================================================
-- QUIZ RESPONSES POLICIES
-- ============================================================================
CREATE POLICY "Users can view their quiz responses"
  ON quiz_responses FOR SELECT
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create quiz responses"
  ON quiz_responses FOR INSERT
  WITH CHECK (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- ============================================================================
-- FINANCIAL TRANSACTIONS POLICIES
-- ============================================================================
CREATE POLICY "Users can view their organization transactions"
  ON financial_transactions FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can create transactions in their organization"
  ON financial_transactions FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM users WHERE auth_id = auth.uid()
    ) AND user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own transactions"
  ON financial_transactions FOR UPDATE
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can delete their own transactions"
  ON financial_transactions FOR DELETE
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- ============================================================================
-- SUBSCRIPTIONS POLICIES
-- ============================================================================
CREATE POLICY "Users can view their organization subscription"
  ON subscriptions FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM users WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Organization owners can manage subscriptions"
  ON subscriptions FOR UPDATE
  USING (organization_id IN (
    SELECT id FROM organizations WHERE owner_id = auth.uid()
  ));
