import http from 'node:http';

const TARGET = 'https://oglybmnzspvyruzwwgdi.supabase.co';
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};

http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors);
    return res.end();
  }

  let body = '';
  for await (const chunk of req) body += chunk;

  const headers = { host: 'oglybmnzspvyruzwwgdi.supabase.co' };
  if (req.headers['apikey']) headers['apikey'] = req.headers['apikey'];
  if (req.headers['authorization']) headers['authorization'] = req.headers['authorization'];
  if (req.headers['content-type']) headers['content-type'] = req.headers['content-type'];
  if (req.headers['prefer']) headers['prefer'] = req.headers['prefer'];

  const opts = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'HEAD' && body) opts.body = body;

  const up = await fetch(TARGET + req.url, opts);
  const text = await up.text();
  res.writeHead(up.status, {
    'Content-Type': up.headers.get('content-type') || 'application/json',
    ...cors
  });
  res.end(text);
}).listen(process.env.PORT || 3000);
