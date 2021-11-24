require('dotenv').config({ path: __dirname + '/.env' })
const fs = require('fs');
const path = require('path');
const util = require('util');


const simpleGit = require('simple-git');
const git = simpleGit();

let dir = process.env.FOLDER_PATH;
const readDir = util.promisify(fs.readdir);
const findFileStat = util.promisify(fs.stat);


const findGitRepositories = async (dir) => {

    let list = await readDir(dir);
    if (list.includes('.git')) {

        //push to github
        console.log("Pushed to GIt : " + dir);
        pushToGithub()
    } else {
        list.forEach(async function (innnerDir) {
            innnerDir = path.resolve(dir, innnerDir);
            let fileStat = await findFileStat(innnerDir);
            if (fileStat && fileStat.isDirectory()) {
                findGitRepositories(innnerDir);
            }
        });
    }
};



findGitRepositories(dir);