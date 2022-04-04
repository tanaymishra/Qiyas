function redirect(e) {
    window.location.href = e
}
let initWindow = window.innerWidth
window.addEventListener("resize", () => {
    if (initWindow - window.innerHeight > 100 || initWindow - window.innerHeight < -100 ){
        window.location.href = "../"
    }
})