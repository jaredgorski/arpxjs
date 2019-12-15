#!/usr/bin/env node

/**
 * arpxjs NPM publish script
 *
 * Adapted from the method utilized by https://github.com/IronCoreLabs/recrypt-node-binding
 */

const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

shell.set("-e");

const rootDirectory = path.dirname(process.argv[1]);
shell.cd(rootDirectory);
const shouldPublish = process.argv.slice(2).includes("--publish");

shell.rm("-rf", "./dist");
shell.rm("-rf", "./bin");
shell.rm("-rf", "./build");

shell.exec("yarn install --ignore-scripts");
shell.exec("yarn run clean");
shell.pushd("./native");
shell.exec("cargo update");
shell.popd();
shell.exec("yarn run build");

// shell.exec("yarn test");
shell.mkdir("./dist");

shell.cp(["README.md", "package.json"], "./dist");

const npmPackageJson = require("./dist/package.json");
npmPackageJson.scripts.install = "node-pre-gyp install";
fs.writeFileSync("./dist/package.json", JSON.stringify(npmPackageJson, null, 2));

shell.mkdir("./bin");
shell.cp("./native/index.node", "./bin");
shell.exec("./node_modules/.bin/node-pre-gyp package");
var tgz = shell.exec("find ./build -name *.tar.gz");
shell.cp(tgz, "./bin/");
shell.pushd("./dist");

shell.exec(shouldPublish ? "npm publish --access public" : "echo 'Skipping publishing to npm...'");
shell.popd();

shell.echo("COMPLETE");
