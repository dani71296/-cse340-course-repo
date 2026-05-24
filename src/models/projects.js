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

// Export all the model functions (Actualizado con las dos nuevas funciones)
export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails
};