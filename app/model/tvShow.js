var TvShowSummary = require('./tvShowSummary');

function Episode(episodeFromTvDb) {
    this.id = episodeFromTvDb.id;
    this.seasonId = episodeFromTvDb.seasonId;
    this.seasonNumber = episodeFromTvDb.SeasonNumber;
    this.episodeNumber = episodeFromTvDb.EpisodeNumber;
    this.episodeName = episodeFromTvDb.EpisodeName;
}

module.exports = function TvShow(fullTvData) {

    this.summary = new TvShowSummary(fullTvData.Series);
    this.episodes = fullTvData.Episode.map(function (episodeFromTvDb) {
        return new Episode(episodeFromTvDb);
    });
};
