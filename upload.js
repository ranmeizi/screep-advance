const fs = require("node:fs/promises");
const path = require("node:path");
var https = require("https");

const NORMAL_MODULE_DIR = path.resolve(__dirname, "packages/javascript/pkg");
const BINARY_MODULE_DIR = path.resolve(__dirname, "packages/wasm/pkg");

/* 上传模块后缀名 */
const exts = [".js", ".wasm"];

/* code module data */
const modules = {};

async function getModules() {
  await addModule(NORMAL_MODULE_DIR);
  await addModule(BINARY_MODULE_DIR);
}

async function addModule(dir) {
  const files = await fs.readdir(dir);
  for (let name of files) {
    const ext = path.extname(name);
    const [module] = name.split(".");
    if (ext === ".js") {
      modules[module] = (await fs.readFile(path.join(dir, name))).toString();
    } else if (ext === ".wasm") {
      modules[module] = {
        normal: (await fs.readFile(path.join(dir, name))).toString(),
        binary: (await fs.readFile(path.join(dir, name))).toString("base64"),
      };
    }
  }
}

async function uploadCode(modules) {
  const { token, email, password } = JSON.parse(
    (await fs.readFile("cfg.json")).toString()
  );

  console.log(token);

  const data = {
    branch: "screep-advance",
    modules,
  };

  var req = https.request(
    {
      hostname: "screeps.com",
      port: 443,
      path: "/api/user/code",
      method: "POST",
      auth: email + ":" + password,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
    (res) => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", (d) => {
        process.stdout.write(d);
      });
    }
  );

  req.write(JSON.stringify(data));
  req.end();
}

async function main() {
  try {
    await getModules();
    console.log(modules);
    await uploadCode(modules);
  } catch (e) {
    console.log(e);
  }
}

main();
