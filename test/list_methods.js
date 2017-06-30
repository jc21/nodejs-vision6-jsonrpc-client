/* jshint mocha: true */

'use strict';

const mlog      = require('mocha-logger');
const chai      = require('chai');
const Vision6   = require('./lib/client');
const validator = require('../src/validator');

describe('List Methods', function () {

    describe('searchLists', function () {
        it('should be able to get all lists', function (done) {
            Vision6.searchLists()
                .then((response) => {
                    return validator({$ref: 'vision6/methods/searchLists#/responseSchema'}, {response: response});
                })
                .then((data) => {
                    mlog.pending(data.response.length + ' lists returned');
                    done();
                })
                .catch(done);
        });

        it('should be able to search lists with criteria and sorting', function (done) {
            Vision6.searchLists([['contact_count', 'greaterthan', 0]], 1, 0, 'creation_time', 'DESC')
                .then((response) => {
                    return validator({$ref: 'vision6/methods/searchLists#/responseSchema'}, {response: response});
                })
                .then((data) => {
                    mlog.pending(data.response.length + ' lists returned');
                    done();
                })
                .catch(done);
        });
    });

    describe('searchFields', function () {
        it('should be able to get all fields for a list', function (done) {
            Vision6.searchLists()
                .then((response) => {
                    return validator({$ref: 'vision6/methods/searchLists#/responseSchema'}, {response: response});
                })
                .then((data) => {
                    if (!data.response || !data.response.length) {
                        throw new Error('Your account doesn\'t have any lists to count contacts for!');
                    }

                    mlog.pending(data.response.length + ' lists returned');

                    let list = data.response[Math.floor(Math.random() * data.response.length)];

                    return Vision6.searchFields(list.id);
                })
                .then((response) => {
                    return validator({$ref: 'vision6/methods/searchFields#/responseSchema'}, {response: response});
                })
                .then((data) => {
                    mlog.pending(data.response.length + ' fields returned');
                    done();
                })
                .catch(done);
        });
    });

    describe('getTimezoneList', function () {
        it('should be able to get timezones', function (done) {
            Vision6.getTimezoneList()
                .then((response) => {
                    return validator({$ref: 'vision6/methods/getTimezoneList#/responseSchema'}, {response: response});
                })
                .then((data) => {
                    mlog.pending(data.response.length + ' timezones returned');
                    done();
                })
                .catch(done);
        });
    });

});
