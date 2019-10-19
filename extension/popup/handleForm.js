const createRoom = document.getElementById("createRoom")
const roomName = document.getElementsByClassName("roomName")[0]
const roomDate = document.getElementsByClassName("roomDate")[0]
const roomAmount = document.getElementsByClassName("roomAmount")[0]

createRoom.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(`Room name- ${roomName.value} data- ${roomDate.value} amount - ${roomAmount.value}`)
})