// put this into a JSON file, load it up via AJAX
var posts = [
	{
		"title":"Forbidden",
		"img": "img/painting1.jpg",
		"content": "Robbie the Robot, from Forbidden Planet. Acrylic on Canvas",
		"topic": "paintings",
		"categories": ["oil", "mixed"]
	},
	{
		"title":"My Painting 2",
		"img": "img/paint4.png",
		"content": "my painting description 2",
		"topic": "paintings",
		"categories": ["oil", "acrylic"]
	},
	{
		"title":"My Painting 3",
		"img": "img/paint4.png",
		"content": "my painting description 3",
		"topic": "paintings",
		"categories": ["oil"]
	},
	{
		"title":"My Painting 4",
		"img": "img/paint4.png",
		"content": "my painting description 4",
		"topic": "paintings",
		"categories": ["oil", "acrylic"]
	},
	{
		"title":"My Painting 5",
		"img": "img/paint4.png",
		"content": "my painting description 5",
		"topic": "paintings",
		"categories": ["oil"]
	},
	{
		"title":"My Painting 6",
		"img": "img/paint4.png",
		"content": "my painting description 6",
		"topic": "paintings",
		"categories": ["acrylic"]
	},
	{
		"title":"My Painting 7",
		"img": "img/paint4.png",
		"content": "my painting description 7",
		"topic": "paintings",
		"categories": ["watercolor"]
	},
	{
		"title":"My Painting 8",
		"img": "img/paint4.png",
		"content": "my painting description 8",
		"topic": "paintings",
		"categories": ["oil"]
	},
	{
		"title": "My Drawing 1",
		"img": "img/drawing1.jpg",
		"content": "This started as a random doodle. Inspired by Rob Zombie and Ed \"Big Daddy\" Roth. Simple pencil, outlined in ink. ",
		"topic": "drawings",
		"categories": ["pencil", "mixed"]
	},
	{
		"title": "My Drawing 2",
		"img": "img/drawing2.jpg",
		"content": "my drawing description 2",
		"topic": "drawings",
		"categories": ["pencil", "mixed"]
	},
	{
		"title": "My Drawing 3",
		"img": "img/drawing3.jpg",
		"content": "my drawing description 3",
		"topic": "drawings",
		"categories": ["pencil", "mixed"]
	},
	{
		"title": "My Drawing 4",
		"img": "img/drawing4.jpg",
		"content": "my drawing description 4",
		"topic": "drawings",
		"categories": ["pencil", "mixed"]
	},
	{
		"title": "My Drawing 5",
		"img": "img/drawing5.jpg",
		"content": "my drawing description 5",
		"topic": "drawings",
		"categories": ["pencil", "mixed"]
	}
],
old_hash = window.location.hash,
new_hash = '';

// get posts by category
function get_posts_by_category(cat) {
	var posts_by_category = [];
	
	for (var i = 0; i < posts.length; i++) {
		if (posts[i].categories.indexOf(cat) > -1) {
			posts_by_category.push(posts[i]);
		}
	}
	return posts_by_category;
}

// posts containing 'foo' as a category
// var my_posts = get_posts_by_category('foo');


function populate_articles(my_posts) {
	// clear out old posts
	$('#posts').empty();

	var topics = [];
	// iterate through posts for topics
	for (var i = 0; i < my_posts.length; i++) {
		if (typeof topics[my_posts[i].topic] === 'undefined') {
			topics[my_posts[i].topic] = {name: my_posts[i].topic, posts: []};
		}
		topics[my_posts[i].topic].posts.push(my_posts[i]); //dump into topics post array
		}
	
	
	
	for (var t in topics) {
		var row = $('<div class="row"></div>');
		$('#posts').append(row);
		$(row).append('<h2 class="capitalize">' + topics[t].name + '</h2>');
		}
	
		// iterate through categorized posts
	for (var i = 0; i < topics[t].posts.length; i++) {
			// create article element
		var article = $('<article class="col-xs-12 col-sm-4 col-md-3 closed"><h3>'
					+ topics[t].posts[i].title + '</h3><ul><p>'
					+ topics[t].posts[i].content + '</p></ul><img class="hicon thumbnail" src="'
					+ topics[t].posts[i].img + '"></article>'
					);
		
		$('h3', article).on('click', function(e) {
				for (var a = 0; a < $('article').length; a++) {
					if (a !== $(this).parent().index()) {
						var _this = $(this);
						$('article').eq(a).attr('class', 'col-xs-12 col-sm-4 col-md-3 closed modal');
					}
				}
				
				if ($(this).parent().hasClass('col-sm-4')) {
					$(this).parent().attr('class', 'col-xs-12 col-sm-12 col-md-12 open');
				} else {
					$(this).parent().attr('class', 'col-xs-12 col-sm-4 col-md-3 closed');
				}
			}); // line 151 has open ( for this
//		} else {
//
//				for (var a = 0; a < $('article').length; a++) {
//					if (a !== $(this).parent().index()) {
//						var _this = $(this);
//							$('article').eq(a).attr('class', 'col-xs-12 col-sm-4 col-md-3 open modal');
//						}
//					}
//				
//				if ($(this).parent().hasClass('col-sm-4')) {
//					$(this).parent().attr('class', 'col-xs-12 col-sm-12 col-md-12 closed');
//						} else {
//							$(this).parent().attr('class', 'col-xs-12 col-sm-4 col-md-3 open');
//						}
//				}
		
//		}			
		
// console.log(topics[t].posts[i].content);
			// populate categories into unordered list within the article  
for (var n = 0; n < topics[t].posts[i].categories.length; n++) {
		$('ul', article).append('<li><a href="#' + topics[t].posts[i].categories[n] + '">' + topics[t].posts[i].categories[n] + '</a></li>');
		
		// append article
		$(row).append(article);
		}
}
}



function check_hash() {
	new_hash = window.location.hash;
	
	if (new_hash !== old_hash) {
		var my_posts = get_posts_by_category(new_hash.replace('#', ''));
		populate_articles(my_posts);
		
		old_hash = new_hash;
	}
	
	setTimeout(check_hash, 250);
}

// get all posts
$('document').ready(function() {
	populate_articles(posts);
	if(old_hash !== '') {
		old_hash = '';
	}
	check_hash();
	
});
