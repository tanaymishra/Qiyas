const sel=(e,s)=>{if(s){return document.querySelectorAll(e)} else{return document.querySelector(e)}}
//Toggling the login and signup forms
let checkBox=sel(".register .aggreement .checkbox")
checkBox.addEventListener("click",()=>{
    checkBox.classList.toggle("checked")
})
//Changeing Login to signup
let registerBtn=sel(".m-login .login h3")
let activators=[sel(".m-login .login"),sel(".m-login .register")]
registerBtn.addEventListener("click",()=>{activators.forEach((e)=>{e.classList.add("active")})})
// Opening and Closeing the login and signup forms
//We are Using Gsap After This
let loginOpen=gsap.timeline({paused:true})
loginOpen.to(".login-main",0.2,{
    pointerEvents: "auto",
    opacity: "1",
    ease:"power2.easeout"
})
$("main img").click(()=>{loginOpen.play()})
$(".close-container .close").click((e)=>{loginOpen.reverse();})
//Squesing them into 1 OTP Field
let otpActive=gsap.timeline({paused:true})
otpActive.to(".register .inputs .name",0.4,{top:"6.5em",opacity:0,pointerEvents:"none",display:"none"})
.to(".register .inputs .email",0.4,{opacity:0,pointerEvents:"none",display:"none"},"-=.4")
.to(".register .inputs .password",.4,{top:"-6.5em",pointerEvents:"none",opacity:0,display:"none"},"-=.4")
.to(".register .inputs .otp",0.4,{display:"flex"},"-=.1")
//toogle the otp form
$(".register form").submit((e)=>{
    e.preventDefault();
    if(validateEmail($(".register .email input").val().trim())==false){sel(".register .email .input").classList.add("wrong") ;return false}
    otpActive.play();
})
//VAlidation
const validateEmail=(email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }