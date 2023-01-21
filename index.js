import { tweetsData } from "./data.js";


const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', handleBtnClick)

document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {

        handleLike(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweet(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReply(e.target.dataset.reply)
    }

})

function handleBtnClick() {

    if (tweetInput.value.length > 2) {

        const userObj = {

            handle: `@KpSham`,
            profilePic: `images/troll.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: 'asdjasdj-q3423584u8hfsihe8',

        }
        tweetsData.unshift(userObj)
        console.log(userObj.uuid)
    }
    render()
}

function handleLike(tweetId) {

    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--

    }
    else {
        targetTweetObj.likes++

    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    console.log(targetTweetObj)
    getFeed()

}

function handleRetweet(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    targetTweetObj.isRetweeted ? targetTweetObj.retweets-- : targetTweetObj.retweets++
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    getFeed()

}

function handleReply(tweetId) {

    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')

}

function getFeed() {
    let getFeed = ``



    tweetsData.forEach(function (tweet) {
        let likeClass = ' '
        let retweetClass = ' '
        let getReplyFeed = ` `

        if (tweet.isLiked) {
            likeClass = 'liked'
        }

        if (tweet.isRetweeted) {
            retweetClass = 'retweeted'
        }


        if (tweet.replies.length > 0) {

            tweet.replies.forEach(function (reply) {

                getReplyFeed += `
            
               <div class="tweet-replies">
                    <div class="profile-pic">
                      <img src="${reply.profilePic}" class="user-profile-pic" alt="Tom cruise profile pic">
                     </div>
                    <div class="tweet-content">
                        <p class="profile-name">${reply.handle}</h3>
                        <p class="tweet-body">${reply.tweetText}</p>
                    </div>
                </div>
               `
            })
        }


        getFeed += `
        <div class="feed-section">
            <div class="tweet-div">
                <div class="profile-pic">
                    <img src="${tweet.profilePic}" class="user-profile-pic" alt="Tom cruise profile pic">
                </div>
                <div class="tweet-content">
                    <p class="profile-name">${tweet.handle}</h3>
                    <p class="tweet-body">${tweet.tweetText}</p>
                    <div class="tweet-data">
                        <span class="tweet-reply" id="tweet-reply">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-like" id="tweet-like" >
                        <i class="fa-solid fa-heart ${likeClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                        
                        </span>

                        <span class="tweet-retweet" id="tweet-retweet"  >
                        <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>
                </div>
            </div>    
            <div class="reply-tweets hidden" id ="replies-${tweet.uuid}">
                ${getReplyFeed}
            </div>
        </div>
    `
    })

    return getFeed
}



function render() {
    document.getElementById('feed').innerHTML = getFeed()
}

render()