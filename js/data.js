$(function() {
    Parse.initialize("Yeeo5YDal9Qmbzh4aCvvMLzUd3ralQW8qqOcx6Rn", "1QPi0d7rQLPM59c4FaP8VxwfMWJupQ8aNCcWNxNQ");

    var Page = Parse.Object.extend("Page");
    
    var query = new Parse.Query(Page);
    var collection = query.collection();
    
    console.log(collection);
});