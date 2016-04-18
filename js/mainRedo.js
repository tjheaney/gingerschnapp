// put this into a JSON file, load it up via AJAX
var posts = [];
var old_hash = window.location.hash;
var new_hash = '';
var hash;
// End of var data

function toggle(target) {
    if (target.getAttribute('class') == 'col-xs-12 col-sm-4 col-md-3 open') {
    	target.setAttribute('class', 'col-xs-12 col-sm-4 col-md-3 closed');
    } else {
    	target.setAttribute('class', 'col-xs-12 col-sm-4 col-md-3 open');
    }
}

function add_topics(my_posts) {
	// create empty topic array
	var topics = [];
	// iterate through posts for topics
	for (var postIndex = 0; postIndex < my_posts.length; postIndex++) {
		if (typeof topics[my_posts[postIndex].topic] === 'undefined') {
			topics[my_posts[postIndex].topic] = {name: my_posts[postIndex].topic, posts: []};
		}
		topics[my_posts[postIndex].topic].posts.push(my_posts[postIndex]); //dump into topics post array
	}
	for (var topic in topics) {
		var row = $('<div class="row" id="' + topic + 'Row"></div>');
		$('#posts').append(row);
		$(row).append('<h2 class="capitalize" id="' + topic + '">' + topic + '</h2>');
	}
}

function populate_articles(my_posts) {
	// iterate through posts
	for (var i = 0; i < my_posts.length; i++) {
		// create article element
		var article = document.createElement("article");
		article.setAttribute("class", "col-xs-12 col-sm-4 col-md-3 closed");
		article.setAttribute("content", my_posts[i].content);
		
		article.onclick = function() { toggle(this); };
		//article.addEventListener("click", toggle(event));
		
		// Create <h3> and add to article
		var header = document.createElement("h3");
		header.textContent = my_posts[i].title;
		article.appendChild(header);
		var paragraph = document.createElement("p");
		paragraph.innerHTML = my_posts[i].content;
		article.appendChild(paragraph);
		// Create <img> and add to article
		var img = document.createElement("img");
		img.setAttribute("src", my_posts[i].img);
		img.setAttribute("alt", my_posts[i].title + ' preview');
		img.setAttribute("class", "hicon thumbnail");
		article.appendChild(img);
		// get topic
		var topicRow = my_posts[i].topic + 'Row';
		// Add child element (article) to the parent topic
		var test = document.getElementById(topicRow).appendChild(article);
		// get categories for this article.
		var categories = my_posts[i].categories;
		for (var category in categories){
			// Create the unordered parent list
			var unorderedList = document.createElement("ul");
			// Create list items for unordered list
			var listItem = document.createElement("li");
			var listAnchor = document.createElement("a");
			listAnchor.textContent = categories[category];
			listAnchor.href = '#' + categories[category];
			//console.log(category);
			// Appending to article
			listItem.appendChild(listAnchor);
			unorderedList.appendChild(listItem);
			article.appendChild(unorderedList);
		}
	}
}

function get_posts_by_category(cat) {
	var posts_by_category = [];
	if (cat !== '') {
  	for (var i = 0; i < posts.length; i++) {
  		if (posts[i].categories.indexOf(cat) > -1) {
  			posts_by_category.push(posts[i]);
  		}
  	}
	} else {
	  posts_by_category = posts;
	}
	return posts_by_category;
}

function get_hash() {
  $('#posts').empty();
  new_hash = window.location.hash;
  var my_posts = get_posts_by_category(new_hash.replace('#', ''));
  add_topics(my_posts);
	populate_articles(my_posts);
}

// pulls JSON file for posts
$.ajax('posts.json', {
  complete: function(data) {
    posts = data.responseJSON;
    window.onhashchange = get_hash;
    get_hash();
  }
});