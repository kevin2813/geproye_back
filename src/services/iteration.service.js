const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const supabase = require('../utils/db')

/**
 * Create a iteration
 * @param {Object} iterationBody
 * @returns {Promise<Iteration>}
 */
const createIteration = async (iterationBody) => {
  const result = await supabase.from('iteraciones').insert(iterationBody).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Query for iterations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getIterations = async (projectId) => {
  const result = await supabase.from('iteraciones').select().eq('projectId', projectId);
  if (result.error) return result.error;
  return result;
};

/**
 * Get iteration by id
 * @param {ObjectId} id
 * @returns {Promise<Iteration>}
 */
const getIterationById = async (id) => {
  const result = await supabase.from('iteraciones').select().eq('id', id);
  if (result.error) return result.error;
  return result;
};

/**
 * Update iteration by id
 * @param {ObjectId} iterationId
 * @param {Object} updateBody
 * @returns {Promise<Iteration>}
 */
const updateIterationById = async (iterationId, updateBody) => {
  const { data } = await getIterationById(iterationId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Iteration not found');
  }
  const result = await supabase.from('iteraciones').update(updateBody).eq('id', iterationId).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Delete iteration by id
 * @param {ObjectId} iterationId
 * @returns {Promise<Iteration>}
 */
const deleteIterationById = async (iterationId) => {
  const { data } = await getIterationById(iterationId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Iteration not found');
  }
  const result = await supabase.from('iteraciones').delete().eq('id', iterationId).select();
  if (result.error) return result.error;
  return result;
};

module.exports = {
  createIteration,
  getIterations,
  getIterationById,
  updateIterationById,
  deleteIterationById,
};
