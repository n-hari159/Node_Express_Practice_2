console.log('Before');
getUser(1, getRepositories);
console.log('After');

// Named Functions to Rescue from Callback Hell
function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout( () => {
        console.log('Reading a user from Database.....');
        callback({ id: id, gitHubUsername: 'n-hari159'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout( () => {
        console.log('Getting Repositories from the user....');
        callback(['repo1','repo2','repo3'])
    }, 2000);
}