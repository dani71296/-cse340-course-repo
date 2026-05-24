// src/controllers/projects.js
// Import any needed model functions (Actualizado con las nuevas funciones)
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
// IMPORTANTE: Importamos la función para obtener las categorías de este proyecto
import { getCategoriesByProjectId } from '../models/categories.js';

// Constant to limit the number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions

const showProjectsPage = async (req, res, next) => {
    try {
        // Llamamos a la nueva función pasando la constante 5
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const title = 'Upcoming Service Projects'; // Título actualizado según requerimiento

        res.render('projects', { title, projects });
    } catch (error) {
        next(error); // Pasa el error al manejador global en server.js
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        // Ejecutamos la búsqueda del proyecto y de sus categorías en paralelo
        const [project, categories] = await Promise.all([
            getProjectDetails(projectId),
            getCategoriesByProjectId(projectId)
        ]);

        if (!project) {
            const err = new Error('Project Not Found');
            err.status = 404;
            return next(err);
        }

        // Enviamos 'title', 'project' y ahora también las 'categories' para los tags
        res.render('project', {
            title: project.title,
            project,
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Export any controller functions (Actualizado)
export { showProjectsPage, showProjectDetailsPage };