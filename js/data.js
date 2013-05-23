$(function() {
    Parse.initialize("Yeeo5YDal9Qmbzh4aCvvMLzUd3ralQW8qqOcx6Rn", "1QPi0d7rQLPM59c4FaP8VxwfMWJupQ8aNCcWNxNQ");

    var Page = new Model('Page');

    var GetPages = function(done) {    
        Page.getList(function(collection) {
            done(collection);
        });
    };
});