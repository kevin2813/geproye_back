const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Create a member
 * @param {Object} memberBody
 * @returns {Promise<Member>}
 */
const createMember = async (memberBody) => {
  const supabase = await require('../utils/db');
  const result = await supabase.from('integrantes').insert(memberBody).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Query for members
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getMembers = async (projectId) => {
  const supabase = await require('../utils/db');
  const result = await supabase.from('integrantes').select().eq('projectId', projectId);
  if (result.error) return result.error;
  return result;
};

/**
 * Get member by id
 * @param {ObjectId} id
 * @returns {Promise<Member>}
 */
const getMemberById = async (id) => {
  const supabase = await require('../utils/db');
  const result = await supabase.from('integrantes').select().eq('id', id);
  if (result.error) return result.error;
  return result;
};

/**
 * Update member by id
 * @param {ObjectId} memberId
 * @param {Object} updateBody
 * @returns {Promise<Member>}
 */
const updateMemberById = async (memberId, updateBody) => {
  const supabase = await require('../utils/db');
  const { data } = await getMemberById(memberId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }
  const result = await supabase.from('integrantes').update(updateBody).eq('id', memberId).select();
  if (result.error) return result.error;
  return result;
};

/**
 * Delete member by id
 * @param {ObjectId} memberId
 * @returns {Promise<Member>}
 */
const deleteMemberById = async (memberId) => {
  const supabase = await require('../utils/db');
  const { data } = await getMemberById(memberId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }
  const result = await supabase.from('integrantes').delete().eq('id', memberId).select();
  if (result.error) return result.error;
  return result;
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMemberById,
  deleteMemberById,
};
