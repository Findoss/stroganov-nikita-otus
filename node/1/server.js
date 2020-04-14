const http = require("http");

/**
 * @function getArgv
 * @return {object}
 */
function getArgv() {
  const [, , ...params] = process.argv;

  // default
  const args = {
    port: 5000,
    delay: false
  };

  params.forEach(param => {
    const [key, value] = param.split("=");
    if (key === "--port" || key === "-p") {
      args.port = Number(value);
    } else if (key === "--delay") {
      args.delay = Number(value);
    } else if (key === "--help" || key === "-h") {
      console.log(`
        Usage: [options]
        Options:
          -h, --help   print command line options
          --delay=...  delay send request, (default: 100)
          --port=...   server port, (default: 5000)
      `.replace(/        /g,''));
    } else {
      console.log(`${key} unknown option`);
    }
  });

  return args;
}

const args = getArgv();

const server = http.createServer().listen(args.port);
console.log(`Server start on http://localhost:${args.port}`);

function getBody(request) {
  return new Promise(resolve => {
    const body = [];
    request
      .on("data", chunk => body.push(chunk))
      .on("end", () => resolve(Buffer.concat(body).toString()));
  });
}

function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

server.on("request", async (req, res) => {
  const body = await getBody(req);
  console.log("\x1b[33m🠖 request\x1b[0m");

  await wait(args.delay);
  console.log("\x1b[34m🠔 send response\x1b[0m");
  res.writeHead(200, { "Content-Type": "text/json" });
  res.end(
    JSON.stringify({
      httpVersion: req.httpVersion,
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: body
    })
  );
});
