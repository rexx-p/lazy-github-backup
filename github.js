const axios = require('axios');

const pushToGithub = (dir) => {
    //Create a Private Remote Repo

    //Add new remote to Local Repo

    //Push all the branches
}

const createPrivateRepo = (repoName) => {
    axios.post('https://api.github.com/user/repos', {
        "name": repoName,
        "private": true
    }, {
        headers: {
            Authorization:`token ${process.env.PERSONAL_ACCESS_TOKEN}`
        }
    })
}

export default { pushToGithub };