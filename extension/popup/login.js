const getSeedword = document.getElementsByClassName("getSeedword")[0]
const getLogin = document.getElementById("getLogin")

getSeedword.value = localStorage.getItem("seedword") === undefined ? "" : localStorage.getItem("seedword")

getLogin.addEventListener("click", async (e) => {
    localStorage.setItem('seedword',JSON.stringify(getSeedword.value))
    e.preventDefault()
    await login(getSeedword.value)
    window.location.href = "./index.html"
    console.log(accounts)
})