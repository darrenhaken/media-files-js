var request = require('request'),
    xmlToJson = require('xml2json'),
    Q = require('q');

module.exports = {
    findTvShowByName: function (name) {
        var tvShowUrl = 'http://www.thetvdb.com/api/GetSeries.php?seriesname=' + encodeURIComponent(name);
        var deferred = Q.defer();

        request(tvShowUrl, function (error, response, body) {
            var validResponse = !error && response.statusCode == 200;

            if (validResponse) {
                var jsonString = xmlToJson.toJson(body);
                var tvShow = JSON.parse(jsonString);
                deferred.resolve(tvShow);
            }
            else {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }
};