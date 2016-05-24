(function() {
    
    var app = angular.module("site", []);
    
    app.controller("SiteController", function() {
        
        this.songs = songData;
        this.tabActive = 0;
        
    });
    
    //assets
    var songData = [
        {
            displayName: "Neu 9",
            mp3FileName: "sound/neu9.mp3",
            oggFileName: "sound/neu9.ogg",
        },
        {
            displayName: "Neu 5",
            mp3FileName: "sound/neu5.mp3",
            oggFileName: "sound/neu5.ogg",
        },
        {
            displayName: "Song 3",
            mp3FileName: "sound/song3.mp3",
            oggFileName: "sound/song3.ogg",
        },
        {
            displayName: "Song 4",
            mp3FileName: "sound/song4.mp3",
            oggFileName: "sound/song4.ogg",
        },
    ];
    
})();

