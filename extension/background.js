console.log("Background")

chrome.runtime.onMessage.addListener((response,sender,sendResponse) => {
    console.log(response)
    if(response.getProgress){
        // Cannot add setTimeout inside since port closes before the timeout
        sendResponse({progress: "From background scripts"})
    }
})