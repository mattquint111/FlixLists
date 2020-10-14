import {signIn, signUp} from "./authentication/auth.js"

// initial variables
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305";
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`

const favoritesList = document.getElementById("favoritesList")
const watchedList = document.getElementById("watchedList")
const watchLaterList = document.getElementById("watchLaterList")

let user = firebase.auth().currentUser;

if (user) {
    //signed in
} else {
    //not signed in
}

let testUser = db.collection('users').doc("mX56MYienWOIgi6VEQRZy5eOlnw1")

testUser.get().then(function(doc) {
    if (doc.exists) {

        const favorites = doc.data().favorites
        const watched = doc.data().watched
        const watchLater = doc.data().watchLater

        createPlaylist(favoritesList, favorites)
        createPlaylist(watchedList, watched)
        createPlaylist(watchLaterList, watchLater)

        
    }
}) 

function createPlaylist(playlistName, playlistArray) {
    for (let i = 0; i < playlistArray.length; i++) {
        let movie = playlistArray[i]
        let movieData = `
        <div class="posterContainer">
            <img class="moviePoster" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="movie poster" id=${movie.id}>
        </div>
        `

        let movieObject = document.createElement('div')
        movieObject.classList.add('movieObject')
        movieObject.innerHTML = movieData
        playlistName.appendChild(movieObject)
    }
}

document.onclick = function(e) {
    const target = e.target
    // console.log(e.target.id)
    if (target.tagName.toLowerCase() === "img") {
        const movieContent = target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
        movieContent.classList.add("content-display")
        const id = target.id

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0310c1a97f001b72c2466fdfc9e4f305`)
            .then(res => res.json())
            .then(data => {
                const title = data.original_title
                const overview = data.overview
                const date = data.release_date
                const runtime = data.runtime
                const genre = data.genres[0].name
                console.log(genre)
                let movieInfo = `
                <i class="fas fa-times" id="closeContent"></i>                
                <h1 class="extraDataTitle"><b>${title}</b></h1>
                <h2 class="extraDataDate">Release Date: ${date}</h2>
                <h3 class="extraDataRuntime">Runtime: ${runtime} min</h3>
                <h3 class="extraDataGenre">Genre: ${genre}</h3>
                <hr>
                <p class="extraDataOverview"><em>${overview}</em></p>
                `

                movieContent.innerHTML = movieInfo
                movieContent.classList.add('content-display')

                const closeContentBtn = document.getElementById("closeContent")
                closeContentBtn.addEventListener("click", function() {
                    this.parentElement.classList.remove('content-display')
                })
            })

    }
}