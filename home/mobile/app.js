const sel=(e,m)=>{if(m){return document.querySelectorAll(e)}else{return document.querySelector(e)}}
const round=(e)=>{return Math.round(e)}
const log=(e)=>{return console.log(e)}
const numParse=(e)=>{return e-e*2}
const event=(elem,event,func)=>{elem.addEventListener(event,func)}
const lastClass=(e)=>{return e.classList[e.classList.length-1]}
//debugger starts
let images=['s2','s3']
images.forEach((f)=>{
    let img= new Image()
    img.src=`files/${f}.png`
    sel(".slides").appendChild(img)
})
//Prevents Every anchor Default behaviour
let allanchors=sel("a",true)
allanchors.forEach((e)=>{
    e.addEventListener("click",(e)=>{e.preventDefault()})
})
//Debug ends
let  allImages=sel("*",true);
allImages.forEach((e)=>{e.setAttribute("draggable",false);})