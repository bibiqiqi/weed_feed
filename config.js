'use strict';
/*jshint esversion: 6*/
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/weed-app';
//'mongodb://bibiqiqi:S1ybonos@ds259070.mlab.com:59070/weed-grow-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-weed-grow';
exports.PORT = process.env.PORT || 8080;
