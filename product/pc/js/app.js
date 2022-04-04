class ratingStars {
    constructor(object) {
        this.allStars = document.querySelectorAll(`${object.parent} ${object.nameConvention}`);
    }
    setRating(rating) {
        this.allStars.forEach((star, index) => {
            if (index <= rating - 1) {
                star.style.opacity = 1;
            }
        })
    }
}
class sliderFade {
    constructor(object) {
        this.sliderUpbtn = document.querySelector(`.${object.container} .${object.sliderUpbtn}`);
        this.sliderDownbtn = document.querySelector(`.${object.container} .${object.sliderDownbtn}`);
        this.AllImages = document.querySelectorAll(`.${object.container} .${object.imgContainer} img`);
        this.currentValue = 0;
        this.object = object;
        this.setdefault = new Promise((res, rej) => {
            try {
                this.setDefault();
                this.activeButtons();
                res(true);
            }
            catch (e) {
                if(object.debug){
                console.error(`ClassError:${e}`);
                console.warn("This issue can be caused by some malicious Browser Extensions.");
                rej(false);}
                else{}
            }
        })

    }
    setDefault() {
        this.AllImages[0].style.opacity = "1";
    }
    //To set all the other images at 0 opacity except the current image
    setDefaultAll() {
        this.AllImages.forEach((image, index) => {
            if (index != this.currentValue) {
                image.style.opacity = "0";
            }
        })
    }
    activeButtons() {
        this.sliderUpbtn.addEventListener("click", (e) => {
            if (this.currentValue <= 0) {
                this.currentValue = this.AllImages.length - 1;
            } else { this.currentValue -= 1; }
            this.render();
        })
        this.sliderDownbtn.addEventListener("click", (e) => {
            if (this.currentValue >= this.AllImages.length - 1) {
                this.currentValue = 0;
            } else { this.currentValue += 1; }
            this.render();
        })
    }
    render() {
        this.AllImages[this.currentValue].style.opacity = "1";
        this.setDefaultAll();
    }
}
//Can only provide class based HTML elements
let slider1 = new sliderFade({
    container: "slider",
    sliderUpbtn: "upButton",
    sliderDownbtn: "downButton",
    imgContainer: "img-container",
    debug:false
});
let FirstRating = new ratingStars({ parent: ".stars", nameConvention: ".st" });
FirstRating.setRating(4);