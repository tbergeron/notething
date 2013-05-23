$(function() {
    Parse.initialize("Yeeo5YDal9Qmbzh4aCvvMLzUd3ralQW8qqOcx6Rn", "1QPi0d7rQLPM59c4FaP8VxwfMWJupQ8aNCcWNxNQ");

    var Page = new Model('Page');

    GetPages = function(done) {
        Page.getList(function(collection) {
            done(collection);
        });
    };
    
    GetPage = function(id, done) {
        Page.getById(id, function(object) {
            done(object);
        });
    }
    
    SavePage = function(object, done) {
        var page = ConstructObject(object);
        
        page.save(null, {
            success: function(savedObject) {
                done(savedObject);
            },
            error: function(object, error) {
                console.log(error);
                alert('erreur tabarnak ' + error);
            }
        });
    }
    
    DeletePage = function(id, done) {
        var page = ConstructObject({ id: id });
        
        page.destroy({
            success: function(object) {
                done(true);
            },
            error: function(object, error) {
                console.log(error);
                alert('erreur de destroy ' + error);
            }
        })
    }
    
    ConstructObject = function(object) {
        var PageModel = Parse.Object.extend("Page");

        var page = new PageModel();
        page.set("id", object.id);
        page.set("title", object.title);
        page.set("content", object.content);
        
        return page;
    }
});