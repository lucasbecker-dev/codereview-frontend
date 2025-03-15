/**
 * @typedef {Object} User
 * @property {string} id - The user's unique identifier
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 * @property {('student'|'reviewer'|'admin')} role - The user's role
 */

/**
 * @typedef {Object} Project
 * @property {string} id - The project's unique identifier
 * @property {string} title - The project's title
 * @property {string} description - The project's description
 * @property {string} userId - The ID of the user who created the project
 * @property {('pending'|'in_review'|'completed'|'revision_requested')} status - The project's status
 */

// Export empty object to make this a valid module
export default {};