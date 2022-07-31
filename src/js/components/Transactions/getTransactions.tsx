import * as React from 'react';



const TRANSACTIONS_DATA_KEY = 'KH9Y19KEMB7ZQM7FD45SPYIRAGHPWM9M4Y';



export default function getTransactions(account: string) {

    return fetch(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${TRANSACTIONS_DATA_KEY}`, {method: 'GET'})
    .then(result => {

        return result.json();
    })
    .catch(error => {
        console.log(error);
    });
}