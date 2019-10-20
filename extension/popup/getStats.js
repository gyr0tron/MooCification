const setRoomNumber = document.getElementById("setRoomNumber")
const setRoomName = document.getElementById("setRoomName")
const setNoOfUsers = document.getElementById("setNoOfUsers")
const setNoOfCompletions = document.getElementById("setNoOfCompletions")
const setStakes = document.getElementById("setStakes")
const setEndDate = document.getElementById("setEndDate")
const setCourseURL = document.getElementById("setCourseURL")

const roomNumber = 90545
const URL = `http://localhost:3001/api/rooms/${roomNumber}`

fetch(URL)
.then((data) => data.json())
.then((res) => {
    setRoomName.textContent = `Room Name- ${res.room_name}`
    setRoomNumber.textContent = `Room Number- ${res.room_no}`
    setNoOfUsers.textContent = `No Of Users- ${res.no_of_users}`
    setNoOfCompletions.textContent = `No Of Completions- ${res.completion.length}`
    setStakes.textContent = `Stakes- ${res.stake_cost}`
    setEndDate.textContent = `Room end date- ${res.end_date}`
    setCourseURL.textContent = `Course URL - ${res.course_url}`
})
.catch((err) => console.log(err))