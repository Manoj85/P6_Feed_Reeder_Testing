$(function() {
    /* Test suite 1: "RSS Feeds" */
    describe('RSS Feeds', function() {
        /* Test 1A: test that allFeeds variable is defined and not empty */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test 1B: Loop through the allFeeds object and ensures
         * it has a "URL" defined and that the URL is not empty.
         */
        it('should have a defined URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test 1C: Loop through the allFeeds object and ensures
         * it has a "name" defined and that the URL is not empty.
         */
        it('should have a defined name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* Test suite 2: "The menu" */
    describe('The menu', function() {

        /* Test 2A: Make sure the menu element is hidden by default. */
        it('should have menu element hidden by default by having class menu-hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test 2B: Make sure the menu changes visibility when the menu icon is clicked.
         * Two expectations:
         * does the menu display when clicked and
         * does it hide when clicked again.
         */
        it('should hide or show the menu when clicked', function() {
            // first click
            $('.menu-icon-link').trigger('click');

            // menu class should not be menu-hidden on first click (class menu-hidden is false)
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // second click
            $('.menu-icon-link').trigger('click');

            // test that second click will hide the menu (class menu-hidden is true)
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite 3: "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test 3A: ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */

        /* loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('has at least a single .entry element within the .feed container', function() {
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });
    });

    /* Test suite 4: "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Test 4A: ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes..
         */
        var feedZero;
        var feedOne;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedZero = $('.feed').html();
                done();
            });
        });

        /* Test 4A: ensure when a new feed is loaded by the loadFeed function that the content actually changes */
        it('should be new stuff', function(done) {
            // compare feedZero to feedOne, they should not be the same
            loadFeed(1, function() {
                feedOne = $('.feed').html();
                expect(feedOne).not.toEqual(feedZero);
                done();
            });
        });
    });
}());
