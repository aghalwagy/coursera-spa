(function() {
        'use strict';

        angular.module('ArtistsApp', [])
            .controller('ArtitsController', artistsController)
            .service('ArtistsService', artistsService)
            .constant('ApiBasePath', "http://localhost:3300");

        artistsController.$inject = ['ArtistsService'];

        function artistsController(restService) {
            var ctrl = this;

            var promise = restService.getArtists();

            promise.then(function(res) {
                ctrl.artists = res.data;
            }).catch(function(err) {
                console.log('something horrible happened: ' + err);
            });

            ctrl.getSongs = function(artist) {
                var promise = restService.getSongs(artist);
                promise.then(function(res) {
                    console.log(res);
                        console.log(res.data);
                }).catch(function(err) {
                console.log('somthing horrible happened when getting songs: ' + err);
            });
        };
    }

    artistsService.$inject = ['$http', 'ApiBasePath'];

    function artistsService($http, basePath) {
        var svc = this;

        svc.getArtists = function() {
            var artists = $http({
                method: 'GET',
                url: basePath + '/artists'
            });

            return artists;
        };

        svc.getSongs = function(artistName) {
            var songs = $http({
                method: 'GET',
                url: basePath + '/songs',
                params: {
                    artist: artistName
                }
            });
            return songs;
        };
    }

}());
