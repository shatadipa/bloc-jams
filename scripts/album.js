var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
        ;

    var $row = $(template);

    var clickHandler = function () {
        var songNumber = parseInt($(this).attr('data-song-number'));

        // if (currentlyPlayingSongNumber !== null) {
        //     var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
        //     currentlyPlayingCell.html(currentlyPlayingSongNumber);
        // } 

        // if (currentlyPlayingSongNumber !== songNumber) {
        //     $(this).html(pauseButtonTemplate);
        //     currentlyPlayingSongNumber = songNumber;
        //     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        //     updatePlayerBarSong();
        // } else if (currentlyPlayingSongNumber === songNumber) {
        //     $(this).html(playButtonTemplate);
        //     $('.main-controls .play-pause').html(playerBarPlayButton);
        //     currentlyPlayingSongNumber = null;
        //     currentSongFromAlbum = null;
        // }

        if (currentlyPlayingSongNumber === null) {
            $(this).html(pauseButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPauseButton);
            setSong(songNumber);
            currentSoundFile.play();
            updatePlayerBarSong();
        } else {
            if (currentlyPlayingSongNumber !== songNumber) {
                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                currentlyPlayingCell.html(currentlyPlayingSongNumber);
                $(this).html(pauseButtonTemplate);
                setSong(songNumber);
                currentSoundFile.play();
                updatePlayerBarSong();
            } else if (currentlyPlayingSongNumber === songNumber) {
                if (currentSoundFile.isPaused()) {
                    currentSoundFile.play();
                    $(this).html(pauseButtonTemplate);
                    $('.main-controls .play-pause').html(playerBarPauseButton);  
                } else {
                    currentSoundFile.pause();
                    $(this).html(playButtonTemplate);
                    $('.main-controls .play-pause').html(playerBarPlayButton);
                }
            }
        }
    };

    var onHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setSong = function (songNumber) {
    if(currentSoundFile){
        currentSoundFile.stop();
    }
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentlyPlayingSongNumber = songNumber;
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
     setVolume(currentVolume);
};

var getSongNumberCell = function (number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var updatePlayerBarSong = function () {
    var $songName = $('.song-name');
    var $artistSongName = $('.artist-song-mobile');
    var $artistName = $('.artist-name');

    $songName.text(currentSongFromAlbum.name);
    $artistName.text(currentAlbum.artist);
    $artistSongName.text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var setCurrentAlbum = function (album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function (album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function () {
    if (currentlyPlayingSongNumber === null) {
        return;
    }
    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    currentlyPlayingCell.html(currentlyPlayingSongNumber);
    if (currentlyPlayingSongNumber < currentAlbum.songs.length) {
        currentlyPlayingSongNumber++;
    } else {
        currentlyPlayingSongNumber = 1;
    }
    var nextPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    nextPlayingCell.html(pauseButtonTemplate);
    setSong(currentlyPlayingSongNumber);
    currentSoundFile.play();
    updatePlayerBarSong();
};


var previousSong = function () {
    if (currentlyPlayingSongNumber === null) {
        return;
    }
    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    currentlyPlayingCell.html(currentlyPlayingSongNumber);
    if (currentlyPlayingSongNumber > 1) {
        currentlyPlayingSongNumber--;
    } else {
        currentlyPlayingSongNumber = currentAlbum.songs.length;
    }
    var previousPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    previousPlayingCell.html(pauseButtonTemplate);
    setSong(currentlyPlayingSongNumber);
    currentSoundFile.play();
    updatePlayerBarSong();
};

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
 var currentVolume = 80;
var currentAlbum = null;

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
    $('.next').click(nextSong);
    $('.previous').click(previousSong);
});
