console.log('Before');
// Using CallBacks
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repo) => {
//         getCommits(repo, (commits) => {

//         });
//     });
// });

// Consuming Promises
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from Database.....');
            resolve({ id: id, gitHubUsername: 'n-hari159'});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting Repositories from the user....');
            resolve(['repo1','repo2','repo3'])
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            console.log('Calling GitHub API.....')
            resolve(['commits']);
        }, 2000);
    });
}