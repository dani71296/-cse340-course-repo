// src/models/projects.js
import db from './db.js'

const getAllProjects = async () => {
  const query = `
        SELECT 
            p.project_id, 
            p.organization_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            o.name AS organization_name 
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id; 
    `;

  const result = await db.query(query);
  return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);
  return result.rows;
};


const getUpcomingProjects = async (number_of_projects) => {
  const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.project_date, -- Mantenemos el nombre original de tu base de datos
            p.location, 
            p.organization_id, 
            o.name AS organization_name
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

  const result = await db.query(query, [number_of_projects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.project_date, 
            p.location, 
            p.organization_id, 
            o.name AS organization_name
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

  const result = await db.query(query, [id]);
  return result.rows[0]; // Retorna solo el primer objeto (o undefined si no existe)
};
const createProject = async (title, description, location, date, organizationId) => {
  // CORRECCIÓN: Usamos la tabla 'public.service_project' y la columna 'project_date'
  const query = `
      INSERT INTO public.service_project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}
// Agrega esta función al final de src/models/projects.js
const updateProject = async (id, title, description, location, date, organizationId) => {
  const query = `
    UPDATE public.service_project
    SET title = $1, description = $2, location = $3, project_date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [title, description, location, date, organizationId, id];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Project update failed: Project not found.');
  }

  return result.rows[0].project_id;
};

// Recuerda agregar 'updateProject' dentro del bloque export del final:
export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject // <-- Añadido aquí
};