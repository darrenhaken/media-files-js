module.exports = function TvShowSummary(tvDbSummaryData) {

    this.seriesId = tvDbSummaryData.seriesid;
    this.seriesName = tvDbSummaryData.SeriesName;
    this.banner = tvDbSummaryData.banner;
    this.overview = tvDbSummaryData.Overview;
    this.firstAired = tvDbSummaryData.FirstAired;
    this.network = tvDbSummaryData.Network;
    this.imdbId = tvDbSummaryData.IMDB_ID;
    this.zapItId = tvDbSummaryData.zap2it_id;
};
