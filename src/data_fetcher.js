const axios = require('axios');

const URL = 'https://www.quora.com/What-is-the-most-emotional-picture-youve-ever-seen/answer/Neha-Pendem';
const URL2 = 'https://www.quora.com/What-is-something-unrealistic-that-you-often-see-in-movies-that-annoys-the-hell-out-of-you/answer/Neha-Pendem';
const URLS = [
    URL,
    URL2
];


async function getData() {
    dataToBeSent = [];
    var fetcher = new Promise((resolve, reject) => {
        URLS.forEach( async (url, idx, array) => {
            let vals = await fetchData(url);
            let data = {
                question: vals.question,
                values: vals.values
            };
            dataToBeSent.push(data);
            if(idx === array.length - 1) {
                resolve(dataToBeSent);
            }
        });

    });
    return fetcher;

}

async function fetchData(url) {
    var valsToBeReturned = {};
    await axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            let upvotesIdx = data.indexOf("numUpvotes\\") + 13;
            let end_idx = upvotesIdx;
            while(data[end_idx] !== ",") {
                end_idx = end_idx + 1;
            }
            let numUpvotes = parseInt(data.slice(upvotesIdx, end_idx));

            let viewIdx = data.indexOf("numViews") + 11;
            end_idx = viewIdx;
            while(data[end_idx] !== ",") {
                end_idx = end_idx + 1;
            }
            let numViews = parseInt(data.slice(viewIdx, end_idx));

            let sharersIdx = data.indexOf("numSharers") + 13;
            end_idx = sharersIdx;
            while(data[end_idx] !== ",") {
                end_idx = end_idx + 1;
            }
            let numShares = parseInt(data.slice(sharersIdx, end_idx));

            let vals = {numUpvotes, numViews, numShares};
            return vals
        })
        .then((vals) => {
            let question = url.split('/')[3].split('-').join(" ").concat("?");
            // console.log(question);
            // console.log("Number of upvotes: ", vals.numUpvotes);
            // console.log("Number of views: ", vals.numViews);
            // console.log("Number of sharers: ", vals.numShares);
            valsToBeReturned.question = question;
            valsToBeReturned.values = vals;
        })
        .catch((error) => {
            console.log(error);
        });

     return valsToBeReturned
}

module.exports = {
    getData,
};
