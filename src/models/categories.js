// src/models/categories.js
import db from './db.js'

// Tu función original (Mantenida intacta)
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name 
        FROM public.category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);
    return result.rows;
}


// 1. Retrieve a single category by its ID
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name 
        FROM public.category 
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0]; // Retorna el objeto de la categoría o undefined
};

// 2. Retrieve all categories for a given service project (Para pintar los tags)
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name 
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name ASC;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

// 3. Retrieve all service projects for a given category (Con JOIN para traer la organización aliada)
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.project_date,
            o.organization_id,
            o.name AS organization_name
        FROM public.service_project p
        JOIN public.project_category pc ON p.project_id = pc.project_id
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date ASC;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

// Export all the model functions (Actualizado con las nuevas funciones)
export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};