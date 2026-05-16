/*
Lab: Final Project
Author: Ford Stone
Date: 6/2/25
*/

// event handler with function for selecting item form dropdown menu
$(".dropdown-item").on("click", function(){
    // make all other dropdown buttons not active
    $(this).siblings().removeClass("active");

    // make this dropdown item active
    $(this).addClass("active");
    
    // Set the dropdown buttons text to be the same as the dropdown item
    let selectionText = $(this).text() 
    $(this).parent().prev().text(selectionText);
});

// event handler function for searching a moive and filling in the cards when search is clicked
$("#searchBtn").on("click", () => {
    // get search and clear the searchbar
    let search = $("#searchBar").val();
    $("#searchBar").val("");

    // get type
    let type = $("#searchTypeDropdown").text();

    //format the search string for the API request
    search = search.replace(" ","%20");

    //wowie look
    omdbRequestAndLoadCards(search,type);
    console.log("b");
});

// function for ombd Ajax request
async function omdbRequestAndLoadCards(searchTerm,searchType) {
    try {
        // make the request
        //link for testing: https://www.omdbapi.com/?s=star%20wars&type=Movie&apikey=130d2b6b
        let response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&type=${searchType}&apikey=130d2b6b`);
        if (response.ok){
            let result = await response.json();

            loadResultsIntoCards(result);
        }
    }
    catch(err){ // if the search did not work... 
        console.log(err);
        alert("invalid search!");
    }
    console.log("a");
}


// function to load results into cards. This is called after fetching the data form OMDb is sucessful 
function loadResultsIntoCards(result) {
    $("#movieResults").hide();

    // load data into cards 
    let newhtml = "";
    for (movie of result.Search){
        // generate link to IMDB
        let IMDbLink = "https://www.imdb.com/title/" + movie.imdbID;

        // load all info into cards
        newhtml += `
            <div class='col mb-3'>
                <div class='card'>
                <img src='${movie.Poster}' class='card-img-top' alt='...'>
                <div class='card-body'>
                    <h5 class='card-title'>${movie.Title}</h5>
                    <ul class='list-group list-group-flush'>
                        <li class='list-group-item'>Type: ${movie.Type}</li>
                        <li class='list-group-item'>Year: ${movie.Year}</li>
                        <a class="link-opacity-100" href="${IMDbLink}" target="_blank">View on IMDb</a>
                    </ul>
                </div>
                </div>
            </div>
        `;
    }

    // update the movie results elemnt and slide it down
    $("#movieResults").html(newhtml);
    $("#movieResults").slideDown(500);
}