import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = categoryDetails ? categoryDetails.name : 'Category Details';

    res.render('category', { title, categoryDetails, category: categoryDetails, projects });
};

const showCategoryDetails = showCategoryDetailsPage;
const showCategoryPage = showCategoryDetailsPage;

export { showCategoriesPage, showCategoryDetailsPage, showCategoryDetails, showCategoryPage };