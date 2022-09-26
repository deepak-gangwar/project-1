import gsap from "gsap"

export default class Preloader {
    constructor() {
        this.bind()

        this.preloader = document.querySelector('.preloader')
        this.slider = document.querySelector('.slider')
        this.slides = this.slider.querySelectorAll('.slider__item')

        this.tl = new gsap.timeline()

        this.init()
    }
    
    bind() {
        ['onLoad'].forEach(fn => this[fn] =  this[fn].bind(this))
    }

    onLoad() {
        this.tl.set(this.preloader, { display: 'none' })
        
        // slides animation
        this.tl.from(this.slides, { x: '120vw', duration: 2.5, ease: "power3.inOut", stagger: 0.05 })
        this.tl.to(this.slides, { y: 0, duration: 2, ease: "power3.inOut", stagger: 0.05 })

        this.tl.set(document.body, { overflow: 'visible' })
        this.tl.from(document.querySelector('.nav'), { opacity: 0, duration: .25, ease: 'linear'})
        this.tl.from(document.querySelector('.hero'), { opacity: 0, duration: .25, ease: 'linear'})
    }

    addEventListeners() {
        window.addEventListener('load', this.onLoad)
    }

    init() {
        this.addEventListeners()
    }
}