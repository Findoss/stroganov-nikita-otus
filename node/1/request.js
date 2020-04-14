const http = require("http");

/**
 * @function getArgv
 * @return {object}
 */
function getArgv() {
  const [, , ...params] = process.argv;

  // default
  const args = {
    countRequest: 1,
    isParallel: false,
    port: 5000
  };

  params.forEach(param => {
    const [key, value] = param.split("=");
    if (key === "--count") {
      args.countRequest = Number(value);
    } else if (key === "--parallel" || key === "-p") {
      args.isParallel = true;
    } else if (key === "--port") {
      args.port = Number(value);
    } else if (key === "--help" || key === "-h") {
      console.log(`
        Usage: [options]
        Options:
          -h, --help       print command line options
          --count=...      count request, (default: 1)
          -p, --parallel   parallel, (default: false)
          --port=...       server port, (default: 5000)
      `.replace(/        /g,''));
    } else {
      console.log(`${key} unknown option`);
    }
  });

  return args;
}

/**
 * @function request
 * @async
 * @return {promise}
 */
async function request() {
  return new Promise(resolve => {
    const options = {
      host: 'localhost',
      port: args.port,
      method: 'GET',
      path: "/"
    };

    console.log("\x1b[34m🠔 send request\x1b[0m");
    http
      .request(options, res => {
        res.on("data", () => {});
        res.on("end", () => {
          console.log("\x1b[33m🠖 response\x1b[0m");
          resolve()
        });
      })
      .on('error', (err) => console.error(err))
      .end();
  });
}

/**
 * @function start
 * @async
 * @param {number} countRequest
 * @param {boolean} isParallel
 */
async function start(countRequest, isParallel) {
  const arrRequests = new Array(countRequest).fill(request);
  if (isParallel) {
    Promise.all(arrRequests.map((v,i) => v(i)));
  } else {
    for (const request of arrRequests) await request();
  }
}

const args = getArgv();
start(args.countRequest, args.isParallel);
