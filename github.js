const axios = require('axios');
const path = require('path');

const simpleGit = require('simple-git');

const pushToGithub = async (dir, personalAccessToken) => {
    let dirName = dir.split(path.sep).pop();
    //Create a Private Remote Repo
    let remoteName = await createPrivateRepo(dirName, personalAccessToken);
    if (remoteName) {
        //Add new remote to Local Repo and push all branches
        await addNewRemoteAndPush(dir, remoteName);
        return true;
    } else {
        return false;
    }
}

const addNewRemoteAndPush = async (dir, repoUrl) => {
    try {
        const gitOptions = {
            baseDir: dir,
        };
        const git = simpleGit(gitOptions);
        try {
            await git.removeRemote('rex-upstream', repoUrl);
        } catch (error) {
            // console.log(error);
        }
        await git.addRemote('rex-upstream', repoUrl);
        await git.push(['rex-upstream', '--all']);
        await git.removeRemote('rex-upstream', repoUrl);

    } catch (error) {
        console.error(error)
    }
}

const createPrivateRepo = async (repoName, personalAccessToken) => {
    try {
        let response = await axios.post('https://api.github.com/user/repos', {
            "name": repoName,
            "private": true
        }, {
            headers: {
                Authorization: `token ${personalAccessToken}`
            }
        })
        console.log('Created private repo successfully', response.data.clone_url);
        return response.data.clone_url;
    } catch (error) {
        // console.error(error);
        console.error("Failed to create Private Repo. Maybe Repo with same name already exists", repoName)
    }
}

module.exports = pushToGithub;