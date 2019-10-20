const getSeedword = document.getElementsByClassName("getSeedword")[0]
const getLogin = document.getElementById("getLogin")

getSeedword.value = localStorage.getItem("seedword") === undefined ? "" : localStorage.getItem("seedword").slice(1, localStorage.getItem("seedword").length-1)
// if(localStorage.getItem("accounts")){
//     accounts = [localStorage.getItem("accounts")]
//     window.location.href = "./index.html"
// }

getLogin.addEventListener("click", async (e) => {
    localStorage.setItem('seedword',JSON.stringify(getSeedword.value))
    e.preventDefault()
    await user_login(getSeedword.value)
    localStorage.setItem('accounts',JSON.stringify(accounts[0]))
    window.location.href = "./index.html"
    console.log(accounts)
})