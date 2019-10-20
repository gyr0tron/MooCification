const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cron = require("node-cron");
const web3 = require('./web3');

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
const mongoose = require('mongoose')

const url =`mongodb+srv://nurdtechie98:nurdtechie98@donut-lopoz.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
  id: String,
  address: String,
  room_number:[Number]
})

const User = mongoose.model('User', userSchema)

const roomSchema = new mongoose.Schema({
    room_no:Number,
    room_name:String,
    no_of_user:Number,
    no_of_completion:Number,
    stake_cost:Number,
    end_date:Date,
    course_url:String,
    user_ids:[String],
    completion:[Number]
})

const Room = mongoose.model('Room', roomSchema)

app.get('/api/user',(request,response)=>{
    response.json("hello world");
})


// retrieve details 
app.get('/api/user/:id',async(request,response)=>{
    const user_id = Number(request.params.id);
    console.log('user_id:',user_id);
    const user = await User.find({id:user_id});
    if(user.length!==0)
    {
        response.json(user[0].id);
    }
    else
    {
        const user = new User({
            id:user_id,
            address:request.body.address,
            room_number:[]
        })
        user.save().then(result=>{
            console.log("added");
            response.json(user_id);
        })
    }
})

// create new room
app.post('/api/rooms',(request,response)=>{
    const body = request.body;
    const room_no = Math.floor((Math.random()*100000)+1)
    const room = new Room({
        room_no:room_no,
        room_name:body.name,
        no_of_user:1,
        no_of_completion:0,
        stake_cost:Number(body.stake_cost),
        end_date:new Date(body.end_date),
        course_url:body.course_url,
        user_ids:[body.user_id],
        completion:[0]
    })
    room.save().then(result=>{
        console.log("room created");
        response.json(room_no);
    })
})

// get room info
app.get('/api/rooms/:room_no',(request,response)=>{
    const room_no = Number(request.params.room_no);
    Room.find({room_no:room_no}).then(result=>{
        response.json(result[0]);
    })
})

// join room 
app.post('/api/rooms/:room_no',(request,response)=>{
    const room_no = Number(request.params.room_no);
    const user_id = (request.param.user_id);
    Room.find({room_no:room_no}).then(result=>{
        let room = result[0];
        room.user_ids.push(user_id);
        room.completion.push(0);
        room.updateOne({room_no:room_no},room,()=>{
            console.log("updated");
            response.json(room);
        })
    })
})

// completion of courses
app.post('/api/completion',(request,response)=>{
    const body = request.body;
    const room_no = Number(body.room_no);
    Room.find({room_no:room_no}).then(result=>{
        let room = result[0];
        console.log(room.user_ids);
        const index = room.user_ids.indexOf(body.user_id);
        console.log(index);
        room.completion[index]=1;
        let count = 0;
        completion.forEach(each_completion=>{
            if(each_completion===1)
            count++;
        })
        sendMoney(user_id,15+((completion.length-count)*0.01*room.stake_cost));
        room.updateOne({room_no:room_no},room,()=>{
            console.log("updated");
            response.json(room);
        })
    })
})

const sendMoney = (user_id,amount)=>{
        web3.login().then(()=>{
            web3.serv_user_transfer(user_id,amount);
        })
}
//cron job every-day for evaluating end of rooms
cron.schedule("30 2 * * *",()=>{
    console.log("every day");
    const date = new Date();
    Room.find({end_date:{$lt:date}}).then(result=>{
        result.forEach(room=>{
            let user_ids = room.user_ids;
            let completion = room.completion;
            let i =0;
            let count = 0;
            completion.forEach(each_completion=>{
                if(each_completion===1)
                count++;
            })
            const amount = (((user_ids.length)*room.stake_cost)/count);
            user_ids.forEach(user_id=>{
                if(completion[i]===1)
                sendMoney(user_id,amount);
            })
            Room.findOneAndRemove({room_no:room.room_no},()=>{
                console.log("removed:",room.room_no)
            })
        })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})