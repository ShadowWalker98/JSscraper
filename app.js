const dataRequester = require('./src/data_fetcher.js');

async function renderData() {
    let vals;
    vals = await waitForData();
    vals.forEach(element => {
        let para = document.createElement("P");
        let text = document.createTextNode(`Question: ${element.question}`);
        let ul = document.createElement("UL");
        let upvoteLi = document.createElement("LI");
        let upvoteText = document.createTextNode(`Upvotes: ${element.values.numUpvotes}`);
        upvoteLi.appendChild(upvoteText);
        let viewsLi = document.createElement("LI");
        let viewsText = document.createTextNode(`Views: ${element.values.numViews}`);
        viewsLi.appendChild(viewsText);
        let shareLi = document.createElement("LI");
        let sharesText = document.createTextNode(`Shares: ${element.values.numShares}`);
        shareLi.appendChild(sharesText);
        ul.appendChild(upvoteLi);
        ul.appendChild(viewsLi);
        ul.appendChild(shareLi);
        para.appendChild(text);
        let div = document.createElement("DIV");
        div.appendChild(para);
        div.appendChild(ul);
        document.body.appendChild(div);
    });
}

async function waitForData() {
    vals = await dataRequester.getData();
    return vals;
}

renderData();