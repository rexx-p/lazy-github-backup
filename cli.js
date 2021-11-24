#!/usr/bin/env node

const { command } = require('yargs');
const saviour = require('./index');

const builder = command => {
    command.positional("directoryPath", {
        describe: "Path of the parent directory where git repositiories which you want to push to github are present"
    }).positional("githubPersonalAccessToken", {
        describe: "Personal Access Token of your github account. Tool uses http to push the repo. So github account's credentials should be in git's credential manager.",
    })
}

const handler = ({ directoryPath, githubPersonalAccessToken }) => saviour(directoryPath, githubPersonalAccessToken);

command("* <directoryPath> <githubPersonalAccessToken>", false, builder, handler).parse();