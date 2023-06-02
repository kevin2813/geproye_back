const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Create a requirement
 * @param {Object} requirementBody
 * @returns {Promise<Requirement>}
 */
const createRequirement = async (requirementBody) => {
  const supabase = await require('../utils/db');
  const result = await supabase.from('requerimientos').insert(requirementBody).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Query for requirements
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getRequirements = async (projectId) => {
  const supabase = await require('../utils/db');
  const result = await supabase.from('requerimientos').select().eq('projectId', projectId);
  if (result.error) return result.error;
  return result;
};

/**
 * Get requirement by id
 * @param {ObjectId} id
 * @returns {Promise<Requirement>}
 */
const getRequirementById = async (id) => {
  const supabase = await require('../utils/db');
  const result = await supabase.from('requerimientos').select().eq('id', id);
  if (result.error) return result.error;
  return result;
};

/**
 * Update requirement by id
 * @param {ObjectId} requirementId
 * @param {Object} updateBody
 * @returns {Promise<Requirement>}
 */
const updateRequirementById = async (requirementId, updateBody) => {
  const supabase = await require('../utils/db');
  const { data } = await getRequirementById(requirementId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requirement not found');
  }
  const result = await supabase.from('requerimientos').update(updateBody).eq('id', requirementId).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Delete requirement by id
 * @param {ObjectId} requirementId
 * @returns {Promise<Requirement>}
 */
const deleteRequirementById = async (requirementId) => {
  const supabase = await require('../utils/db');
  const { data } = await getRequirementById(requirementId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requirement not found');
  }
  const result = await supabase.from('requerimientos').delete().eq('id', requirementId).select();
  if (result.error) return result.error;
  return result;
};

module.exports = {
  createRequirement,
  getRequirements,
  getRequirementById,
  updateRequirementById,
  deleteRequirementById,
};
