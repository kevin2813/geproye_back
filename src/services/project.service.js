const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const supabase = require('../utils/db')

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */
const createProject = async (projectBody) => {
  const result = await supabase.from('proyectos').insert(projectBody).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Query for projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getProjects = async () => {
  const result = await supabase.from('proyectos').select();
  if (result.error) return result.error;
  return result;
};

/**
 * Get project by id
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const getProjectById = async (id) => {
  const result = await supabase.from('proyectos').select().eq('id', id);
  if (result.error) return result.error;
  return result;
};

/**
 * Update project by id
 * @param {ObjectId} projectId
 * @param {Object} updateBody
 * @returns {Promise<Project>}
 */
const updateProjectById = async (projectId, updateBody) => {
  const { data } = await getProjectById(projectId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  const result = await supabase.from('proyectos').update(updateBody).eq('id', projectId).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Delete project by id
 * @param {ObjectId} projectId
 * @returns {Promise<Project>}
 */
const deleteProjectById = async (projectId) => {
  const { data } = await getProjectById(projectId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  const result = await supabase.from('proyectos').delete().eq('id', projectId).select();
  if (result.error) return result.error;
  return result;
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
