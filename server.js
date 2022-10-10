var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// app.post("/sign_up",(req,res)=>{
//     var name = req.body.name;
//     var email = req.body.email;
//     var phno = req.body.phno;
//     var password = req.body.password;
//     var TicketId = req.body.TicketId;

//     var data = {
//         "name": name,
//         "email" : email,
//         "phno": phno,
//         "password" : password,
//         "TicketId" : TicketId
//     }

//     db.collection('users').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Record Inserted Successfully");
//     });

//     return res.redirect('signup_success.html')

// })

app.post("/search",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var TicketId = req.body.TicketId;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password,
        "TicketId" : TicketId
    }

    db.collection('users').find(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log(data)
        console.log("Record Displayed Successfully");
    });

    // const userSchema = {
    //     name : String,
    //     password : String,
    //     email : String,
    //     phno : Number,
    //     TicketId : String
    // }
    
    // const User = mongoose.model('User',userSchema);
    
    // app.get('/',(req,res)=>{
    //     User.find({},function(err ,users){
    //         res.render('index',{
    //             userList: users
    //         })
    //     })
    // })
    

    return res.redirect('signup_success.html')

})

// const userSchema = {
//     name : String,
//     password : String,
//     email : String,
//     phno : Number,
//     TicketId : String
// }

// const User = mongoose.model('User',userSchema);

// app.get('/',(req,res)=>{
//     User.find({},function(err ,users){
//         res.render('index',{
//             userList: users
//         })
//     })
// })


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('signup_success.html');
}).listen(4000);


console.log("Listening on PORT 4000");