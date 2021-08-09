const fs = require("fs/promises");
const { lstatSync } = require("fs");
const inquirer = require("inquirer");
const { join } = require("path");
const yargs = require("yargs");

const options = yargs
    .positional("d", {
        describe: "path to directory",
        default: process.cwd()
    })
    .positional("p", {
        describe: "pattern",
        default: null
    })
    .argv;


let actualDir = options.d;


class ListItem {
    constructor(path, filename) {
        this.path = path;
        this.filename = filename;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const start = async () => {
    const list = await fs.readdir(actualDir);
    const items = list.map(filename => new ListItem(join(actualDir, filename), filename));

    const item = await inquirer
        .prompt([
            {
                name: "fileName",
                type: "list",
                message: `Choose: ${actualDir}`,
                choices: items.map(item => ({ name: item.filename, value: item }))
            }
        ])
        .then(answer => answer.fileName);

    if (item.isDir) {
        actualDir = item.path;
        return await start();
    } else {
        const data = await fs.readFile(item.path, "utf8");
        if (options.p === null) {
            console.log(data);
        } else {
            const lines = data.split("\n");
            lines
                .filter(line => new RegExp(options.p).test(line))
                .forEach(console.log);
        }

    }
}

start();