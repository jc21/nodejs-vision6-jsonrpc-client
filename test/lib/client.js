'use strict';

const fs      = require('fs');
const Vision6 = require('../../src/index');
const config  = require('../config.json');

if (typeof config.api_key !== 'string' || !config.api_key) {
    let err = 'Cannot perform tests, make sure _config.json has a valid API key!';
    throw new Error(err);
}

if (typeof config.api_host !== 'string') {
    config.api_host = null;
}

module.exports = new Vision6(config.api_key, config.api_host);
