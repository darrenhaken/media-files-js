var request = require('request'),
    xmlToJson = require('xml2json'),
    Q = require('q');

var baseUri = 'http://www.thetvdb.com/api/',
    accessToken = 'CCD07943FE612FE9';

function parseTvShow(error, response, body, deferred) {
    var validResponse = !error && response.statusCode == 200;

    if (validResponse) {
        var jsonString = xmlToJson.toJson(body);
        var tvShow = JSON.parse(jsonString);

        deferred.resolve(tvShow.Data);
    }
    else {
        deferred.reject(error);
    }
}

module.exports = {
    findTvShowByName: function (seriesName) {
        var tvShowUrl = 'http://www.thetvdb.com/api/GetSeries.php?seriesname=' + encodeURIComponent(seriesName);
        var deferred = Q.defer();

        request(tvShowUrl, function (error, response, body) {
            parseTvShow(error, response, body, deferred);
        });
        return deferred.promise;
    },

    findFullTvShowById: function (tvShowId) {
        var url = baseUri + accessToken + "/series/" + tvShowId + "/all/en.xml",
            deferred = Q.defer();

        request(url, function (error, response, body) {
            var validResponse = !error && response.statusCode == 200;

            if (validResponse) {
                var jsonString = xmlToJson.toJson(body);
                var tvDbFullListing = JSON.parse(jsonString);
                deferred.resolve(tvDbFullListing.Data);
            }
            else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }
};