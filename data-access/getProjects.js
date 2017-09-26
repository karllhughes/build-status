'use strict';
const apiClient = require('../clients/codeship-api');
const NodeCache = require( "node-cache" );
const apiCache = new NodeCache({ stdTTL: 60});

async function getProjects(orgId) {
  const key = "projects";
  return new Promise((resolve, reject) => {
    apiCache.get(key, async (err, value) => {
      if (err) reject(err);
      if (value) {
        return resolve(value);
      } else {
        let projects = (await apiClient.listProjects(orgId)).projects;

        projects = await Promise.all(projects.map(async (project) => {
          project.builds = (await apiClient.listBuilds(orgId, project.uuid)).builds;
          return project;
        }));

        apiCache.set(key, projects);
        return resolve(projects);
      }
    });
  });
}

module.exports = getProjects;
