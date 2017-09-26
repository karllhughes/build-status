'use strict';
const apiClient = require('../clients/codeship-api');
const getProject = require('../data-access/getProject');
const getProjects = require('../data-access/getProjects');

async function list(req, res) {
  const authorization = await apiClient.postAuth();
  const orgId = authorization.organizations[0].uuid;

  const projects = await getProjects(orgId);

  res.render('list', { projects: projects });
}

async function single(req, res) {
  const authorization = await apiClient.postAuth();
  const orgId = authorization.organizations[0].uuid;
  const projectId = req.params['project_id'];

  const project = await getProject(orgId, projectId);

  res.render('single', { project: project});
}

module.exports = {list, single};
