// Variables
const tweetList = document.getElementById('tweet-list');


// Event Listeners
eventListener();

function eventListener() {
    document.querySelector('#form').addEventListener('submit', newTweet);
    document.body.addEventListener('click', removeTweet);
    document.addEventListener('DOMContentLoaded', localStorageOnload);
}


// Functions
function newTweet(e) {
    e.preventDefault(); // Prevent the form from loading on submit
    // Create 'li' element 
    const tweet = document.getElementById('tweet').value;
    if (tweet === '') return;
    const li = document.createElement('li');
    li.textContent = tweet;
    // Create a button with text 'X'
    const removeButton = document.createElement('a');
    removeButton.classList = 'remove-tweet';
    removeButton.textContent = 'X';
    li.appendChild(removeButton); // Add the button as li child
    tweetList.appendChild(li); // Add the li to the list div
    document.getElementById('tweet').value = '';
    addTweetLocalStorage(tweet);
    alert('Tweet Added');
    this.reset();
}

function addTweetLocalStorage(tweet) {
    let tweets = getTweetFromStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
function getTweetFromStorage() {
    let tweets;
    const tweetLS = localStorage.getItem('tweets');

    if(tweetLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetLS);
    }
    return tweets;
}
function removeTweet(e) {
    // if (e.target.tagName === 'A') {
    //     e.target.parentElement.remove();
    // }
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
        removetweetFromLocalStorage(e.target.parentElement.textContent);
    }
}
function localStorageOnload() {
    let tweets = getTweetFromStorage();
    tweets.forEach(tweet => {
        const li = document.createElement('li');
        li.textContent = tweet;
        // Create a button with text 'X'
        const removeButton = document.createElement('a');
        removeButton.classList = 'remove-tweet';
        removeButton.textContent = 'X';
        li.appendChild(removeButton); // Add the button as li child
        tweetList.appendChild(li); // Add the li to the list div
    });
}
function removetweetFromLocalStorage(tweet) {
    let tweets = getTweetFromStorage();
    const tweetDelete = tweet.substring(0, tweet.length - 1);
    tweets.forEach((tweetLS, index) => {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
}
