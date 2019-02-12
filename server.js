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
    redirectPath = 'https://' + req.headers.host + (baseUrl.indexOf('signup') === 1 ? '/signup' : '') + '?redirectTo=' + baseUrl;
  } catch (error) {
    console.log(error);
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
