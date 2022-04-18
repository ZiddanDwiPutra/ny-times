export default class Wrapper{
    static replaceClassName(tgt, value, replacement){
        const el = document.querySelector(tgt)
        if(el) el.className = el.className.replace(value, replacement)
    }
    
    static showLoading(){
        Wrapper.replaceClassName(".loading-wrapper", " d-none", " show-el")
    }
    static hideLoading(){
        Wrapper.replaceClassName(".loading-wrapper", " show-el", " d-none")
    }
}