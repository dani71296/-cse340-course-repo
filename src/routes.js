import express from 'express';
import { showHomePage } from './controllers/index.js';
import { testErrorPage } from './controllers/errors.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,       // <-- Añadido para el Paso 3
    processLoginForm,    // <-- Añadido para el Paso 3
    processLogout,        // <-- Añadido para el Paso 3
    requireLogin,
    showDashboard,
    requireRole,
    showAllUsers
} from './controllers/users.js';

// UNIFICADO: Importaciones de categorías (¡CORREGIDO: Añadidas funciones de creación y edición!)
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,       // <-- Añadido para el formulario de creación
    processNewCategoryForm,    // <-- Añadido para procesar la creación
    showEditCategoryForm,      // <-- Añadido para el formulario de edición
    processEditCategoryForm,   // <-- Añadido para procesar la edición
    categoryValidation         // <-- Añadido para proteger con express-validator
} from './controllers/categories.js';

// UNIFICADO: Importaciones de proyectos
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';

// UNIFICADO: Todas las importaciones de organizaciones juntas en un solo lugar
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// New Route for service project details page
router.get('/project/:id', showProjectDetailsPage);

// New Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// =========================================================================
// NUEVO: Rutas para asignar categorías a un proyecto (Many-to-Many)
// =========================================================================
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// =========================================================================
// Rutas para la creación de nuevos Proyectos de Servicio
// =========================================================================
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// =========================================================================
// CORRECCIÓN: Rutas para la administración de Categorías (CRUD completo)
// =========================================================================
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// 2. Rutas para el registro de usuarios
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// 👈 NUEVO: Rutas agregadas según las instrucciones de la actividad
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Al poner 'requireLogin' primero, Express validará la sesión antes de mostrar el dashboard
router.get('/dashboard', requireLogin, showDashboard);
// Ruta para ver usuarios (Protegida: Debe estar logueado Y ser admin)
router.get('/users', requireLogin, requireRole('admin'), showAllUsers);

export default router;