'use strict';
const apiClient = require('../clients/codeship-api');
const NodeCache = require( "node-cache" );
const apiCache = new NodeCache({ stdTTL: 60});

function getProject(orgId, projectId) {
  const key = "projects/" + projectId;
  return new Promise((resolve, reject) => {
    apiCache.get(key, async (err, value) => {
      if (err) reject(err);
      if (value) {
        return resolve(value);
      } else {
        const project = (await apiClient.getProject(orgId, projectId)).project;
        project.builds = (await apiClient.listBuilds(orgId, projectId)).builds;
        apiCache.set(key, project);
        return resolve(project);
      }
    });
  });
}

module.exports = getProject;
