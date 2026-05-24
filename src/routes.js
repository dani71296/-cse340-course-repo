// src/routes.js
import express from 'express';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
// Actualizado: Importamos la nueva función showCategoryDetailsPage junto a la existente
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// New Route for service project details page
router.get('/project/:id', showProjectDetailsPage);

// New Route for category details page (AGREGADA PARA LA TAREA)
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;