//Actual code of slider start
//Variables
const slider = sel(".slider")
const imgSlider = sel(".slides")
const observer = sel(".observer")
let remo = ["mouseleave", "touchend", "mouseup"]
let initPosition = null;
let TriggerActive = false;
let initSliderPos = sel(".slides").pageX
let MatrixVal = 0;
let animActive = true;
//MouseClicked Event For PC..
slider.addEventListener("mousedown", (e) => {
    initPosition = e.pageX;
    TriggerActive = true;
    MatrixValRaw = window.getComputedStyle(imgSlider).transform;
    if (MatrixValRaw != "none") {
        MatrixVal = parseInt(MatrixValRaw.split(",")[4].trim())
    }
})
//Touch Event Mobile(Start)
slider.addEventListener("touchstart", (e) => {
    initPosition = Math.round(e.changedTouches[0].pageX);
    TriggerActive = true;
    MatrixValRaw = window.getComputedStyle(imgSlider).transform;
    if (MatrixValRaw != "none") {
        MatrixVal = parseInt(MatrixValRaw.split(",")[4].trim())
    }
})
//Slider event for Desktop
slider.addEventListener("mousemove", (e) => {

    if (TriggerActive) {
        animActive = true;
        let currentPosition = e.pageX;
        let diff = currentPosition - initPosition;
        let calVal = diff + MatrixVal;
        if (calVal >= 0 || calVal <= parseInt(-(sel(".slides").childElementCount - 1) * sel(".slides img").clientWidth)) {
            return;
        }
        adjustObserver()
        imgSlider.style.transform = `translateX(${calVal}px)`
    }
})
//Event for mobile
slider.addEventListener("touchmove", (e) => {
    if (TriggerActive) {
        let currentPosition = Math.round(e.changedTouches[0].pageX);
        let diff = currentPosition - initPosition;
        let calVal = diff + MatrixVal;
        if (calVal >= 0 || calVal <= parseInt(-(sel(".slides").childElementCount - 1) * sel(".slides img").clientWidth)) {
            return;
        }
        adjustObserver()
        imgSlider.style.transform = `translateX(${diff + MatrixVal}px)`
    }
})
//Removing Active action on any unusal Event
remo.forEach((e) => {
    slider.addEventListener(e, () => {
        TriggerActive = false;
        imageAdjust()
    })
})

//Changing observer State
let sliderObserver = sel(".observer")
let observerDivs = sel(".observer *", true)
const adjustObserver = () => {
    try {
        let CurrentTransform = parseInt(window.getComputedStyle(imgSlider).transform.split(",")[4].trim());
        let fullLength = sel(".slides img").clientWidth * (imgSlider.childElementCount - 1)
        let value = Math.round((CurrentTransform) / (fullLength / 100))
        value = numParse(value)
        let finalVal = (value / (100 / (observer.childElementCount - 1)));
        finalVal = Math.round(finalVal)
        observerDivs.forEach((e) => { e.classList.remove("s-active") })
        observerDivs[finalVal].classList.add("s-active")
    }
    catch {
        return undefined;
    }
}
//Adjusting Image function
const imageAdjust = () => {
    try {
        let CurrentTransform = parseInt(window.getComputedStyle(imgSlider).transform.split(",")[4].trim());
        let fullLength = sel(".slides img").clientWidth * (imgSlider.childElementCount - 1)
        let value = Math.round((CurrentTransform) / (fullLength / 100))
        value = numParse(value)
        let finalVal = (value / (100 / (observer.childElementCount - 1)));
        finalVal = Math.round(finalVal)
        let imgPx = (sel(".slides img").clientWidth) * finalVal;
        imgSlider.style.transform = `translateX(-${imgPx}px)`
        adjustObserver()
        return true;
    }
    catch {
        return false;
    }
}
//For debug Only
const renderJs = (object, renderSpace, times, observer) => {
    let objectHtml = sel(object).innerHTML
    renderSpace = sel(renderSpace)
    for (let i = 1; i <= times; i++) {
        let elem = document.createElement("div")
        elem.classList.add(sel(object).className)
        elem.innerHTML = objectHtml
        renderSpace.appendChild(elem)
    }
    circleJs(sel(observer), renderSpace.parentElement, renderSpace)
}
//We have to call it Properly with react
const circleJs = (observer, parentSlider, slider) => {
    let gridlength = (((sel(".card").clientWidth) * 1.027) * (slider.childElementCount)) - parentSlider.clientWidth //Effective length of parent container
    let cirVal = gridlength / (sel(".card").clientWidth * 1.027)
    cirVal = Math.round(cirVal)
    for (let i = 0; i < cirVal; i++) {
        let elem = document.createElement("div")
        elem.classList.add("circle")
        observer.appendChild(elem)
    }
    let allCircle = observer.querySelectorAll("*")
    allCircle[0].classList.add("first")
    allCircle[0].classList.add("active")
    allCircle[allCircle.length - 1].classList.add("last")
}
//Rendering Trendngs
renderJs(".slider-1 .card", ".slider-1 .card-area", 3, ".slider-1 .cdiv")
renderJs(".slider-2 .card", ".slider-2 .card-area", 3, ".slider-2  .cdiv")
//Rendering Featured 
renderJs(".featured .card",".featured .inner-slider",3,".featured .o-container")


