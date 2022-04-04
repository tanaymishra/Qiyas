function maxlength(element, maxlength) {
    if (element.value.length > maxlength) {
        element.value = element.value.substring(0, maxlength);
    }
}
const sel = (e, t) => { if (t) { return document.querySelectorAll(e) } return document.querySelector(e) };
const flip=(e)=>{return e-(e*2)};
class DragSlider {
    constructor(object) {
        this.slide = sel(object.slide);
        this.imageCount=this.slide.childElementCount-1;
        this.sliderParent = sel(object.parent);
        this.indicators=sel(object.indicators,true);
        this.matrix = 0;
        this.currentTransform=null;
        this.initalPos = null;
        this.isActive = false;
        this.mouseEvents();
        this.touchEvents();
       
    }
    get imageScrollableArea(){return this.imageWidth*this.imageCount;}
    get imageWidth(){return this.slide.querySelector("img").clientWidth;}
    mouseEvents() {
        this.sliderParent.addEventListener("mousedown", (e) => {
            this.initalPos = e.pageX;
            this.isActive = true;
            this.matrix = window.getComputedStyle(this.slide).transform;
            if (this.matrix != "none") {
                this.matrix = parseInt(this.matrix.split(",")[4].trim())
            }
        })
        window.addEventListener("mouseup", (e) => {
            this.isActive = false;
            this.Adjust();
        })
        this.sliderParent.addEventListener("mousemove", (e) => {
            if (this.isActive) {
                let val= this.matrix + (e.pageX - this.initalPos)
                if(val>=0 || val<flip(this.imageScrollableArea)){return}
                this.currentTransform=val;
                this.render();
                // this.indiAdjust();
            }
        })
    }
    touchEvents() {
        this.sliderParent.addEventListener("touchstart", (e) => {
            this.initalPos = e.changedTouches[0].pageX;
            this.isActive = true;
            this.matrix = window.getComputedStyle(this.slide).transform;
            if (this.matrix != "none") {
                this.matrix = parseInt(this.matrix.split(",")[4].trim())
            }
        })
        window.addEventListener("touchend", (e) => {
            this.isActive = false;
            this.Adjust();
        })
        this.sliderParent.addEventListener("touchmove", (e) => {
            if (this.isActive) {
                let val= this.matrix + (e.changedTouches[0].pageX - this.initalPos)
                if(val>=0 || val<flip(this.imageScrollableArea)){return}
                this.currentTransform=val;
                this.render();
            }
        })
    }
    Adjust(e){
        let currentTrans=window.getComputedStyle(this.slide).transform;
        currentTrans = Math.round(parseInt(currentTrans.split(",")[4].trim())/this.imageWidth);
        this.currentTransform=currentTrans*this.imageWidth;
        this.render();
        this.indicator(flip(currentTrans));
    }
    indicator(num){
        this.indicators.forEach((element,index)=>{
            if(index==num){
                element.classList.add("active")
            }
            else{
                element.classList.remove("active")
            }
        })
    }
    render(){
        this.slide.style.transform = `translateX(${this.currentTransform}px)`;
    }
}
//We are not Rendering indicators based Upon Images :: Use React for That
let slider = new DragSlider({
    parent: ".prod-slider",
    slide: ".img-absolute",
    indicators:".indicators .indicator"
});