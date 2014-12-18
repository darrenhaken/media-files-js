#!/usr/bin/env node

var program = require('commander'),
    tvShowRenamer = require('./app/tvRenamer')();

program
    .version('0.0.1');

program
    .command('tv-check [env]')
    .description('check what tv show is found in the directory')
    .option("-d, --directory [directory]", "Which directory to target")
    .action(function (env, options) {
        tvShowRenamer.findTvShow();
    });

program.parse(process.argv);
