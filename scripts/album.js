//Example Albums
var albumPicasso = {
    title: "The Colors",
    artist: "Pablo Picasso",
    label: "Cubism",
    year: "1981",
    albumArtUrl: "assets/images/album_covers/01.png",
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]

};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' }
    ]
};


var albumArijit = {
    title: 'Hindi songs',
    artist: 'Arijit',
    label: 'EM',
    year: '2016',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Rabta', duration: '1:01' },
        { title: 'Amaro Porano', duration: '3:57' },
        { title: 'suno na sangmarmar', duration: '5:01' },
        { title: 'kyu ki tum hi ho', duration: '3:21' },
        { title: 'khul kabhi to', duration: '4' },
        { title: 'Phir leya ', duration: '6' }
    ]
};


/**
 * Method to create a row template for a single song in the album. 
 * This will be run in a loop for displaying all the songs
 */
var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
        + '</tr>';

    return template;
};

/**
 * Given an album sets it as the current album. This method will render the current album into the page.
 * It updates the title, artist, relase info, image and song list of the current album into the page.
 * 
 * It runs a loop over all the songs in the album and calls createSongRow for each of them.
 */
var setCurrentAlbum = function (album) {
    var albumTitle = document.getElementsByClassName("album-view-title")[0];
    var albumArtist = document.getElementsByClassName("album-view-artist")[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = "";

    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML = albumSongList.innerHTML + createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

/**
 * Given an element and a classname, this method finds the nearest parent of the element which has the classname as its class
 * The method starts looking at the immediate parent and keeps moving upward until it finds a parent with the given classname.
 * If no such parent is found an alert is displayed to the user
 */
var findParentByClassName = function (element, classname) {
    var parent = element.parentElement;
    if (!parent) {
        alert('No parent found');
        return;
    }
    while (parent) {
        if (parent.getAttribute("class") === classname) {
            return parent;
        }
        parent = parent.parentElement;
    }
    alert('No parent found with that class name');
};


/**
 * Given any element for a song row, be it entire row, cell, children of the cell this method always returns the first cell of the table which is the song number cell.
 * If the passed element is song-item-number itself, return the passed element itself. If the passed elements are one of the sibling cells, i.e. song-item-title/song-item-duration,
 * go to the parent and return its first child which is the song-item-number cell. The last case handles any child element of the cells (e.g. the play button and play icon). 
 * In this case move to the nearest parent with album-view-song-item class using findParentByClassName method above. This would find the table row. Now find the first child of this
 * row and return it which is the song-item-number cell again.   
 */
var getSongItem = function (element) {
    switch (element.getAttribute("class")) {
        case 'song-item-number':
            return element;

    
        case 'song-item-title':
            return element.parentElement.children[0];

        case "song-item-duration":
            return element.parentElement.children[0];

        case "album-view-song-item":
            return element.children[0];

        default:
            return findParentByClassName(element, "album-view-song-item").children[0];
    }
};

//1.If currently playing song is null,then assign the pause template.Meaning if no song is playing,play a song and assign the template.also store the song number in the data-song-number attribute.
//2.Ifyou click an already playing song,then assign the play template to the song,the song gets paused.
//3.If currently playing song is not clicked and some other song is clicked.
var clickhandler = function (element) {
    var songItem = getSongItem(element);
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute("data-song-number");
    } else if (currentlyPlayingSong === songItem.getAttribute("data-song-number")) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute("data-song-number")) {
        //find a td(first column) of the currently playing song
        var currentlyplayingsongelement = document.querySelector("td[data-song-number='" + currentlyPlayingSong + "']");
        //now we have to pause this song because we have to start another song.After pausing,we have to replace the first td with number(data -song-number).
        currentlyplayingsongelement.innerHTML = currentlyPlayingSong;
        //new song
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute("data-song-number");
    }
};

// Song list container table
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

// Song list table rows
var songRows = document.getElementsByClassName("album-view-song-item");

// Song number table cells
var songNumbers = document.getElementsByClassName("song-item-number");

// Variable to keep track of currently playing song. When the page loads, no song is playing hence null initially
var currentlyPlayingSong = null;

// Templates for play and pause buttons. They have ionicons for play and pause symbols
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

/**
 * When the window loads set the albums and attach all the event handlers.
 */
window.onload = function () {
    // Array of all the albums
    var albums = [albumPicasso, albumMarconi, albumArijit];

    // When the page loads initially the first album is displayed by default and set as current selection
    var currentSelection = 0;
    setCurrentAlbum(albums[currentSelection]);

    // On mouse over any row in songs table, find the table cell that displays song-item-number and 
    // if the song is not currently playing change the icon to play button
    songListContainer.addEventListener('mouseover', function (event) {
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute("data-song-number");
        if (songItemNumber !== currentlyPlayingSong) {
            songItem.innerHTML = playButtonTemplate;
        }
    });

    // For every row in the songs table add an event handler for mouse leave, find the table cell that displays song-item-number and 
    // if the song is not playing change the icon back to display song number
    // Also add an event listener for click event in which case call the clickHandler method which takes care of playing the song and changing icons as required
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener("mouseleave", function () {
            //  this.children[0].innerHTML = this.children[0].getAttribute("data-song-number");
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute("data-song-number");
            if (currentlyPlayingSong !== songItemNumber) {
                songItem.innerHTML = songItemNumber;
            }
        });

        songRows[i].addEventListener("click", function (event) {
            clickhandler(event.target);
        });
    }

    // Find  the album cover element. Add an event listener for click on album cover to cycle through the different albums in the albums array.
    // Once the end of albums array is reached again cycle from the first album in the array.

    var albumCover = document.getElementsByClassName("album-cover-art")[0];
    albumCover.addEventListener("click", function () {
        currentSelection++;
        if (currentSelection == albums.length) {
            currentSelection = 0;
        }
        setCurrentAlbum(albums[currentSelection]);
    });
};




