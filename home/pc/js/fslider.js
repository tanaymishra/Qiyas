const prevPlate=sel(".left-p-button")
const nextPlate=sel(".right-p-button")
const sliderPlate=sel(".plate-slider span")
let plateCount=0;
let plateChild=sliderPlate.childElementCount-4;
nextPlate.addEventListener("click",()=>{
    if(plateCount>=plateChild){
        plateCount=0;
        sliderPlate.style.transform=`translateX(-${18*plateCount}vw)`;
        return
    }
    else{
    plateCount++;
    sliderPlate.style.transform=`translateX(-${18*plateCount}vw)`;
    }
})
prevPlate.addEventListener("click",()=>{
    if(plateCount<=0){
        plateCount=plateChild;
        sliderPlate.style.transform=`translateX(-${18*plateCount}vw)`;
        return
    }
    else{
    plateCount--;
    sliderPlate.style.transform=`translateX(-${18*plateCount}vw)`;
    }
})