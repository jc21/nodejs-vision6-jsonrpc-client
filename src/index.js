'use strict';

const debug     = require('debug')('vision6');
const jayson    = require('jayson/promise');
const validator = require('./validator');

/**
 * @param {String} api_key
 * @param {String} [host]
 */
module.exports = function (api_key, host) {

    // Default the host
    host = host || 'https://www.vision6.com.au/api/jsonrpcserver.php?version=3.0';

    if (!api_key) {
        throw new Error('Invalid Vision6 API Key');
    }

    let protocol = 'http';
    if (host.substr(0, 5) === 'https') {
        protocol = 'https';
    }

    let client = jayson.client[protocol](host);
    let schema_loaded = false;

    return {

        /**
         *
         * @param   {String} method_name
         * @param   {Object} [options]
         * @returns {Promise}
         */
        call: function (method_name, options) {
            options = options || [];
            options.unshift(api_key);

            debug('Calling ' + method_name, options);

            return new Promise((resolve, reject) => {
                if (!schema_loaded) {
                    validator.loadSchemas
                        .then(() => {
                            schema_loaded = true;
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            })
                .then(() => {
                    return validator({$ref: 'vision6/methods/' + method_name + '#/requestSchema'}, {args: options});
                })
                .then((data) => {
                    return client.request(method_name, data.args)
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
                });
        },

        /********************************************************
         * List and Field Methods                               *
         ********************************************************/

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/addfield
         * @param   {Integer} list_id
         * @param   {Object}  field_details
         * @returns {Promise}
         */
        addField: function (list_id, field_details) {
            return this.call('addField', [
                list_id,
                field_details
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/addlist
         * @param   {Object}  list_details
         * @returns {Promise}
         */
        addList: function (list_details) {
            return this.call('addList', [
                list_details
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/clearlist
         * @param   {Integer} list_id
         * @returns {Promise}
         */
        clearList: function (list_id) {
            return this.call('clearList', [
                list_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/countfields
         * @param   {Integer} list_id
         * @param   {Array}   [search_criteria]
         * @returns {Promise}
         */
        countFields: function (list_id, search_criteria) {
            return this.call('countFields', [
                list_id,
                search_criteria || []
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/countlists
         * @param   {Array}   [search_criteria]
         * @returns {Promise}
         */
        countLists: function (search_criteria) {
            return this.call('countLists', [
                search_criteria || []
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/deletefield
         * @param   {Integer}  list_id
         * @param   {Integer}  field_id
         * @returns {Promise}
         */
        deleteField: function (list_id, field_id) {
            return this.call('deleteField', [
                list_id,
                field_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/deletelist
         * @param   {Integer}  list_id
         * @returns {Promise}
         */
        deleteList: function (list_id) {
            return this.call('deleteList', [
                list_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/editfield
         * @param   {Integer}  list_id
         * @param   {Object}   field_details
         * @returns {Promise}
         */
        editField: function (list_id, field_details) {
            return this.call('editField', [
                list_id,
                field_details
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/editlist
         * @param   {Object}   list_details
         * @returns {Promise}
         */
        editList: function (list_details) {
            return this.call('editList', [
                list_details
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/getfieldbyid
         * @param   {Integer}  list_id
         * @param   {Integer}  field_id
         * @returns {Promise}
         */
        getFieldById: function (list_id, field_id) {
            return this.call('getFieldById', [
                list_id,
                field_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/getfolderidforfield
         * @param   {Integer}  list_id
         * @param   {Integer}  field_id
         * @returns {Promise}
         */
        getFolderIdForField: function (list_id, field_id) {
            return this.call('getFolderIdForField', [
                list_id,
                field_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/getlistbyid
         * @param   {Integer}  list_id
         * @returns {Promise}
         */
        getListById: function (list_id) {
            return this.call('getListById', [
                list_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/gettimezonelist
         * @returns {Promise}
         */
        getTimezoneList: function () {
            return this.call('getTimezoneList');
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/searchfields
         * @param   {Integer}  list_id
         * @param   {Array}    [search_criteria]
         * @param   {Integer}  [limit]
         * @param   {Integer}  [offset]
         * @param   {String}   [sort_by]
         * @oaram   {String}   [sort_order]
         * @returns {Promise}
         */
        searchFields: function (list_id, search_criteria, limit, offset, sort_by, sort_order) {
            return this.call('searchFields', [
                list_id,
                search_criteria || [],
                limit || 0,
                offset || 0,
                sort_by || 'name',
                sort_order || 'ASC'
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/searchlists
         * @param   {Array}   [criteria]
         * @param   {Integer} [limit]
         * @param   {Integer} [offset]
         * @param   {String}  [sort_by]
         * @param   {String}  [sort_order]
         * @returns {Promise}
         */
        searchLists: function (criteria, limit, offset, sort_by, sort_order) {
            return this.call('searchLists', [
                criteria || [],
                limit || 100,
                offset || 0,
                sort_by || 'name',
                sort_order || 'ASC'
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/setfieldfolderid
         * @param   {Integer} list_id
         * @param   {Integer} field_id
         * @param   {String}  folder_id
         * @returns {Promise}
         */
        setFieldFolderId: function (list_id, field_id, folder_id) {
            return this.call('setFieldFolderId', [
                list_id,
                field_id,
                folder_id
            ]);
        },

        /********************************************************
         * Contact Methods                                      *
         ********************************************************/

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/addcontacts
         * @param   {Integer} list_id
         * @param   {Array}   contacts
         * @param   {Boolean} [overwrite]
         * @param   {Integer} [remove_unsubscribers]
         * @returns {Promise}
         */
        addContacts: function (list_id, contacts, overwrite, remove_unsubscribers) {
            return this.call('addContacts', [
                list_id,
                contacts,
                overwrite || false,
                remove_unsubscribers || 0
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/confirmcontact
         * @param   {Integer} list_id
         * @param   {Integer} contact_id
         * @returns {Promise}
         */
        confirmContact: function (list_id, contact_id) {
            return this.call('confirmContact', [
                list_id,
                contact_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/countcontacts
         * @param   {Integer} list_id
         * @param   {Array}   [search_criteria]
         * @returns {Promise}
         */
        countContacts: function (list_id, search_criteria) {
            return this.call('countContacts', [
                list_id,
                search_criteria || []
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/countpreviousunsubscribers
         * @param   {Integer} [list_id]
         * @param   {Array}   [criteria]
         * @returns {Promise}
         */
        countPreviousUnsubscribers: function (list_id, criteria) {
            return this.call('countPreviousUnsubscribers', [
                list_id || 0,
                criteria || []
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/deactivatecontact
         * @param   {Integer} list_id
         * @param   {Integer} contact_id
         * @returns {Promise}
         */
        deactivateContact: function (list_id, contact_id) {
            return this.call('deactivateContact', [
                list_id,
                contact_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/deletecontacts
         * @param   {Integer} list_id
         * @param   {Array}   contact_ids
         * @param   {Array}   [search_criteria]
         * @param   {Integer} [limit]
         * @param   {Integer} [offset]
         * @param   {String}  [sort_by]
         * @param   {String}  [sort_order]
         * @returns {Promise}
         */
        deleteContacts: function (list_id, contact_ids, search_criteria, limit, offset, sort_by, sort_order) {
            return this.call('deleteContacts', [
                list_id,
                contact_ids,
                search_criteria || [],
                limit || 0,
                offset || 0,
                sort_by || null,
                sort_order || null
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/editcontacts
         * @param   {Integer} list_id
         * @param   {Array}   contacts
         * @param   {Boolean} [trigger_update_profile]
         * @returns {Promise}
         */
        editContacts: function (list_id, contacts, trigger_update_profile) {
            return this.call('editContacts', [
                list_id,
                contacts,
                trigger_update_profile || false
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/getcontactbyid
         * @param   {Integer} list_id
         * @param   {Integer} contact_id
         * @param   {Array}   [returned_fields]
         * @returns {Promise}
         */
        getContactById: function (list_id, contact_id, returned_fields) {
            return this.call('getContactById', [
                list_id,
                contact_id,
                returned_fields || ['all']
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/reactivatecontact
         * @param   {Integer} list_id
         * @param   {Integer} contact_id
         * @returns {Promise}
         */
        reactivateContact: function (list_id, contact_id) {
            return this.call('reactivateContact', [
                list_id,
                contact_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/resubscribecontact
         * @param   {Integer} list_id
         * @param   {Integer} contact_id
         * @returns {Promise}
         */
        resubscribeContact: function (list_id, contact_id) {
            return this.call('resubscribeContact', [
                list_id,
                contact_id
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/searchcontacts
         * @param   {Integer} list_id
         * @param   {Array}   [search_criteria]
         * @param   {Integer} [limit]
         * @param   {Integer} [offset]
         * @param   {String}  [sort_by]
         * @param   {String}  [sort_order]
         * @param   {Array}   [returned_fields]
         * @returns {Promise}
         */
        searchContacts: function (list_id, search_criteria, limit, offset, sort_by, sort_order, returned_fields) {
            return this.call('searchContacts', [
                list_id,
                search_criteria || [],
                limit || 0,
                offset || 0,
                sort_by || null,
                sort_order || null,
                returned_fields || ['all']
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/searchpreviousunsubscribers
         * @param   {Integer} [list_id]
         * @param   {Array}   [search_criteria]
         * @param   {Integer} [limit]
         * @param   {Integer} [offset]
         * @param   {String}  [sort_by]
         * @param   {String}  [sort_order]
         * @returns {Promise}
         */
        searchPreviousUnsubscribers: function (list_id, search_criteria, limit, offset, sort_by, sort_order) {
            return this.call('searchPreviousUnsubscribers', [
                list_id || 0,
                search_criteria || [],
                limit || 0,
                offset || 0,
                sort_by || null,
                sort_order || null
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/subscribecontact
         * @param   {Integer} list_id
         * @param   {Object}  contact_details
         * @returns {Promise}
         */
        subscribeContact: function (list_id, contact_details) {
            return this.call('subscribeContact', [
                list_id,
                contact_details
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/unsubscribecontact
         * @param   {Integer} list_id
         * @param   {String}  email_address
         * @returns {Promise}
         */
        unsubscribeContact: function (list_id, email_address) {
            return this.call('unsubscribeContact', [
                list_id || 0,
                email_address
            ]);
        },

        /**
         * @doc     http://developers.vision6.com.au/3.0/method/unsubscribecontactbyid
         * @param   {Integer} list_id
         * @param   {Integer} contact_id
         * @returns {Promise}
         */
        unsubscribeContactById: function (list_id, contact_id) {
            return this.call('unsubscribeContactById', [
                list_id,
                contact_id
            ]);
        }

    };
};

