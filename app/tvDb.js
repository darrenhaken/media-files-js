var http = require('http'),
    xmlToJson = require('xml2json'),
    Q = require('q');

module.exports = {
    findTvShowByName: function (name) {
        var tvShowUrl = 'http://www.thetvdb.com/api/GetSeries.php?seriesname=' + encodeURIComponent(name);
        var deferred = Q.defer();

        http.get(tvShowUrl, function (response) {
            var body = '';
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                var tvShow = JSON.parse(xmlToJson.toJson(body));
                deferred.resolve(tvShow);
            });
        });
        return deferred.promise;
    }
};