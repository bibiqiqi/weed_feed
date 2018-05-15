const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Root', function() {
  before(function() {
  return runServer();
});
after(function() {
  return closeServer();
});

  it('should return a 200 status code', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
    });
  });
});
