const fs = require('fs');
const path = require('path');
const util = require('util');

let dir = process.env.FOLDER_PATH;
const readDir = util.promisify(fs.readdir);
const findFileStat = util.promisify(fs.stat);
const pushToGithub = require('./github')

const findGitRepositories = async (dir, personalAccessToken) => {
    dir = dir || process.env.FOLDER_PATH;
    personalAccessToken = personalAccessToken || process.env.PERSONAL_ACCESS_TOKEN;
    let list = await readDir(dir);
    if (list.includes('.git')) {
        let isPushedSuccessfully = await pushToGithub(dir, personalAccessToken);
        if (isPushedSuccessfully) {
            console.log("Pushed to Git : " + dir);
        } else {
            console.log("Failed to Push to Git : " + dir);
        }
        return isPushedSuccessfully;
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



module.exports = findGitRepositories;