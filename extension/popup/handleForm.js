const createRoom = document.getElementById("createRoom")
const getRoomName = document.getElementsByClassName("getRoomName")[0]
const getRoomDate = document.getElementsByClassName("getRoomDate")[0]
const getRoomAmount = document.getElementsByClassName("getRoomAmount")[0]

createRoom.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(`Room name- ${getRoomName.value} data- ${getRoomDate.value} amount - ${getRoomAmount.value}`)
})