//ForSlider of Cards function
const cardSlider = (sliderParent, SliderDiv, observer) => {
    sliderParent = sel(sliderParent)
    SliderDiv = sel(SliderDiv)
    observer = sel(observer)
    let matrix = 0;
    let AllEvents = ['mouseup', , 'mouseleave', 'touchend']
    let triggerStatus = false;
    let initPosition = 0;
    //Function to check frameCheck
    event(sliderParent, "mousedown", (e) => {
        initPosition = e.pageX;
        triggerStatus = true;
        let matrixRaw = window.getComputedStyle(SliderDiv).transform;
        if (matrixRaw !== 'none') {
            matrix = parseInt(matrixRaw.split(",")[4].trim())
        }
    })
    event(sliderParent, "mousemove", (e) => {
        //Frame check is basically preventing sliders to go out of container size
        if (triggerStatus) {
            let current = e.pageX - initPosition;
            current = matrix + current
            if (current >= 0 || frameCheck(current, SliderDiv) != true) { return }
            SliderDiv.style.transform = `translateX(${current}px)`;
            adjustObserverslider(SliderDiv, observer)
        }
    })
    AllEvents.forEach((e) => {
        event(sliderParent, e, () => {
            triggerStatus = false;
        })
    })
}
//Linked with slider Frame checkered with
const frameCheck = (sliderval, sliderparent) => {
    let totalLength = (sliderparent.querySelector(".card").clientWidth) * 1.04 //Total length of parent container
    totalLength = (sliderparent.childElementCount) * totalLength
    totalLength = totalLength - (sliderparent.parentElement.clientWidth)
    if (numParse(sliderval) >= totalLength) {
        log(numParse(totalLength))
        log(sliderval)
        return false;
    }
    return true;
}
//linked
const adjustObserverslider = (sliderDiv, observer) => {
    let totalLength = (sliderDiv.querySelector(".card").clientWidth)
    totalLength = totalLength * (sliderDiv.childElementCount - 1)
    let currentTranslateSlider = window.getComputedStyle(sliderDiv).transform.split(',')[4].trim()
    currentTranslateSlider = numParse(currentTranslateSlider)
    let finalValue = ((currentTranslateSlider) / (totalLength / 100)) / (100 / (sliderDiv.childElementCount - 1))
    finalValue = Math.round(finalValue)
    //Resetting all observers then setting em Up Again
    let allCircles = observer.querySelectorAll("*")
    allCircles.forEach((e) => { e.classList.remove("active") })
    allCircles[finalValue].classList.add("active")
}
//Activating Slider for Trendings
// let allTrendings=sel(".trendings",true)
// allTrendings.forEach((e)=>{ 
//     cardSlider(e.querySelector(".p-slider"),e.querySelector(".card-area"),e.querySelector("cdiv"))
// })
cardSlider(".slider-1 .p-slider", ".slider-1 .card-area", ".slider-1 .cdiv")
cardSlider(".slider-2 .p-slider", ".slider-2 .card-area", ".slider-2 .cdiv")
//Activating Slider for featured
cardSlider(".featured .inner-section",".featured .inner-slider",".featured .o-container")