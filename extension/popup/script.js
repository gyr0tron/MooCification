const roomsContainer = document.getElementsByClassName("profile__rooms")[0]

const address = localStorage.getItem("accounts").slice(1,localStorage.getItem("accounts").length - 1)
const URL = `http://localhost:3001/api/user/${address}`

console.log(URL)

fetch(URL)
.then((data) => data.json())
.then((res) => {
    console.log(res)
    res.room_number.forEach((rn) => {
        const roomURL = `http://localhost:3001/api/user/${rn}`
        fetch(roomURL)
        .then((data) => data.json())
        .then((res) => roomsContainer.textContent += res.room_name)
        .catch((err) => console.log(err))
    })
})
.catch((err) => console.log(err))

// Ref - https://stackoverflow.com/questions/20019958/chrome-extension-how-to-send-data-from-content-script-to-popup-html
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {getProgress: true}, function(response) {
//         const room = document.createElement("div")
//         room.textContent = response.progress ? response.progress : "Nil"
//         currURL = tabs[0].url
//         room.textContent += tabs[0].url.split("/")[4]

//         // Check if course completed or not
//         // Only for Udemy this applies - KLUDGE
//         if(response.progress){
//             const status = response.progress.split(" ")[0] === response.progress.split(" ")[2] ? true : false 
//         }
//         roomsContainer.appendChild(room)
//     })
// })
