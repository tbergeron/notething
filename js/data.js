$(function() {
    Parse.initialize("Yeeo5YDal9Qmbzh4aCvvMLzUd3ralQW8qqOcx6Rn", "1QPi0d7rQLPM59c4FaP8VxwfMWJupQ8aNCcWNxNQ");

    var Page = Parse.Object.extend("Page");
    
    var collection = new PageCollection();
    
    collection.fetch({
        success: function(collection) {
            collection.each(function(object) {
                console.warn(object);
            });
        },
        error: function(collection, error) {
            // The collection could not be retrieved.
        }
    });
});