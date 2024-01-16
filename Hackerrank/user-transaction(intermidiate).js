'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
      return inputString[currentLine++];
}
function fetch(url) {
    let response = ''
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            res.setEncoding('utf8');
            res.on('data', function(body) {
                response += body;
            })
            res.on('end', function() {
                resolve(JSON.parse(response))
            })
            res.on('error', function(e) {
                reject(e)
            })
        })
    })
}

async function getNumTransactions(username) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
    // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
    const userDataResponse = await fetch(`https://jsonmock.hackerrank.com/api/article_users?username=${username}`);
    if (!userDataResponse.data.length) return 'Username Not Found'
    const userData = userDataResponse.data.find((user) => user.username === username);
    if (!userData) return 'Username Not Found'
    const txData = await fetch(`https://jsonmock.hackerrank.com/api/transactions?&userId=${userData.id}`);
    return txData.total;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const username = readLine().trim();
    const result = await getNumTransactions(username);
    ws.write(result.toString());
}