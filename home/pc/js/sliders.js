const sel=(e,m)=>{if(m){return document.querySelectorAll(e)}else{return document.querySelector(e)}}
const slidesRender=(e)=>{
    //E can be the arry of slides But we are not using it currnetly
    let addr=['files/debug/s1.png','files/debug/s2.png','files/debug/s3.png','files/debug/s4.png','files/debug/s5.png']
    let imgSlider=sel(".slides",false)
    for(let i=0;i<=addr.length-1;i++){
        let img=new Image()
        img.src=addr[i]
        imgSlider.appendChild(img)
    }
    return {done:true};
}
slidesRender()
const prevBtn=sel("#lsm")
const nextBtn=sel("#rsm")
let count=0
let slides=sel(".slides",false)
let clinetWidth=sel(".img-slider",true)[0].clinetWidth
nextBtn.addEventListener("click",()=>{
    if(count+1>=slides.childElementCount){
        count=0
        slides.style.transform=`translateX(-${count*100}vw)`
    }
    else{
    count++;
    slides.style.transform=`translateX(-${count*100}vw)`
    }
})
prevBtn.addEventListener("click",()=>{
    if(count<=0){
        count=slides.childElementCount-1
        slides.style.transform=`translateX(-${count*100}vw)`
    }
    else{
    count--;
    slides.style.transform=`translateX(-${count*100}vw)`
    }
})

