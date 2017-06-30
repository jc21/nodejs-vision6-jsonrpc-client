'use strict';

const debug  = require('debug')('vision6:validator');
const path   = require('path');
const parser = require('json-schema-ref-parser');

const ajv = require('ajv')({
    verbose:        true,
    validateSchema: true,
    allErrors:      false,
    format:         'full',  // strict regexes for format checks
    coerceTypes:    true
});

/**
 *
 * @param {Object} schema
 * @param {Object} payload
 * @returns {Promise}
 */
function validator(schema, payload) {

    debug('Performing validation', schema, payload);

    return new Promise(function Promise_validator(resolve, reject) {

        if (typeof payload === 'undefined') {
            reject(new Error('Payload is undefined'));
        }

        let validate = ajv.compile(schema);
        let valid = validate(payload);

        if (valid && !validate.errors) {
            resolve(payload);
        } else {
            let message = ajv.errorsText(validate.errors);
            let err     = new Error(message);
            err.debug   = [validate.errors, payload];
            reject(err);
        }

    });

}

validator.loadSchemas = parser
    .dereference(path.resolve('schema/vision6.json'))
    .then(function (schema) {
        ajv.addSchema(schema);
        debug(schema);
        return schema;
    });

module.exports = validator;
