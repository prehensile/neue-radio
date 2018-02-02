const http = require('./lib/http');
const resolveRelative = require('./lib/resolve-relative')(__dirname);
const pathsList = require('./lib/paths-list');

const createApps = require('./lib/apps');
const createServices = require('./lib/services');

const app = async () => {
  const port = process.env.PORT || 3000;

  const appsList = await pathsList({
    rootPath: resolveRelative('../../apps'),
  });

  const servicesList = await pathsList({
    rootPath: resolveRelative('..'),
    ignore: ['manager', 'setup', 'debug'],
  });

  const appsPath = resolveRelative(
    process.env.APPS_PATH || './tmp/apps',
  );

  const servicesPath = resolveRelative(
    process.env.SERVICES_PATH || './tmp/services',
  );

  const apps = createApps({
    path: appsPath,
    available: appsList,
  });

  const services = createServices({
    path: servicesPath,
    available: servicesList,
  });

  http({ port, apps, services });
};

app();
