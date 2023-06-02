const express = require('express');
const config = require('../../config/config');
const projectRoute = require('./project.route');
const discoverRoute = require('./discover.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/discover',
    route: discoverRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
