/* jshint mocha: true */

'use strict';

const mlog      = require('mocha-logger');
const chai      = require('chai');
const Vision6   = require('./lib/client');
const validator = require('../src/validator');

describe('Contact Methods', function () {

    describe('countContacts', function () {
        it('should be able to count contacts for a list', function (done) {
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

                    return Vision6.countContacts(list.id);
                })
                .then(function (response) {
                    return validator({$ref: 'vision6/methods/countContacts#/responseSchema'}, {response: response});
                })
                .then(function () {
                    done();
                })
                .catch(done);

        });
    });

});
