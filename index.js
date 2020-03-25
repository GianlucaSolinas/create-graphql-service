#!/usr/bin/env node
let shell = require("shelljs");
let path = require("path");
const child_process = require("child_process");
let colors = require("colors");
let fs = require("fs"); //fs already comes included with node.
let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;

const run = async () => {
  let success = await createGqlService();
  if (!success) {
    console.log("Something went wrong while trying to create a new GraphQL service using create-graphql-service".red);
    return false;
  }
  await initNPM();
  await cdIntoNewApp();
  await installPackages();
  await addScripts();
  await updateTemplates();
  console.log(
    `
Your ${appName.bold} service has been created successfully!
Move to the new directory and start your service by running `.green + "npm run start:dev".blue
  );
};

const createGqlService = () => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`mkdir ${appName}`, () => {
        console.log("Created GraphQL service folder");
        resolve(true);
      });
    } else {
      console.log("\nNo app name was provided.".red);
      console.log("\nProvide an app name in the following format: ");
      console.log("\ncreate-graphql-service ", "app-name\n".cyan);
      resolve(false);
    }
  });
};

const cdIntoNewApp = () => {
  return new Promise(resolve => {
    shell.exec(`cd ${appName} && mkdir src`, () => {
      resolve();
    });
  });
};

const initNPM = () => {
  return child_process.execFileSync("npm", ["init"], { cwd: appDirectory, stdio: "inherit" });
};

const packages = [
  "@apollo/federation",
  "apollo-server",
  "apollo-server-fastify",
  "@hapi/boom",
  "fastify",
  "graphql",
  "nodemon",
  "pino-pretty",
  "lodash"
];

const installPackages = () => {
  return new Promise(resolve => {
    console.log("\nInstalling packages...\n".cyan);

    setTimeout(() => {
      console.log("Still installing packages...don't worry!".cyan);
    }, 5000);

    setTimeout(() => {
      console.log("Installing last packages...don't Ctrl+C me please".cyan);
    }, 10000);

    shell.exec(`cd ${appName} && npm install --save ${packages.join(" ")}`, (code, stdout, stderr) => {
      if (code) {
        console.log(`Exit code: ${code}`.red);
      }
      console.log("\nFinished installing packages\n".green);
      resolve();
    });
  });
};

const scripts = {
  "start:dev": "NODE_ENV='development' ./node_modules/nodemon/bin/nodemon.js ./src/index.js",
  "start:prod": "./node_modules/nodemon/bin/nodemon.js ./src/index.js"
};

const addScripts = () => {
  try {
    var packaged = JSON.parse(fs.readFileSync(`${appName}/package.json`));
    packaged.scripts = { ...packaged.scripts, ...scripts };
    fs.writeFileSync(`${appName}/package.json`, JSON.stringify(packaged), { spaces: 2 });
  } catch (e) {
    throw e;
  }
};

const createFolder = ({ curpath, folderName, children, callback }) => {
  fs.mkdir(curpath, err => {
    if (err) throw err;

    children.forEach(({ name: fileName, type, data, children: folderChildren }, index) => {
      if (type === "folder") {
        createFolder({
          curpath: `${curpath}/${fileName}`,
          folderName: `${folderName}/${fileName}`,
          children: folderChildren,
          callback
        });
      } else {
        fs.writeFile(
          `${curpath}/${fileName}`,
          fs.readFileSync(path.resolve(__dirname, `${folderName}/${fileName}`), {
            encoding: "utf-8"
          }),
          function(err) {
            if (err) throw err;

            if (index === children.length - 1) {
              callback();
            }
          }
        );
      }
    });
  });
};

const updateTemplates = () => {
  let { structure } = require("./templates/templates.js");

  return new Promise(resolve => {
    let promises = [];

    structure.forEach(({ name, type, children }, i) => {
      promises[i] = new Promise(res => {
        const curpath = `${appDirectory}/src/${name}`;

        if (type === "folder") {
          createFolder({
            curpath,
            folderName: `./templates/${name}`,
            children,
            callback: () => {
              res();
            }
          });
        } else {
          fs.writeFile(
            curpath,
            fs.readFileSync(path.resolve(__dirname, `./templates/${name}`), { encoding: "utf-8" }),
            function(err) {
              if (err) throw err;
              res();
            }
          );
        }
      });
    });
    Promise.all(promises).then(() => {
      resolve();
    });
  });
};

run();
