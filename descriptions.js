var writtenTweet_array = []; //global array used by multiple functions.

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//let writtenTweet_array = [];
	let tweetIndex = 1;
	tweet_array.forEach(element => {
		if (element.written) 
		{
			writtenTweet_array.push({
				tweetNumber: tweetIndex,
				activityType: element.activityType,
				tweet: element.tweet_text,
				link: element.linkWithAnchorTag,
				tweet_withClickableLinks: element.tweet_textWithClickableHyperlinks
			});
			tweetIndex++;
		}
	});
	//console.log('writtenTweet_array: ');
	//console.log(writtenTweet_array);
	//console.log('');
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	// update searchText span
	// console.log('search box event');
	// $('#searchText').text( $('#textFilter').val() );
	// let searchText = $('#searchText').text();
	// console.log(searchText);

	//test global array
	//console.log('print global array: ');
	/*writtenTweet_array.forEach(element => {
		console.log(element);
	});*/
	let searchText = document.getElementById('textFilter').innerText;
	//use filter on written tweet array. Filter on search text
	let filtered_Array = [];
	//console.log('filtered_Array.length: ' + filtered_Array.length);
	if (searchText != "")
	{
		filtered_Array = writtenTweet_array.filter(element => {
			if(element.tweet.includes(searchText))
			{
					return element;
			}
	
		});
	}
	//console.log(filtered_Array);
	//update search count span
	//$('#searchCount').text(filtered_Array.length);
	document.getElementById('searchCount').innerText = filtered_Array.length;
	document.getElementById('searchText').innerText = searchText;

	//update table
	//let tweetTableElem = $('#tweetTable');
	let tweetTableElem = document.getElementsByClassName('table table-striped')[0];
	tweetTableElem.empty();
	if (searchText == "")
	{
		tweetTableElem.empty();
	}
	//create a table row with table data elements for each item in the filtered array
	filtered_Array.forEach(element => {
		let markup = "<tr>";
		let tweetNum = "<td>"+element.tweetNumber+"</td>"; 
		markup+=tweetNum;
		let activityType = "<td>"+element.activityType+"</td>"; 
		markup+=activityType;
		//let tweet = "<td>"+element.tweet+"</td>"; 
		let tweet = "<td>"+element.tweet_withClickableLinks+"</td>"; 
		markup+=tweet;
		markup+="</tr>"

		tweetTableElem.append(markup);
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});