

const namesTexts = localStorage.getItem('names');
if (namesTexts == null) { // create an item in localstorage
    let arr = [];
    let arrStr = JSON.stringify(arr);
    localStorage.setItem('names', arrStr);
}
const names = JSON.parse(namesTexts);


document.querySelector('input[type=submit]').addEventListener('click', handleSubmit);
const tweetListContainer = document.getElementById('tweet-list');

document.body.addEventListener('click', handleRemove);
document.body.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {
    if (e.code === 'Enter') { // add to do if 'Enter' button is pressed
        handleSubmit();
    }
}

function handleRemove(e) { // remove the 'to do' item from UI when the cross is clicked
    if (e.target.dataset.cross == 'remove') {
        e.target.parentElement.remove()
        removeFromLocalStorage(e.target.parentElement.innerText);
    }
}

function removeFromLocalStorage(tweet) { // remove the 'to do' item from localStorage 
    let namesTexts = localStorage.getItem('names'); // takes the innerText of the parent element of 'cross' which is an 'li'
    let twtArr = JSON.parse(namesTexts); // get the item from localStorage
    // let twt = tweet.slice(0, -1); 
    let twt = tweet.trim(); // trim any extra space form the last
    for (let twtItem of twtArr) { // run a loop for the array 
        if (twtItem === twt) { // remove the selected item 
            twtArr.splice(twtArr.indexOf(twt), 1);
            let twtArrAfterRemove = JSON.stringify(twtArr);
            localStorage.setItem('names', twtArrAfterRemove);
        }
    }
}

function handleSubmit() {
    const tweet = document.getElementById('tweet').value;
    const li = document.createElement('li');
    if (tweet !== '' && !tweet.includes('\n')) { 
        // li.innerHTML = `${tweet} <span class="remove-tweet" data-cross="remove">X</span>`;
        li.innerHTML = `${tweet} <i class="remove-tweet far fa-times-circle" data-cross="remove"></i>`;
        tweetListContainer.appendChild(li);
        setLocalStorage(tweet);
        document.getElementById('tweet').value = '';
    }
}

function setLocalStorage(tweet) {
    let storageTweets = localStorage.getItem('names');
    if (storageTweets === null) {
        storageTweets = [];
        storageTweets.push(tweet);
        let arrayStringified = JSON.stringify(storageTweets);
        localStorage.setItem('names', arrayStringified);
    } else {
        let storageTweetsParsed = JSON.parse(storageTweets);
        storageTweetsParsed.push(tweet);
        let storageStringified = JSON.stringify(storageTweetsParsed);
        localStorage.setItem('names', storageStringified);
    }
}

function showLocalStorage() {
    let tweets = JSON.parse(namesTexts);
    for (let tweet of tweets) {
        let li = document.createElement('li');
        // li.innerHTML = `${tweet} <span class="remove-tweet" data-cross="remove">X</span>`;
        li.innerHTML = `${tweet} <i class="remove-tweet far fa-times-circle" data-cross="remove"></i>`;
        tweetListContainer.appendChild(li);
    }
}
showLocalStorage()