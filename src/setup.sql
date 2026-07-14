-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Projects Table
-- ========================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO projects (organization_id, title, description, location, project_date)
VALUES
-- Project for BrightFuture Builders (ID: 1)
(
    1, 
    'Community Center Eco-Roof Installation', 
    'Help us build a sustainable, green eco-roof on the downtown community center to improve insulation and manage rainwater.', 
    '123 Maple Street, Downtown Community Center', 
    '2026-10-15'
),

-- Project for GreenHarvest Growers (ID: 2)
(
    2, 
    'Neighborhood Urban Garden Planting', 
    'Join us for our seasonal planting day! We will be planting organic vegetables and teaching basic urban farming techniques to local youth.', 
    'Oakridge Community Garden, 456 East Ave', 
    '2026-10-18'
),

-- Project for UnityServe Volunteers (ID: 3)
(
    3, 
    'Autumn Food Drive Coordination', 
    'Volunteers needed to help sort, package, and distribute non-perishable food donations to local families in need ahead of the holiday season.', 
    'Unity Hope Pantry, 789 Pine Road', 
    '2026-11-05'
);

-- ========================================
-- Categories Table
-- ========================================
CREATE TABLE categories (
    -- Unique ID for each category
    category_id SERIAL PRIMARY KEY,
    
    -- Name of the category (e.g., 'Environment', 'Education', 'Hunger Relief')
    -- UNIQUE ensures we don't accidentally create duplicate categories
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Service Project Categories (Junction Table)
-- ========================================
CREATE TABLE project_categories (
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    
    -- The composite primary key prevents the exact same category 
    -- from being assigned to the exact same project more than once
    PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO categories (name)
VALUES 
('Sustainability & Environment'), -- Will get ID: 1
('Urban Agriculture'),           -- Will get ID: 2
('Community & Hunger Relief');     -- Will get ID: 3


-- ========================================
-- Insert sample data: Linking Projects to Categories
-- ========================================
INSERT INTO project_categories (project_id, category_id)
VALUES
-- 1. Eco-Roof Installation (Project 1) belongs to Sustainability & Environment (Category 1)
(1, 1),

-- 2. Urban Garden Planting (Project 2) belongs to BOTH Environment (1) and Urban Agriculture (2)
(2, 1),
(2, 2),

-- 3. Autumn Food Drive (Project 3) belongs to Community & Hunger Relief (Category 3)
(3, 3);