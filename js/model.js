// Parse Object Model
var Model = function(name) {
    this.ModelName = name;
	this.Model = Parse.Object.extend(this.ModelName);
	this.ModelInstance = new this.Model();

    this.getList = function(callback) {
		var query = new Parse.Query(this.Model);
		query.find({
			success: function(results) {
                if (typeof results !== undefined) {
                    callback(results);
                } else {
                    callback(false);
                }
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};
    
    this.getById = function(id, callback) {
		var query = new Parse.Query(this.Model);

        query.get(id, {
            success: function(object) {
                if (typeof object !== undefined) {
                    callback(object);
                } else {
                    callback(false);
                }                
            },
            error: function(object, error) {
        		alert("Error: " + error.code + " " + error.message);
        	}
        });
        
    };

	this.save = function(object, callback) {
		this.ModelInstance.save(object, {
			success: function(savedObject) {
				callback(savedObject);
			},
			error: function(savedObject, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};

	this.destroy = function(id, callback) {
		var query = new Parse.Query(this.Model);
		query.get(id, {
			success: function(object) {
				object.destroy({
					success: function(deletedObject) {
						callback(deletedObject);
					},
					error: function(deletedObject, error) {
						alert("Error: " + error.code + " " + error.message);
					}
				});
			},
			error: function(object, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

	}
}