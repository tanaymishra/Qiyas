const sel=(e,s)=>{if(s){return document.querySelectorAll(e)} else{return document.querySelector(e)}}
const promoCode=()=>{
    let value=sel("#input input").value.replace("-","")
    console.log(value)
    if(value.length % 4 ==0 ){
        if(value.length>11 || value.length<1){
            return false
        }
        sel("#input input").value+="-"
    }
    sel("#input input").value= sel("#input input").value.toUpperCase();
}