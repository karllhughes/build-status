'use strict';
const apiClient = require('../clients/codeship-api');

async function list(req, res) {
  const authorization = await apiClient.postAuth();
  const orgId = authorization.organizations[0].uuid;

  let projects = (await apiClient.listProjects(orgId)).projects;

  projects = await Promise.all(projects.map(async (project) => {
    project.builds = (await apiClient.listBuilds(orgId, project.uuid)).builds;
    return project;
  }));

  res.render('list', {projects: projects});
}

async function single(req, res) {
  const authorization = await apiClient.postAuth();
  const orgId = authorization.organizations[0].uuid;
  const projectId = req.params['project_id'];

  let project = (await apiClient.getProject(orgId, projectId)).project;

  project.builds = (await apiClient.listBuilds(orgId, projectId)).builds;

  res.render('single', { project: project});
}

module.exports = {list, single};
