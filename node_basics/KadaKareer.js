// EXERCISE STARTS AT LINE 53!!!
const express = require("express");
const app = express();
const PORT = 4000;

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
    }
  },
  classes: {
    70000: {
      name: "Defence Against the Dark Arts",
      difficulty: "high"
    },
    70001: {
      name: "Herbology",
      difficulty: "medium"
    },
    70002: {
      name: "History of Magic",
      difficulty: "medium"
    },
    70003: {
      name: "Arithmancy",
      difficulty: "easy"
    }
  }
};

app.get("/", function(req, res) {
  res.status(200).send("Welcome to KadaKareer!!!");
});

// ==================== START COMMENTING BELOW =========================

// NOTE: You are allowed and ENCOURAGED to look for the answers online!
// We want to see how you approach problems/questions you've never encountered before
// since most of us at Kada learn a lot by doing and teaching ourselves as we go along

// Overview questions

/**
1.) In express.js, what does req and res stand for? 
Can you explain some detail what they are used for?
Answer: 
Express.js is a framework that allows Node.js to quickly use fundamental web application
features like a server and support for REST application programming interface(API).
req or Request is the data from the user or client and res or Response is the data outputted by the server.
If you are unfamiliar with APIs, to put it more simply you can think of a restaurant.
It pretty intiutive, a customer/user will order/request and it is processed by the waiter/restaurant's "API"
and sent to the kitchen/server. The kitchen/server then send the food/response to the customer/user.  
To wrap it all up, a request from the user is passed to the server, the server can use that data to prepare
thier response then send it back to the user.

2.) In your own words, what do HTTP GET and POST requests do?
Answer: 
HTTP GET and POST requests are methods or verbs for HTTP and are also named very intuitevely. HTTP or
Hypertext Transfer Protocol is, in a sense, the language of the web browsers and web servers and the 
verbs or methods tell what the server to do. 
A GET request is used to get data from a server and a post request is to post data to that server almost 
like how Facebook searching and posting works. Typing in the searchbar requests data from the server based 
on your search and typing in the status will post data on the server for all your friends to see.

3.) In your own words, what do the status codes 200 and 400 signify?
Answer: 
As stated above, HTTP is how servers and browsers communicate, the HTTP messages have status codes or default responses, 
these also help identify problems when the servers and browsers can reach each other.
This is like when you're calling someone if its connecting, it rings, if the phone is out of coverage or off a different
tone is played. So in HTTP, the ringing or a good connection has a status code 200 and out of coverage tone or a bad(error) request
has a status code 400, however this is not that accurate since there are many other status codes for error unlike how
the phone has only a number of automated responses.

**/

app.get("/user/:id/name", function(req, res) { 
  //The express.js app GET method is called and takes two arguments: the url("/user/:id/name") the user will go to and the function with the two parameters explained in number 1 of the overview (req,res)
  const id = parseInt(req.params.id); 
    /**(.id) takes the id from the list of parameters which comes from the list taken by using(.params) from the request data(req.params.id). 
    In this case the url has the request data, converts it to a integer using (parseInt()) and stores(=) it in a constant variable 'id'(const id =). 
    Constant variables can only be used within the block and cannot be updated or re-declared **/
  if (mockDb.users.hasOwnProperty(id)) { 
    //Checks if the id stored above matches one of the properties(.hasOwnProperty(id)) of the users in the database(mockDb.user)
    const name = mockDb.users[id].name; 
      //Uses (.name) method to take the "name" property corresponding to the user in mockDb with id number above(mockDb.users[id]) and stores it in a constant variable 'name'(const name =)
    return res.status(200).send(`The user's name is ${name}`); 
      // Send the message with the name of to the browser. (res.status()) sets the status code of the HTTP response and (.send()) customizes the message send with the response
  } else {
    return res.status(400).send("User is not found"); 
      // Same with line 102 except this is for cases where the id in line 99 is not found in the database therefor we send an error code like explained in the number 3 of the overview
  }
});

