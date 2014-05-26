var musicApp = {}; //initialize the whole thing
// musicApp.apikey = "ca9e8d4ca1654681bf351d34a1724434";
var test;

musicApp.init = function(){ //defines the function that init at bottom is calling
	//code for everything
	$("#enterArtist").on("keypress", function(e){
		if (e.which == 13){ //detecting which key is pressed, looking for 13 (enter)
			e.preventDefault(); //prevents the default action which is a submit
			musicApp.makeRequest(); //makes request to ajax
		}
	});
	$("#submitButton").on("click", function(){ //detecting the click of the button
			musicApp.makeRequest();
	}); //closes the first function
}; //closes init

musicApp.makeRequest = function(){ //create a varaible makeRequest to store the ajax call, can call it whenever 
		var artistType = $("#enterArtist").val();//whatever user inputs into field, store in enterArtist to use for API call + .val <--b/c!?!
		$.ajax({ //this accesses the LastFM API
			url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + artistType + '&api_key=19c8474879b1f43e74bf60f4467408f7&format=json',
			type: 'GET',
			dataType: 'jsonp',
			success: function(response){
            //pass the artists directly to the function --> object containing a variable artist and is an array of artists
			musicApp.displayPieces(response.similarartists.artist);
			}
		}); //closes ajax	
	}	

musicApp.displayPieces = function(similarartists_array){ 
	var artist_text = "";
    for (var counter=0; counter < 3; counter++ ){
        var random_number = Math.floor(Math.random()*similarartists_array.length);
        var url = 'http://'+similarartists_array[random_number].url;
        artist_text += '<a href='+ url + '>' + similarartists_array[random_number].name + '</a>' + " or ";
    }
    artist_text = artist_text.substr(0,artist_text.length -4);
    $('#ajax_response_span').html(artist_text);

};

$(function() {
	musicApp.init();
});

