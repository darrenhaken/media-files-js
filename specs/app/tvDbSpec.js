var chai = require('chai'),
    rewire = require("rewire"),
    fs = require('fs');

describe('TV DB', function () {

    var subject;
    var expect = chai.expect;

    beforeEach(function () {
        subject = rewire('../../app/tvDb');
    });

    describe('#findTvShowByName', function () {
        beforeEach(function () {
            var tvShowXml = fs.readFileSync('./specs/testData/tvShowOverview.xml', 'utf8');

            var httpStub = function (tvShowUrl, callback) {
                var response = {
                    statusCode: 200
                };
                callback(null, response, tvShowXml);
            };
            subject.__set__("request", httpStub);
        });

        it('should find the exact tv show which matches the search term', function () {
            return subject.findTvShowByName('Big Bang Theory')
                .then(function (tvShow) {
                    expect(tvShow.Series.seriesid).to.equal(80379);
                });
        });
    });

    describe('#findFullTvShowById', function () {
        beforeEach(function () {
            var tvShowXml = fs.readFileSync('./specs/testData/fullTVShow.xml', 'utf8');
            var httpStub = function (tvShowlUrl, callback) {
                var response = {
                    statusCode: 200
                };

                callback(null, response, tvShowXml);
            };
            subject.__set__("request", httpStub);
        });

        it('should find the TV show', function () {
            return subject.findFullTvShowById(80379)
                .then(function (tvShow) {
                    expect(tvShow.Episode.length).to.equal(2);
                });
        });
    });
});