console.log("Chrome exntension loaded")

// Assuming user is logged in
// DOMContentLoaded not working since udemy has a lot of requests pending
// Using timeout, as kludge
// Fetching progress data
setTimeout(() => {
    const udemyProgressBar = document.querySelectorAll(".progress--progress-container--RxDGm.popper--click-target--caIsH")[0]
    udemyProgressBar.click()
    const udemyTrack = document.querySelectorAll('[data-purpose="progress-popover-text"]')[0]
    console.log(udemyTrack)

    chrome.runtime.onMessage.addListener((response,sender,sendResponse) => {
        if(response.getProgress){
            // Cannot add setTimeout inside since port closes before the timeout
            sendResponse({progress: udemyTrack.textContent})
        }
    })
}, 2000)


