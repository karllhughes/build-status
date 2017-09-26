'use strict';
const request = require('request-promise-native');
const apiUrl = process.env.CODESHIP_API_URL;
const username = process.env.CODESHIP_USERNAME;
const password = process.env.CODESHIP_PASSWORD;
let authorization;

async function postAuth() {
  if (accessTokenExpired()) {
    console.log("Getting new authorization token");
    authorization = await request({
      uri: apiUrl + '/auth',
      method: 'POST',
      auth: {
        user: username,
        pass: password,
      },
      json: true,
      headers: {'Content-Type': 'application/json'},
    });
  }
  return authorization;
}

async function getProject(organizationId, projectId) {
  console.log("Getting project #" + projectId);
  return request({
    uri: apiUrl + '/organizations/' + organizationId + '/projects/' + projectId,
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization.access_token,
    },
  });
}

function listProjects(organizationId) {
  console.log("Getting projects");
  return request({
    uri: apiUrl + '/organizations/' + organizationId + '/projects',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization.access_token,
    },
  });
}

function listBuilds(organizationId, projectId) {
  console.log("Getting builds for project #" + projectId);
  return request({
    uri: apiUrl + '/organizations/' + organizationId + '/projects/' + projectId + '/builds',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization.access_token,
    },
  });
}

function accessTokenExpired() {
  const now = Math.round((new Date()).getTime() / 1000);
  if (authorization && authorization.access_token && authorization.expires_at) {
    return authorization.expires_at <= now;
  }
  return true;
}

module.exports = {postAuth, getProject, listProjects, listBuilds};
