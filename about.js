/*
	retrieve tweets and then compute statistics
*/
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	} 

	//retrieve tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	var numberOfTweets = tweet_array.length;
	document.getElementById('numberTweets').innerText = numberOfTweets;	

	//Tweet Dates (1 point)
	//Find the earliest and latest Tweets in the set, and then update the spans.
	//Use Month, Day, and Year format exp: Monday, October 14, 2019
	//for options use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	var firstTweetElement= tweet_array[0].time.toLocaleDateString('en-US', options);
	var lastTweetElement = tweet_array[tweet_array.length-1].time.toLocaleDateString('en-US', options);
	document.getElementById('firstDate').innerText = firstTweetElement;	
	document.getElementById('lastDate').innerText = lastTweetElement;	

	//Tweet Categories (1 point)
	//The tweets can be divided into four categories:
	var completedEventCount = 0;
	var liveEventCount = 0;
	var achievementCount = 0;
	var miscellaneousCount = 0;
	tweet_array.forEach(element => {
		if(element.source==="completed_event") { completedEventCount++; }
		else if(element.source==="live_event") { liveEventCount++; }
		else if(element.source==="achievement") { achievementCount++; }
		else if(element.source==="miscellaneous") { miscellaneousCount++; }
	});
	document.getElementsByClassName('completedEvents')[0].innerText = completedEventCount;
	document.getElementsByClassName('liveEvents')[0].innerText = liveEventCount;	
	document.getElementsByClassName('achievements')[0].innerText = achievementCount;	
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneousCount;	

	var completedEventPct = ((completedEventCount/numberOfTweets)*100).toFixed(2);
	var liveEventPct = ((liveEventCount/numberOfTweets)*100).toFixed(2);
	var achievementPct = ((achievementCount/numberOfTweets)*100).toFixed(2);
	var misscellaneousPct = ((miscellaneousCount/numberOfTweets)*100).toFixed(2);
	document.getElementsByClassName('completedEventsPct')[0].innerText = completedEventPct;	
	document.getElementsByClassName('liveEventsPct')[0].innerText =  liveEventPct;	
	document.getElementsByClassName('achievementsPct')[0].innerText = achievementPct;	
	document.getElementsByClassName('miscellaneousPct')[0].innerText = misscellaneousPct;	

	//User Written Tweets (1 point)
	//Some of the Tweets in each category also contain text written by the user. 
	var userWrittenTweetCount = 0;
	tweet_array.forEach(element => {
			if( element.written ) {
				userWrittenTweetCount++;
			}
	});		
	document.getElementsByClassName('completedEvents')[1].innerText = completedEventCount;
	document.getElementsByClassName('written')[0].innerText = userWrittenTweetCount;
	
	var userWrittenTweetPct = ((userWrittenTweetCount/numberOfTweets)*100).toFixed(2);
	document.getElementsByClassName('writtenPct')[0].innerText = userWrittenTweetPct;

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});