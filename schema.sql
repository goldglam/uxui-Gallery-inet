-- ==============================================================================
-- INET UX/UI Gallery - Production Database Schema (PostgreSQL 15+)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ENUMS
-- ------------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM (
  'SUPER_ADMIN',
  'DESIGNER',
  'DEVELOPER',
  'VIEWER'
);

CREATE TYPE project_status AS ENUM (
  'DRAFT',
  'IN_REVIEW',
  'PUBLISHED',
  'ARCHIVED'
);

CREATE TYPE ticket_type AS ENUM (
  'NEW_DESIGN',
  'DESIGN_SYSTEM_UPDATE',
  'UX_AUDIT',
  'REDESIGN',
  'CONSULTATION'
);

CREATE TYPE ticket_status AS ENUM (
  'SUBMITTED',
  'UNDER_REVIEW',
  'IN_PROGRESS',
  'REVIEW_READY',
  'COMPLETED',
  'REJECTED'
);

CREATE TYPE ticket_priority AS ENUM (
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT'
);

CREATE TYPE log_action_type AS ENUM (
  'COMMENT',
  'STATUS_CHANGE',
  'ASSIGNMENT_CHANGE',
  'PRIORITY_CHANGE',
  'ATTACHMENT_UPLOADED'
);

-- ------------------------------------------------------------------------------
-- 2. TABLE: users
-- ------------------------------------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sso_provider_id VARCHAR(255) UNIQUE,              -- IdP Subject / Object ID (Azure AD / Okta)
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'VIEWER',
  department VARCHAR(100),
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ------------------------------------------------------------------------------
-- 3. TABLE: projects
-- ------------------------------------------------------------------------------
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,                    -- e.g. FinTech, Healthcare, Smart Farm
  platform VARCHAR(100) NOT NULL,                    -- e.g. Website, Mobile, Multi-platform
  duration VARCHAR(100),                             -- e.g. '2 months'
  type VARCHAR(150),                                 -- e.g. 'Factory / Agriculture'
  client VARCHAR(255),
  context TEXT NOT NULL,                             -- Detailed problem statement & UX objectives
  dos_donts JSONB DEFAULT '{"dos": [], "donts": []}'::jsonb,
  figma_url TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'DRAFT',
  cover_image_url TEXT NOT NULL,
  screens JSONB NOT NULL DEFAULT '[]'::jsonb,        -- Array of screen objects: [{title, desc, image_url, type}]
  design_tokens JSONB NOT NULL DEFAULT '{}'::jsonb,  -- Colors, typography, shadows extracted
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  view_count INTEGER NOT NULL DEFAULT 0,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);
CREATE INDEX idx_projects_tokens ON projects USING GIN(design_tokens);

-- ------------------------------------------------------------------------------
-- 4. TABLE: requests (Tickets)
-- ------------------------------------------------------------------------------
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_no VARCHAR(20) NOT NULL UNIQUE,             -- e.g. 'REQ-2026-0001'
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  type ticket_type NOT NULL DEFAULT 'NEW_DESIGN',
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  department VARCHAR(100) NOT NULL,
  priority ticket_priority NOT NULL DEFAULT 'MEDIUM',
  due_date DATE,
  status ticket_status NOT NULL DEFAULT 'SUBMITTED',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  reference_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_requests_requester ON requests(requester_id);
CREATE INDEX idx_requests_assigned_to ON requests(assigned_to);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_priority ON requests(priority);
CREATE INDEX idx_requests_due_date ON requests(due_date);

-- Sequence for Ticket Number generation
CREATE SEQUENCE IF NOT EXISTS ticket_seq START 1;

CREATE OR REPLACE FUNCTION generate_ticket_number() 
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_no IS NULL OR NEW.ticket_no = '' THEN
    NEW.ticket_no := 'REQ-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('ticket_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_ticket_number
BEFORE INSERT ON requests
FOR EACH ROW
EXECUTE FUNCTION generate_ticket_number();

-- ------------------------------------------------------------------------------
-- 5. TABLE: comments_logs
-- ------------------------------------------------------------------------------
CREATE TABLE comments_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  action_type log_action_type NOT NULL DEFAULT 'COMMENT',
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,                -- e.g. {"old_status": "SUBMITTED", "new_status": "IN_PROGRESS"}
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_logs_ticket_id ON comments_logs(ticket_id);
CREATE INDEX idx_logs_user_id ON comments_logs(user_id);
CREATE INDEX idx_logs_created_at ON comments_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 6. TABLE: user_favorites (For Bookmark System)
-- ------------------------------------------------------------------------------
CREATE TABLE user_favorites (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, project_id)
);

-- ------------------------------------------------------------------------------
-- Automated Updated_at Trigger
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_requests_updated_at BEFORE UPDATE ON requests FOR EACH ROW EXECUTE FUNCTION update_timestamp();
