console.log('Before');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repo) => {
        getCommits(repo, (commits) => {

        });
    });
});
console.log('After');

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