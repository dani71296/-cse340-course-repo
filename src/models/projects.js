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
            o.name AS organization_name -- Aquí traemos el nombre de la otra tabla
        FROM public.service_project p
        JOIN public.organization o ON p.organization_id = o.organization_id; -- El "pegamento"
    `;

  const result = await db.query(query);

  return result.rows;
}

export { getAllProjects }