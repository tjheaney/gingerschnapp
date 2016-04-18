


function insertHeader() {
  // TODO Make sure I have a DIV to append this to.
  
  $( '#header').appendChild(head);
}


function insertFooter() {
    
  	var foot = document.createElement("footer");
  	
  	var para = document.createElement("p");
		para.textContent = "© 2016 Thomas J. Heaney";
		foot.appendChild(para);
		/*TODO will need to add multiple classes for each icon for CSS*/
		var at = document.createElement("a"); //twitter
		at.setAttribute("href", "//www.twitter.com/gingerschnapp");
		at.setAttribute("class", "twit");
		foot.appendChild(at);
		
		var af = document.createElement("a"); //facebook
		af.setAttribute("href", "//www.facebook.com/lawlessjude");
		af.setAttribute("class", "face");
		foot.appendChild(af);
		
		var ap = document.createElement("a"); //pinterest
		ap.setAttribute("href", "//www.pinterest.com/judelawless");
		ap.setAttribute("class", "pin");
		foot.appendChild(ap);
		
		var ai = document.createElement("a"); //instagram
		ai.setAttribute("href", "//www.instagram.com/gingerschnapp");
		ai.setAttribute("class", "inst");
		foot.appendChild(ai);
    
    var footer = document.getElementById('footer'); //$( '#footer');
    footer.appendChild(foot);
}

$( document ).ready(function() {
  insertFooter();
});


$( document ).ready(function() {
    //insertHeader();
});