// assume that getting classes `mockDb.classes` takes a long time
// would you be able to describe in your own words, what is async/await used for?
app.get("/classes/level/:difficulty", async function(req, res) { 
  /**similar to line 94 except the function is now labeled asynchronous or it may be done on its own time, running/processing in the background while the faster functions work 
  instead of doing everthing in the order its written which is the default**/
  const difficulty = req.params.difficulty; //Similar to lines 95 and 97 the difficulty parameter is taken from the request data and stored in a constant variable (const difficulty =)
  const classes = await mockDb.classes; 
    /** stores the classes from mockDb(mockDb.classes) in a constant variable(const classes =) and uses the await key word signifying the system to 'wait' until
    this is done loading before proceed to the next line but since this is in a asynchronous function, the rest of the code will continue normally and 
    go back here one the loading of mockDb.classes is done 
    We can revist our restauraunt example but this time its a fast food chain, now with the COVID situation drive thru is the default. In drive thru they is only one line, and orders will process in order 
    even if the customer in front of you will take 10 minute to choose and you already know what you want. This is synchronous, but the second part can be asynchronous(asynch), since the orders are placed the cashier
    can tell a driver that his food will take long(await) and must wait in the parking lot allowing the other customers orders to be given first. 
    **/

  let classesWithCorrectDifficulty = []; //like const, let is a type of variable and can only be used in the block it was declared in, let can be updated but can be redeclared

  for (let classId in classes) { //A loop that iterates all classIds or elements within the list of classes
    if (classes[classId].difficulty === difficulty) { //check if the difficulty of the classes in the database is strictly equal(===) to that of the one stored from the request
      classesWithCorrectDifficulty.push(classes[classId].name); //(.push()) add the name of class to the list created in line 123. The name of the classes was take using (.name) on the (classes[classId])
    }
  }
  return res.status(200).send({ classes: classesWithCorrectDifficulty }); // Like line 108, Sends the message with a list of classes of to the browser. (res.status()) sets the status code of the HTTP response and (.send()) customizes the message send with the response
});

// ==================== END OF COMMENTING ABOVE =========================

// ==================== BELOW CONTAINS THE BONUS SECTION ================
//
// We don't expect all of the applicants
// to be able to do this, especially if
// you haven't worked with JavaScript a lot.
// Focus on the commenting / documenting
// exercise above! :)
//
//
// Do not attempt the bonus if you haven't
// fully commented / documented the code above
//
// We would prefer applicants that are able to
// demonstrate stronger understanding of the
// code above over applicants that barely worked
// and explained what the code is doing (especially
// if you attempted this bonus activity and you
// got it wrong)
//
//
//
//
//
//
//
//  ========== DO NOT SCROLL ANY FURTHER IF YOU HAVEN'T FINISHED THE TASK ABOVE
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// ========== OKAY, IF YOU'VE REACHED THIS POINT, WE TRUST THAT YOU ARE GOOD WITH
// ========== THE PROBLEM ABOVE. IF SO, YOU MAY PROCEED. HAVE FUN!
//
//
//
//
//
//
//
//
// ================================================================================

// Bonus question: fill in this route that would
// return an array of users that are friends of students
// on the given Hogwarts House
app.get("/friends/of/:house", function(req, res) {
  // The user of this application can specify the house they want to check
  // for example: /friends/of/Hufflepuff
  // your task is to return an array of users that are friends of people from the specified house
  // the answer for /friends/of/Hufflepuff is ["Ron", "Voldemort", "Severus Snape"]
  // don't worry if your answer is out of order (e.g. ["Voldemort", "Ron", "Severus Snape"])
  // or if contains duplicates! (e.g. ["Voldemort", "Severus Snape", "Ron", "Severus Snape"]) :D
  // but if you really want to show off, return a unique collection of names that is sorted alphabetically! :D

  // don't worry if you're also unable to code it properly
  // first write down your steps in words OR write down a pseudocode
  
  
  /**
  My approach for this problem is first identify the goal, think of the main steps needed, list the initial or main variable needed, and work from there.
  The goal and steps were already provided so I wrote code correspending to it or followed the code in the example above as the steps seems similar, when applicable.
  I searched for the functions or syntax that are unknown or I may have forgotten or if the data type works similar to other programming languages. 
  I then tested in on my PC to double check.   
  **/

  let friends = [];

  // if you are writing an answer your code should store the array in the `friends` variable
  // ====== START YOUR ANSWER HERE =======
  
  const house = (req.params.house); //Takes the 'house' from the list of parameters which comes from the request data(req.params.id). and stores(=) it in a constant variable 'id'(const id =). 
  const users = mockDb.users; //Takes the list of users from the mockDb and stores it in a constant variable

  for (let userId in users) { //A loop that iterates all userIds within the list of users
    if (users[userId].house === house) { //check if the house of the use in the database is strictly equal(===) to that of the one stored from the request
      friends.push(users[userId].name); //(.push()) adds the name of user to the list created in line 215.
    }
  }
  friends.sort(); //Sorts the list/array alphabetically by default, changing the position of the element in the array
  friends = [...new Set(friends)]; //Converts the array to a set, which stores unique values inside, this will take long and can be optimzied further
  
  // ====== DO NOT EDIT ANYTHING BELOW THIS LINE =====
  res.status(200).send({ friends: friends });
});

app.listen(process.env.PORT, () => {
  console.log(`yo`);
});
