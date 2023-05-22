const { parse } = require('url');

const { createServer } = require('https');
const https = require('https');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = +process.env.PORT;
const hostname = 'localhost';
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port, dir: './' });

const handle = app.getRequestHandler();

// will work with all https requests will all libraries (i.e. request.js)

const httpsOptions = {
  key: fs.readFileSync('./client-key.pem'),
  cert: fs.readFileSync('./client.pem'),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        await handle(req, res, parsedUrl);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    })
    .once('error', (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
