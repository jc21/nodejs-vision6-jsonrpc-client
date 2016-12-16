'use strict';

const debug  = require('debug')('vision6');
const jayson = require('jayson/promise');

/**
 * @param {String} api_key
 * @param {String} [host]
 */
module.exports = function (api_key, host) {

    // Default the host
    host = host || 'http://www.vision6.com.au/api/jsonrpcserver.php?version=3.0';

    if (!api_key) {
        throw new Error('Invalid Vision6 API Key');
    }

    var protocol = 'http';
    if (host.substr(0, 5) === 'https') {
        protocol = 'https';
    }

    var client = jayson.client[protocol](host);

    return {

        /**
         *
         * @param {String} method_name
         * @param {Object} [options]
         * @returns {Promise}
         */
        call: function (method_name, options) {
            options = options || [];
            options.unshift(api_key);

            debug('Calling ' + method_name, options);

            return client.request(method_name, options)
                .then(function (results) {
                    debug(method_name, results);

                    if (typeof results.error !== 'undefined' && results.error) {
                        throw new Error(results.error);
                    }

                    if (typeof results.result !== 'undefined') {
                        return results.result;
                    }

                    return results;
                });
        },

        /**
         * @param {Object} [criteria]
         * @param {Integer} [limit]
         * @param {Integer} [offset]
         * @param {String} [sort_by]
         * @param {String} [sort_order]
         * @returns {Promise}
         */
        searchLists: function (criteria, limit, offset, sort_by, sort_order) {
            criteria   = criteria || [];
            limit      = limit || 100;
            offset     = offset || 0;
            sort_by    = sort_by || 'name';
            sort_order = sort_order || 'ASC';

            return this.call('searchLists', [
                criteria,
                limit,
                offset,
                sort_by,
                sort_order
            ]);
        }
    };
};

