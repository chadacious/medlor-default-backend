const express = require('express');
const app = express();

const { DEBUG } = process.env;

app.get('/', (req, res) => {
  //   console.log('req', req);
  if (DEBUG === 'true') {
    console.log('request.headers', req.headers);
    console.log('pathname', req.headers['x-original-uri']);
    console.log('hostname', req.headers.host);
    console.log('req.url', req.url);
  }
  let redirectPath;
  try {
    // handle the case where the path contains specific parts that are used for partitioning to different backend services
    const baseUrl = req.headers['x-original-uri'];
    // if we are already redirecting, then don't continue
    const baseUrlParts = baseUrl.split('/');
    let checkBackend = baseUrl;
    if (baseUrlParts.length > 1) {
      checkBackend = baseUrlParts[0] === '' ? baseUrlParts[1] : baseUrlParts[0];
    }
    if (DEBUG === 'true') {
      console.log('check baseUrl:', checkBackend);
    }
    if (['signup', 'startmedling', 'sirs'].includes(checkBackend)) {
      redirectPath = 'https://' + req.headers.host + '/' + checkBackend;
    } else {
      redirectPath = 'https://' + req.headers.host;
    }
    redirectPath += checkBackend.indexOf('?redirectTo=') === -1 ? '?redirectTo='  + encodeURIComponent(baseUrl) : '';
  } catch (error) {
    if (DEBUG === 'true') {
      console.log(error);
    }
    redirectPath = '?redirectTo=/404';
  }
  if (DEBUG === 'true') {
    console.log(redirectPath);
    console.log('------------');
  }
  res.status(404).redirect(redirectPath);
//   res.status(404).sendFile('index.html');
});

app.get('/healthz', (req, res) => { res.send('Healthy!').end(); });

app.listen(8080, () => console.log('App listening on port 8080: DEBUG', DEBUG === 'true' ? 'enabled' : 'disabled'));
