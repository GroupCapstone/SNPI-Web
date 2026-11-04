import http from 'node:http';

const PROXY_PORT = 80;
const FRONTEND_PORT = 3000;
const BACKEND_PORT = 4000;

const server = http.createServer((req, res) => {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  const targetPort = host.startsWith('api.') ? BACKEND_PORT : FRONTEND_PORT;

  const options: http.RequestOptions = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      'x-forwarded-host': req.headers.host,
      'x-forwarded-proto': 'http',
      'x-forwarded-for': req.socket.remoteAddress,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end(
      `[Proxy 502] Failed to connect to port ${targetPort} (${err.message}). Is the service running on localhost:${targetPort}?`,
    );
  });

  req.pipe(proxyReq, { end: true });
});

// Support Next.js Fast Refresh & WebSockets
server.on('upgrade', (req, socket) => {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  const targetPort = host.startsWith('api.') ? BACKEND_PORT : FRONTEND_PORT;

  const proxyReq = http.request({
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  });

  proxyReq.on('upgrade', (proxyRes, proxySocket) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n` +
        Object.entries(proxyRes.headers)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
          .join('\r\n') +
        '\r\n\r\n',
    );
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxyReq.on('error', () => {
    socket.destroy();
  });

  proxyReq.end();
});

server.listen(PROXY_PORT, () => {
  console.log('======================================================');
  console.log('SNP-SMS Local Subdomain Reverse Proxy Active (Port 80)');
  console.log('======================================================');
  console.log('Local Subdomain Routes:');
  console.log('  - http://api.snpi.edu.kh       -> localhost:4000 (Backend API)');
  console.log('  - http://dashboard.snpi.edu.kh -> localhost:3000 (School Dashboard)');
  console.log('  - http://docs.snpi.edu.kh      -> localhost:3000 (Developer Portal & UI Library)');
  console.log('======================================================');
});
