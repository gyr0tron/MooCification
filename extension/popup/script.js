const roomsContainer = document.getElementsByClassName("profile__rooms")[0]

// Ref - https://stackoverflow.com/questions/20019958/chrome-extension-how-to-send-data-from-content-script-to-popup-html
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {getProgress: true}, function(response) {
        const room = document.createElement("div")
        room.textContent = response.progress ? response.progress : "Nil"
        room.textContent += tabs[0].url.split("/")[4]
        roomsContainer.appendChild(room)
    })
})
