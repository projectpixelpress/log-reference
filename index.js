/*
 * index.js
 * Copyright (C) 2017 Bradley McCrorey <brad@projectpixelpress.com>
 *
 * UNLICENSED
 */

module.exports = function() {
    let prefix = '';
    if (require.resolve('cluster')) prefix = 'C: '+process.pid;
    ['log', 'warn'].forEach(function(method) {
        var old = console[method];
        console[method] = function() {
            var stack = (new Error()).stack.split(/\n/);
            // Chrome includes a single "Error" line, FF doesn't.
            if (stack[0].indexOf('Error') === 0) {
                stack = stack.slice(1);
            }
            var args = [].slice.apply(arguments).concat([stack[1].trim()]);
            args.unshift(prefix);
            return old.apply(console, args);
        };
    });
}
