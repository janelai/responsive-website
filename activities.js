function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let activityTypeHashMap = new Object();
	activityTypeHashMap['running'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['walking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['biking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['mountain biking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['hiking'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['activity'] = {count: 0, total_distance: 0 };
	activityTypeHashMap['swimming'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['chair riding'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['skiing'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['yoga'] = { count: 0, total_distance: 0 };
	activityTypeHashMap['workout'] = { count: 0, total_distance: 0};
	activityTypeHashMap['freestyle'] = { count: 0, total_distance: 0};

	//Determining activity type and distance (2 points)
	//get activity type counts and total distance
	tweet_array.forEach(element => {
		if(element.activityType==="running"){ 
			activityTypeHashMap['running'].count++;
			activityTypeHashMap['running'].total_distance+=element.distance;
		}
		else if(element.activityType==="walking"){ 
			activityTypeHashMap['walking'].count++; 
			activityTypeHashMap['walking'].total_distance+=element.distance;
		}
		else if(element.activityType==="biking"){ 
			activityTypeHashMap['biking'].count++;
			activityTypeHashMap['biking'].total_distance+=element.distance;
		}
		else if(element.activityType==="mountain biking"){ 
			activityTypeHashMap['mountain biking'].count++;
			activityTypeHashMap['mountain biking'].total_distance+=element.distance;
		}	
		else if(element.activityType==="hiking"){ 
			activityTypeHashMap['hiking'].count++;
			activityTypeHashMap['hiking'].total_distance+=element.distance;
		}
		else if(element.activityType==="activity"){ 
			activityTypeHashMap['activity'].count++;
			activityTypeHashMap['activity'].total_distance+=element.distance;
		}
		else if(element.activityType==="swimming"){ 
			activityTypeHashMap['swimming'].count++;
			activityTypeHashMap['swimming'].total_distance+=element.distance;
		}
		else if(element.activityType==="chair riding"){ 
			activityTypeHashMap['chair riding'].count++;
			activityTypeHashMap['chair riding'].total_distance+=element.distance;
		}
		else if(element.activityType==="skiing"){ 
			activityTypeHashMap['skiing'].count++;
			activityTypeHashMap['skiing'].total_distance+=element.distance;
		}
		else if(element.activityType==="yoga"){ 
			activityTypeHashMap['yoga'].count++;
			activityTypeHashMap['yoga'].total_distance+=element.distance;
		} 
		else if(element.activityType==="workout"){
			activityTypeHashMap['workout'].count++;
			activityTypeHashMap['workout'].total_distance+=element.distance;
		}
		else if(element.activityType==="freestyle"){
			activityTypeHashMap['freestyle'].count++;
			activityTypeHashMap['freestyle'].total_distance+=element.distance;
		}
	});

	//People logged most 1st, 2nd, 3rd type of activites
	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let activityTypeArray = [];
	for(let key in activityTypeHashMap){
		activityTypeArray.push({
				activity: key,
				count: activityTypeHashMap[key].count,
				totalDistance: activityTypeHashMap[key].total_distance
		});
	}

	//sort array by count //sort is in ascending order (small-->large)
	let activityTypeArraySortedByCount = activityTypeArray.sort( function(a, b) {
		return (a.count > b.count) ? 1: ((b.count > a.count) ? -1 : 0)
	});
	
	//get count of all of the different activity types
	let differentTypeOfActivitiesCount = 0;
	activityTypeArraySortedByCount.forEach(element => {
		//test sorting 
		if(element.count>0){
			differentTypeOfActivitiesCount++;
		}
	});
	document.getElementById('numberActivities').innerText = differentTypeOfActivitiesCount;	

	//get the top three activies //array is sorted in ascending order, so the largest values are at the end of the array
	let firstActivity = "";
	let secondActivity = "";
	let thirdActivity = "";
	firstActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].activity;
	secondActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].activity;
	thirdActivity = activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].activity;
	
	document.getElementById('firstMost').innerText = firstActivity;	
	document.getElementById('secondMost').innerText = secondActivity;	
	document.getElementById('thirdMost').innerText = thirdActivity;	

	//longest distance and the shortest distance
	//will take the average distance of each of the top three activities
	let firstActivityAvg = 0.0;
	let secondActivityAvg = 0.0;
	let thirdActivityAvg = 0.0;
	firstActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-1].count).toFixed(2) );

	secondActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-2].count).toFixed(2) );

	thirdActivityAvg = parseFloat( (activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].totalDistance / activityTypeArraySortedByCount[activityTypeArraySortedByCount.length-3].count).toFixed(2) );


	//store top three activities into a hashmap
	let topThreeActivityHashMap = new Object();
	topThreeActivityHashMap['firstActivity'] = { activity: firstActivity, averageDistance: firstActivityAvg };
	topThreeActivityHashMap['secondActivity'] = { activity: secondActivity, averageDistance: secondActivityAvg };
	topThreeActivityHashMap['thirdActivity'] = { activity: thirdActivity, averageDistance: thirdActivityAvg };

	//can't sort hashmap, need to convert to array
	//https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let topThreeActivityArray = [];
	for(let key in topThreeActivityHashMap){
		topThreeActivityArray.push({
				activity: topThreeActivityHashMap[key].activity,
				averageDistance: topThreeActivityHashMap[key].averageDistance
		});
	}

	//then sort array by average distance in ascending order (small->large)
	let topThreeActivityArraySortedByAvgDistance = topThreeActivityArray.sort( function(a, b) {
		return (a.averageDistance > b.averageDistance) ? 1: ((b.averageDistance > a.averageDistance) ? -1 : 0)
	});
	
	let activityWithTheLongestAvgDistance = topThreeActivityArraySortedByAvgDistance[topThreeActivityArraySortedByAvgDistance.length-1].activity;
	let activityWithTheShortestAvgDistance = topThreeActivityArraySortedByAvgDistance[topThreeActivityArraySortedByAvgDistance.length-3].activity;

	document.getElementById('longestActivityType').innerText = activityWithTheLongestAvgDistance;	
	document.getElementById('shortestActivityType').innerText = activityWithTheShortestAvgDistance;	

	//longest activies on either  weekday or weekend 
	let weekdayCount = 0;
	let weekendCount = 0;
	tweet_array.forEach(element => { 
		if(element.activityType===activityWithTheLongestAvgDistance)
		{
			if(element.dayType==="weekday")
			{
				weekdayCount++;
			}
			else if (element.dayType==="weekend") 
			{
				weekendCount++;
			}
		}
	}); 

	if(weekdayCount>weekendCount)
	{
		document.getElementById('weekdayOrWeekendLonger').innerText = "weekdays";
	}
	else
	{
		document.getElementById('weekdayOrWeekendLonger').innerText = "weekends";
	}

	//create data for graphs below (vega-lite), just for the top three categories
	//for each of the top three activity types, the day and duration will be included.
	let dayOfWeekArray = [];
	tweet_array.forEach(element => {
		if((element.activityType===firstActivity) || 
		(element.activityType===secondActivity) ||
		(element.activityType===thirdActivity) ){
			dayOfWeekArray.push({
				activity: element.activityType,
				day: element.day,
				distance: element.distance
			});
		}
	});	

	//first graph: A plot of how many of each type of activity exists in the dataset.
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "width": 400,
	  "height": 400,
	  "data": {
	    "values": activityTypeArray
	  },
	  //TODO: Add mark and encoding
	  "selection": {
		"pts": {"type": "single", "on": "mouseover"}
		},
		"mark": "bar",
		"encoding": {
		"x": {"field": "activity", "type": "ordinal"},
		"y": {"field": "count", "type": "quantitative"},
		"color": {
			"condition": {
				"selection": "pts",
				"aggregate": "count", 
				"type": "quantitative"
			},
			"value": "grey"
		}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 700,
		"height": 400, 
	  "data": {
			//"values": tweet_array
			"values": dayOfWeekArray
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
				"on": "mouseover", "empty": "all"
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day of the week"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative"
			},
			"size": {
				"condition": {
					"selection": "paintbrush", "value": 300
				},
				"value": 50
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#e7ba52", "#c7c7c7", "#aec7e8"]
				},
				"legend": {"title": "Activity Type"}
			}
		}
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	//third graph: A plot of the distances by day of the week for all of the three most tweeted-about activities, aggregating the activities by the mean.
	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 700,
		"height": 400, 
	  "data": {
			//"values": tweet_array
			"values": dayOfWeekArray
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
				"on": "mouseover", "empty": "all"
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day of the week"}
			},
			"y": {
				"field": "distance",
				"aggregate": "mean",
				"type": "quantitative"
			},
			"size": {
				"condition": {
					"selection": "paintbrush", "value": 300
				},
				"value": 50
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#e7ba52", "#c7c7c7", "#aec7e8"]
				},
				"legend": {"title": "Activity Type"}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);

	/*
		event handler for button using jQuery
	*/
	//$("#distanceVis").hide();

	document.getElementById("distanceVisAggregated").style.visibility = "hidden";
	// $("distanceVisAggregated").hide();
	document.getElementById("aggregate").click(function(event) 
	{
		var aggregatebutton = document.getElementById("aggregate");
		if (aggregatebutton.innerText =="Show means") {
			document.getElementById("aggregate").innerText("Show all activities");
			document.getElementById("distanceVis").style.visibility = "hidden";
			document.getElementById("distanceVisAggregated").style.visibility = "visible";
		}
		else if (aggregatebutton.innerText =="Show all activities") 
		{
			document.getElementById("aggregate").innerText("Show means");
			document.getElementById("distanceVis").style.visibility = "visible";
			document.getElementById("distanceVisAggregated").style.visibility = "hidden";
		}
	});
});