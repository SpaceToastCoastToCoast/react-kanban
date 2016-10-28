const express = require('express');
const app = require('../kanban');
const supertest = require("supertest")(app);

const freshApiData = JSON.stringify({
  data: [
    {
      "id":3,
      "title":"Plug leak",
      "description":"the fish are dying!",
      "priority":"1 HIGH",
      "status":"DONE",
      "creator_id":1,
      "assignee_id":1
    }, {
      "id":2,
      "title":"Clean fishtank",
      "description":"nasty!",
      "priority":"2 MEDIUM",
      "status":"DOING",
      "creator_id":1,
      "assignee_id":1
    }, {
      "id":1,
      "title":"Feed fish",
      "description":"don\'t overfeed them",
      "priority":"3 LOW",
      "status":"TO_DO",
      "creator_id":1,
      "assignee_id":1
    }
  ]
});

const editedApiData = JSON.stringify({
  data: [
    {
      "id":3,
      "title":"Plug leak",
      "description":"the fish are dying!",
      "priority":"1 HIGH",
      "status":"DONE",
      "creator_id":1,
      "assignee_id":1
    }, {
      "id":2,
      "title":"Clean fishtank",
      "description":"nasty!",
      "priority":"1 HIGH",
      "status":"DOING",
      "creator_id":1,
      "assignee_id":1
    }, {
      "id":1,
      "title":"Feed fish",
      "description":"don\'t overfeed them",
      "priority":"3 LOW",
      "status":"TO_DO",
      "creator_id":1,
      "assignee_id":1
    }
  ]
});

describe("kanban server", function(){
  this.timeout(4000);

  before((done) => {
    this.timeout(0);
    setTimeout(done, 3500);
  });

  it("gives the API when /api is requested", (done) => {
    supertest
    .get("/api")
    .expect(200)
    .expect(freshApiData)
    .end(done);
  });

  it("posts a new card when POST is sent to /api");

  it("deletes a new card when DELETE is sent to /api/:id");

  it("edits a card when /api/:id is requested", (done) => {
    supertest
    .put("/api/2")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('priority=1 HIGH')
    .expect(200)
    .expect(editedApiData)
    .end(done);
  });

  it("edits again when /api/:id is requested", (done) => {
    supertest
    .put("/api/2")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .type("form")
    .send('priority=2 MEDIUM')
    .expect(200)
    .expect(freshApiData)
    .end(done);
  });

});