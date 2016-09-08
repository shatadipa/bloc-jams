//Example Album
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

//another album
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
        { title: 'suno na sangmarmar', duration: '5:01' },
        { title: 'kyu ki tum hi ho', duration: '3:21' },
        { title: 'khul kabhi to', duration: '4' },
        { title: 'Phir leya ', duration: '6' }
    ]
};



var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
        ;

    return template;
};





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

//get the nearest parent with given classname
var findParentByClassName = function (element, classname) {
    var parent = element.parentElement;
    if(!parent){
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

var getSongItem = function (element) {
    switch (element.getAttribute("class")) {
        case 'song-item-number':
            return element;

        case 'song-item-title':
            return element.parentElement.children[0];
        //Alternatively
        // return findParentByClassName(element,'album-view-song-item').children[0]; 

        case "song-item-duration":
            return element.parentElement.children[0];

        case "album-view-song-item":
            return element.children[0];

        default:
            return findParentByClassName(element, "album-view-song-item").children[0];
    }

};


var clickhandler = function (element) {
    var songItem = getSongItem(element);
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute("data-song-number");
    } else if (currentlyPlayingSong === songItem.getAttribute("data-song-number")) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute("data-song-number")) {
        var currentlyplayingsongelement = document.querySelector("td[data-song-number='" + currentlyPlayingSong + "']");
        currentlyplayingsongelement.innerHTML = currentlyPlayingSong;
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute("data-song-number");
    }

};


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName("album-view-song-item");
var songNumbers = document.getElementsByClassName("song-item-number");
var currentlyPlayingSong = null;

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';



window.onload = function () {
    var albums = [albumPicasso, albumMarconi, albumArijit];

    //set the first album to 0.
    var currentSelection = 0;
    setCurrentAlbum(albums[currentSelection]);


    songListContainer.addEventListener('mouseover', function (event) {
        //delegating from table to td.
        //event.target is td.parent is tr.Take that tr.Put the 
        //   console.log(event.target);

        // if (event.target.parentElement.className === 'album-view-song-item') {
        //  event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        // }

        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute("data-song-number");
        if (songItemNumber !== currentlyPlayingSong) {
            songItem.innerHTML = playButtonTemplate;
        }
    });




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








    var albumCover = document.getElementsByClassName("album-cover-art")[0];
    albumCover.addEventListener("click", function () {
        currentSelection++;
        if (currentSelection == albums.length) {
            currentSelection = 0;
        }
        setCurrentAlbum(albums[currentSelection]);
    });
};




