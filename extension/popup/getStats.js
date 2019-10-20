const setRoomNumber = document.getElementById("setRoomNumber")
const setRoomName = document.getElementById("setRoomName")
const setNoOfUsers = document.getElementById("setNoOfUsers")
const setNoOfCompletions = document.getElementById("setNoOfCompletions")
const setStakes = document.getElementById("setStakes")
const setEndDate = document.getElementById("setEndDate")
const setCourseURL = document.getElementById("setCourseURL")
const getRoomDataButton = document.getElementById("getRoomDataButton")
const joinRoom = document.getElementsByClassName("joinRoom")[0]
const joinRoomButton = document.getElementById("joinRoomButton")
const completeRoomButton = document.getElementById("completeRoomButton")

const accounts = localStorage.getItem("accounts").slice(1,localStorage.getItem("accounts").length-1)

getRoomDataButton.addEventListener("click",(e) => {
    e.preventDefault()
    const roomNumber = joinRoom.value
    const URL = `http://localhost:3001/api/rooms/${roomNumber}`
    
    fetch(URL)
    .then((data) => data.json())
    .then((res) => {
        setRoomName.textContent = `Room Name- ${res.room_name}`
        setRoomNumber.textContent = `Room Number- ${res.room_no}`
        setNoOfUsers.textContent = `No Of Users- ${res.no_of_user}`
        let count = 0;
        res.completion.forEach(each_completion=>{
            if(each_completion===1)
            count++;
        })
        setNoOfCompletions.textContent = `No Of Completions- ${count}`
        setStakes.textContent = `Stakes- ${res.stake_cost}`
        setEndDate.textContent = `Room end date- ${res.end_date}`
        setCourseURL.textContent = `${res.course_url}`
        if(res.user_ids.indexOf(accounts) > 1){
            completeRoomButton.style.display = "block"
        }else{
            joinRoomButton.style.display = "block"
        }
    })
    .catch((err) => console.log(err))
})

joinRoomButton.addEventListener("click", () => {
    console.log(accounts)
    const roomNumber = joinRoom.value
    const URL = `http://localhost:3001/api/rooms/${roomNumber}`
    fetch(URL,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: accounts})
    })
    .then(data => data.json())
    .then(res => console.log(res))
})

completeRoomButton.addEventListener("click", () => {
    const url = setCourseURL.textContent
    console.log(url)
    chrome.tabs.update({url:url}, function(tab) {
        chrome.storage.local.get(['progress'],(data) => {
            if(response.progress){
                const status = response.progress.split(" ")[0] === response.progress.split(" ")[2] ? true : false 
            }
            if(status){
                const roomNumber = joinRoom.value
                const url = `http://localhost:3001/api/completion`
                fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user_id: accounts, room_no: roomNumber})
                })
                .then(data => data.json())
                .then(res => console.log(res))
                .catch(err => console.log(err))
            }
        })
    })
})

