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
        setCourseURL.textContent = `Course URL - ${res.course_url}`
        joinRoomButton.style.display = "block"
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

