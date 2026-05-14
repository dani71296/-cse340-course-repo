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