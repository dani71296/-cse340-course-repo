// src/controllers/categories.js
// Import any needed model functions (Actualizado con las nuevas funciones)
import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

// Define any controller functions

const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';

        res.render('categories', { title, categories });
    } catch (error) {
        next(error);
    }
};

const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id; // Extrae el ID de la categoría desde la URL

        // Ejecutamos ambas consultas simultáneamente con Promise.all
        const [category, projects] = await Promise.all([
            getCategoryById(categoryId),
            getProjectsByCategoryId(categoryId)
        ]);

        // Si la categoría no existe en la base de datos, disparamos un error 404
        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            return next(err);
        }

        // Renderiza la nueva vista y pasa los datos necesarios (incluyendo el título dinámico)
        res.render('category', {
            title: `${category.name} Projects`,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Export any controller functions (Actualizado)
export { showCategoriesPage, showCategoryDetailsPage };