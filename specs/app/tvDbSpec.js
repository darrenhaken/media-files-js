var chai = require('chai');

describe('TV DB', function () {

    var subject = require('../../app/tvDb');
    var expect = chai.expect;

    describe('#findTvShowByName', function () {
        it('should query the tv show and return ', function () {
            return subject.findTvShowByName('Big Bang Theory')
                .then(function (tvShow) {
                    expect(tvShow.Data.Series.seriesid).to.equal(80379);
                });
        });
    });
});