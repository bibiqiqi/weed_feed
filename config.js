'use strict';
/*jshint esversion: 6*/
exports.DATABASE_URL = process.env.DATABASE_URL;
//|| 'mongodb://localhost/weed-app'
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-weed-grow';
//process.env.PORT ||
exports.PORT = 8080;
