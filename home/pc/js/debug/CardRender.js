let cardContainer = sel(".slider-card-wrap")
const cardRender = (e) => {
    for (let i = 0; i <= e-1; i++) {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = sel(".card").innerHTML;
        cardContainer.appendChild(div)
        console.log("debog")
    }
    return cardContainer
}
cardRender(9)
let plate = sel(".plate-slider span")
const plateRender = (e) => {
    for (let i = 0; i <= e-1; i++) {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = sel(".plate-slider .card").innerHTML;
        plate.appendChild(div)
        console.log("debog")
    }
    return cardContainer
}
plateRender(12)
let card_container = sel("#s2")
const CardRender2 = (e) => {
    for (let i = 0; i <= e-1; i++) {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = sel("#s2 .card").innerHTML;
        card_container.appendChild(div)
        console.log("debog")
    }
    return card_container;
}
CardRender2(5)