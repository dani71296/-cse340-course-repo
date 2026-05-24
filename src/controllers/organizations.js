// src/controllers/organizations.js
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// 2. Definimos una función constante pura (¡Sin app.get!)
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    // CORRECCIÓN: Renombramos 'organizationDetails' a 'organization' al pasarla a la vista
    res.render('organization', {
        title,
        organization: organizationDetails, // <-- Así la vista ya sabrá qué es "organization.name"
        projects
    });
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };