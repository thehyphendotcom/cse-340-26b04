import db from './db.js';

const getAllCategories = async () => {
    const query = `
    SELECT
        category_id,
        name
    FROM public.categories
    ORDER BY name;`;

    const result = await db.query(query);
    return result.rows;
};

const getCategoryById = async (id) => {
    const query = `
    SELECT
        category_id,
        name
    FROM public.categories
    WHERE category_id = $1;`;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
    SELECT
        c.category_id,
        c.name
    FROM public.categories c
    JOIN public.project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;`;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

// Aliases for flexibility across calling conventions
const getCategoryDetails = getCategoryById;
const getCategory = getCategoryById;
const getCategoriesForProject = getCategoriesByProjectId;
const getCategoriesByProject = getCategoriesByProjectId;
const getCategoriesForServiceProject = getCategoriesByProjectId;

export {
    getAllCategories,
    getCategoryById,
    getCategoryDetails,
    getCategory,
    getCategoriesByProjectId,
    getCategoriesForProject,
    getCategoriesByProject,
    getCategoriesForServiceProject
};