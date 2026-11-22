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
  const headers = { ...req.headers, host: 'oglybmnzspvyruzwwgdi.supabase.co' };
  delete headers['content-length'];

  const up = await fetch(TARGET + req.url, { method: req.method, headers, body });
  const outHeaders = Object.fromEntries(up.headers.entries());
  delete outHeaders['content-encoding'];
  delete outHeaders['content-length'];
  res.writeHead(up.status, { ...outHeaders, ...cors });
  res.end(Buffer.from(await up.arrayBuffer()));
}).listen(process.env.PORT || 3000);
