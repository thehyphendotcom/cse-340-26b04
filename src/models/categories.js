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

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
    INSERT INTO project_categories (category_id, project_id)
    VALUES ($1, $2)
    `;
    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

/**
 * Creates a new category in the database.
 * @param {string} name - The category name.
 * @returns {number} The ID of the created category.
 */
const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [name]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

/**
 * Updates an existing category in the database.
 * @param {number|string} categoryId - The ID of the category to update.
 * @param {string} name - The updated category name.
 * @returns {number} The ID of the updated category.
 */
const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;
    const result = await db.query(query, [name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
};


export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    assignCategoryToProject,
    updateCategoryAssignments,  
    createCategory,
    updateCategory
};