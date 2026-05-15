-- ========================================
-- 1. Crear la tabla de Organizaciones
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,    -- Auto-incremental y clave primaria
    name VARCHAR(150) NOT NULL,            -- Nombre obligatorio
    description TEXT NOT NULL,             -- Descripción larga obligatoria
    contact_email VARCHAR(255) NOT NULL,   -- Email de contacto obligatorio
    logo_filename VARCHAR(255) NOT NULL    -- Nombre del archivo de imagen obligatorio
);

-- ========================================
-- 2. Insertar datos de ejemplo
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders', 
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
    'info@brightfuturebuilders.org', 
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers', 
    'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
    'contact@greenharvest.org', 
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers', 
    'A volunteer coordination group supporting local charities and service initiatives.', 
    'hello@unityserve.org', 
    'unityserve-logo.png'
);

-- ========================================
-- 3. Verificación
-- ========================================
SELECT * FROM organization;

-- ========================================
-- 1. Crear la tabla de PROJECTS
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    -- Definición de la llave foránea que conecta con tu tabla organization
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) 
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);
-- ========================================
-- 2. Insertar datos de projects 15
-- ========================================
-- ========================================
-- 2. Insertar 5 proyectos por cada organización
-- ========================================

-- Proyectos para 'BrightFuture Builders' (ID: 1)
INSERT INTO service_project (organization_id, title, description, location, project_date) VALUES
(1, 'Eco-Shed Construction', 'Building a sustainable tool shed for the community garden.', 'East Side Park', '2026-06-10'),
(1, 'Playground Renovation', 'Repairing and painting the local playground equipment.', 'Sunnyvale Heights', '2026-07-22'),
(1, 'Handicap Ramp Installation', 'Installing ramps for elderly residents in the district.', 'West Avenue', '2026-08-05'),
(1, 'School Roof Repair', 'Emergency maintenance for the primary school gym.', 'North Creek', '2026-09-12'),
(1, 'Solar Panel Workshop', 'Teaching youth how to build small solar chargers.', 'Community Center', '2026-10-01');

-- Proyectos para 'GreenHarvest Growers' (ID: 2)
INSERT INTO service_project (organization_id, title, description, location, project_date) VALUES
(2, 'Spring Seed Sowing', 'Planting seasonal vegetables in the urban farm.', 'Downtown Plot', '2026-03-15'),
(2, 'Composting Seminar', 'Educational event about organic waste management.', 'City Hall Plaza', '2026-04-20'),
(2, 'Harvest Festival Prep', 'Organizing the annual farm-to-table dinner.', 'Riverside Farm', '2026-05-30'),
(2, 'Irrigation System Setup', 'Installing water-efficient drip lines.', 'Greenhouse B', '2026-06-05'),
(2, 'Beehive Maintenance', 'Checking health of local honeybee colonies.', 'Hilltop Orchard', '2026-07-14');

-- Proyectos para 'UnityServe Volunteers' (ID: 3)
INSERT INTO service_project (organization_id, title, description, location, project_date) VALUES
(3, 'Senior Tech Support', 'Volunteers helping seniors set up video calls.', 'Retirement Home', '2026-06-18'),
(3, 'Local Library Sorting', 'Organizing donated books for the summer sale.', 'Main Library', '2026-07-05'),
(3, 'Park Trail Clean-up', 'Removing debris and marking trails after the storm.', 'Pine Forest', '2026-07-20'),
(3, 'Soup Kitchen Staffing', 'Serving hot meals to those in need.', 'Mission Hall', '2026-08-10'),
(3, 'Youth Mentorship Kickoff', 'Pairing college students with middle schoolers.', 'Sports Complex', '2026-09-01');

select * FROM service_project;
SELECT * FROM service_project WHERE organization_id = 2;
