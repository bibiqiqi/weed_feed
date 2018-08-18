'use strict';
/*jshint esversion: 6*/
const TEST_DATABASE_URL = 'mongodb://<bibiqiqi>:<S1ybonos>@ds123532.mlab.com:23532/weed-grow-app-test';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/weed-grow';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-weed-grow';
exports.PORT = process.env.PORT || 8080;
