const createRoom = document.getElementById("createRoom")
const getRoomName = document.getElementsByClassName("getRoomName")[0]
const getRoomDate = document.getElementsByClassName("getRoomDate")[0]
const getRoomAmount = document.getElementsByClassName("getRoomAmount")[0]
const getRoomNo = document.getElementsByClassName("getRoomNo")[0]

const accounts = localStorage.getItem("accounts").slice(1,localStorage.getItem("accounts").length-1)

createRoom.addEventListener("click", (e) => {
  e.preventDefault()
  var currURL;
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    currURL = (tabs[0].url)
    console.log(`Room name- ${getRoomName.value} data- ${getRoomDate.value} amount - ${getRoomAmount.value} link - ${currURL} account - ${accounts}`)
    const url = "http://localhost:3001/api/rooms/"
    
    fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:getRoomName.value, stake_cost: getRoomAmount.value, end_date: getRoomDate.value, user_id: accounts, course_url: currURL})
      })
    .then((data) => data.json())
    .then((res) => getRoomNo.textContent = res)
})})