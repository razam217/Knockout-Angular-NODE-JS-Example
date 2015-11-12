$(document).ready(function(){

	function getUsersList(callback){
		$.getJSON("http://localhost:8080/api/user", function(data){
			callback(data);
		});
	};

	function createUser(data, callback){
		$.post("http://localhost:8080/api/user", data, function(){
			callback();
		});
	};

	function delUser (id, callback) {
		$.ajax({
			method : "DELETE",
			url : "http://localhost:8080/api/user/" + id,
			success: function(){
				callback();
			}
		})
	}


	function getName(f, l){
		return {
			"firstName" : ko.observable(f),
			"lastName" : ko.observable(l)
		};
	};

	function userInstance (me) {
		console.log(me.firstName(),  me.lastName());
		return {
			"name": ko.observable(getName(me.firstName(),  me.lastName())),
			"age" : ko.observable(me.age()),
			"gender": ko.observable(me.gender()),
			"father_name": ko.observable(me.father_name()),
			"marital_status": ko.observable(me.marital_status())
		};
	};
	

	var viewModel = function(){
		var self = this;
		self.firstName = ko.observable("");
		self.lastName = ko.observable("");
		self.father_name = ko.observable("");
		self.age = ko.observable("");
		self.gender = ko.observable("");
		self.marital_status = ko.observable("");
		self.wait = ko.observable(false);
		self.genderArray = ko.observableArray([]);
		self.userDetail = ko.observable("");
		ko.computed(function(){
			$.getJSON("http://localhost:8080/api/gender", function(data){
				self.genderArray(data);
				console.log(self.genderArray());
			});
		}, self);
		self.createUser = function() {
			var user = userInstance(self);
			var jsonData = ko.toJS(user);	
			self.wait(true);
			createUser(jsonData, function(){
				self.resetFields();
				getUsersList(function(data){
					self.wait(false);
					self.users(data);
				});
			});
		};

		self.resetFields = function(){
			Object.keys(self).forEach(function(name) {
				if(name != "users" && name != "userDetail" && name != "genderArray"){
		            if (ko.isWritableObservable(self[name])) {
		                self[name]("");
		            }
		        }
	        });
		};

		self.deleteUser = function(user){
			delUser(user._id, function(){
				getUsersList(function(data){
					self.users(data);
					console.log(user , self.userDetail());
					if(user['_id'] == self.userDetail()['_id']){
						self.userDetail("");
					}
				});
			});
		};

		self.getDetail = function(user){
			self.userDetail(user);
		};

		self.users = ko.observableArray([]);

		self.sortFunction = function(a, b) {
			if(a.name.firstName != undefined && b.name.firstName != undefined && a.name.lastName != undefined && b.name.lastName != undefined){
				return (a.name.firstName.toLowerCase() + " " + a.name.lastName.toLowerCase()) > (b.name.firstName.toLowerCase() + " " + b.name.lastName.toLowerCase()) ? 1 : -1;  
			} else if (a.name.firstName != undefined && b.name.firstName != undefined){
				return (a.name.firstName.toLowerCase()) > (b.name.firstName.toLowerCase()) ? 1 : -1;  
			}
		    
		};

		self.sortedInstances = ko.dependentObservable(function() {
		    return self.users.slice().sort(self.sortFunction);
		}, viewModel);


		getUsersList(function(data){
			self.users(data);
		});
	};

	
	ko.applyBindings(viewModel);
});