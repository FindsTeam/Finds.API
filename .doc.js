/**
 * @typedef {Object} DbConfig
 * @property {String} user
 * @property {String} pass
 * @property {String} host
 * @property {Number} port
 * @property {String} name
 */

/**
 * @typedef {Object} AppConfig
 * @property {{ domain:String, apiIdentifier:String }} auth0
 * @property {DbConfig} db
 * @property {{ apiKey:String }} google
 * @property {Number} port
 */
