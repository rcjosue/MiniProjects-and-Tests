var express = require('express');

var app = express()
var fs = require('fs');
const { userInfo } = require('os');

let mockDb = {
    users: {
      10000: {
        name: "Alice",
        house: "Slytherin",
        friends: ["Harry", "Hermione"]
      },
      10001: {
        name: "Bob",
        house: "Gryffindor",
        friends: ["Dumbledore", "Hagrid"]
      },
      10002: {
        name: "Charlie",
        house: "Hufflepuff",
        friends: ["Voldemort", "Severus Snape"]
      },
      10003: {
        name: "Diana",
        house: "Hufflepuff",
        friends: ["Ron", "Severus Snape"]
      },
      10004: {
        name: "Biana",
        house: "Hufflepuff",
        friends: ["Ron", "Severus Snape"]
      },
      10005: {
        name: "Diana",
        house: "Hufflepuff",
        friends: ["Ron", "Severus Snape"]
      }
    }
};

app.get("/", function(req, res) {
    res.status(200).send("Welcome to KadaKareer!!!");
  });

app.get("/friends/of/:house", function(req, res) {
    
  let friends = [];

  // if you are writing an answer your code should store the array in the `friends` variable
  // ====== START YOUR ANSWER HERE =======
  
  const house = (req.params.house); //Takes the 'house' from the list of parameters which comes from the request data(req.params.id). and stores(=) it in a constant variable 'id'(const id =). 
  const users = mockDb.users; //Takes the list of users from the mockDb and stores it in a constant variable

  for (let userId in users) { //A loop the iterates all classIds with the list of classes
    if (users[userId].house === house) { //check if the difficulty of the classes in the databe is strictly equal(===) to that of the one stored from the request
      friends.push(users[userId].name); //(.push()) add the name of class to the list created in line 123. The name of the classes was take using (.name) on the (classes[classId])
    }
  }
  friends.sort();
  friends = [...new Set(friends)];
  
  res.status(200).send({ friends: friends });
});

var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

/**
var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
}
 

//endpoint to Get a list of users
app.get('/listUsers', function(req,res){ //req incoming data, res outgoing data
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err,data){
        console.log(data);
        res.end(data);
    });
})

//endpoint to add a user (use an API Platform like Postman to send a POST request)
app.post('/addUser', function(req,res){
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err,data){
        data = JSON.parse(data);
        data["user4"] = user["user4"];
            fs.writeFile(__dirname + "/" + "users1.json", JSON.stringify(data), "utf8", function (err,data){
                //writes new list of users to user1.json
            })
        console.log(data);
        res.end(JSON.stringify(data));
    })
    
})
app.get('/newUsers', function(req,res){
    fs.readFile(__dirname + "/" + "users1.json", "utf8", function (err,data){
        console.log(data);
        res.end(data);
    });
})

app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

//create server to listen at port 800
var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

**/