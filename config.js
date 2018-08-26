'use strict';
/*jshint esversion: 6*/

require('dotenv').config()
exports.DATABASE_URL = process.env.MLAB_DATABASE_URL;
//|| 'mongodb://localhost/weed-grow';
exports.TEST_DATABASE_URL = process.env.MLAB_TEST_DATABASE_URL || 'mongodb://localhost/test-weed-grow';
exports.PORT = process.env.PORT || 8080;
