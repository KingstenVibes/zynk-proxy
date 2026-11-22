import http from 'node:http';

const TARGET = 'https://supabase.co';
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};

http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;

  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    if (['apikey', 'authorization', 'content-type', 'prefer'].includes(k.toLowerCase())) {
      headers[k] = v;
    }
  }
  headers['host'] = 'oglybmnzspvyruzwwgdi.supabase.co';

  const up = await fetch(TARGET + req.url, { method: req.method, headers, body });
  res.writeHead(up.status, { 'Content-Type': up.headers.get('content-type') || 'application/json', ...cors });
  res.end(Buffer.from(await up.arrayBuffer()));
}).listen(process.env.PORT || 3000);
