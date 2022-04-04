const next=sel(".c-right")
const prev=sel(".c-left")
const sliderCard=sel(".slider-card-wrap")
let countCard=0;
let child=sliderCard.childElementCount-3;
next.addEventListener("click",()=>{
    if(countCard >= child){
        countCard=0;
        sliderCard.style.transform=`translateX(-${25*countCard}vw)`
    }
    else{
    countCard++;
    sliderCard.style.transform=`translateX(-${25*countCard}vw)`
    }
})
prev.addEventListener("click",()=>{
    if(countCard <=0){
        countCard=child;
        sliderCard.style.transform=`translateX(-${25*countCard}vw)`
    }
    else{
    countCard--;
    sliderCard.style.transform=`translateX(-${25*countCard}vw)`
}})