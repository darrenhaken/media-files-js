var chai = require('chai'),
    rewire = require("rewire");

describe('TV DB', function () {

    var subject;
    var expect = chai.expect;

    beforeEach(function () {
        subject = rewire('../../app/tvDb');

        var httpStub = function (tvShowlUrl, callback) {
            var response = {
                statusCode: 200
            };

            var tvShowXmlBody = '<?xml version="1.0" encoding="UTF-8" ?> ' +
                "<Data> " +
                "<Series> " +
                "<seriesid>80379</seriesid> " +
                "<language>en</language> " +
                "<SeriesName>The Big Bang Theory</SeriesName> " +
                "<banner>graphical/80379-g23.jpg</banner> " +
                "<Overview>What happens when hyperintelligent roommates Sheldon and Leonard meet Penny, a free-spirited beauty moving in next door, and realize they know next to nothing about life outside of the lab. Rounding out the crew are the smarmy Wolowitz, who thinks he's as sexy as he is brainy, and Koothrappali, who suffers from an inability to speak in the presence of a woman.</Overview> " +
                "<FirstAired>2007-09-24</FirstAired> " +
                "<Network>CBS</Network> " +
                "<IMDB_ID>tt0898266</IMDB_ID> " +
                "<zap2it_id>EP00931182</zap2it_id> " +
                "<id>80379</id> " +
                "</Series> " +
                "</Data>";

            callback(null, response, tvShowXmlBody);
        };
        subject.__set__("request", httpStub);
    });

    describe('#findTvShowByName', function () {
        it('should query the tv show and return ', function () {
            return subject.findTvShowByName('Big Bang Theory')
                .then(function (tvShow) {
                    expect(tvShow.Data.Series.seriesid).to.equal(80379);
                });
        });
    });
});