import gsap from "gsap"

export default class Preloader {
    constructor() {
        this.bind()

        this.preloader = document.querySelector('.preloader')
        // this.slider = document.querySelector('.slider')
        // this.slides = this.slider.querySelectorAll('.slider__item')
        // this.heroTitle = document.querySelectorAll('.hero__title')
        this.elements = {
            slider: document.querySelector('.slider'),
            slides: document.querySelectorAll('.slider__item'),
            title: document.querySelectorAll('.hero__title'),
            subtitle: document.querySelector('.hero__subtitle'),
            nav: document.querySelector('.nav'),
        }

        this.tl = new gsap.timeline()

        this.init()
    }
    
    bind() {
        ['onLoad'].forEach(fn => this[fn] =  this[fn].bind(this))
    }

    onLoad() {
        this.tl.set(this.preloader, { display: 'none' })
        
        // slides animation
        this.tl.from(this.elements.slides, { x: '120vw', duration: 2.5, ease: "power3.inOut", stagger: 0.05 })
        this.tl.to(this.elements.slides, { y: 0, duration: 2, ease: "power3.inOut", stagger: 0.05 })

        // title reveal animation
        this.tl.set(document.body, { overflow: 'visible' })
        this.tl.from(this.elements.title, { transform: 'translate3d(0, -150%, 0) skewY(-4deg)', duration: 1.2, ease: 'power3.out', stagger: 0.1})

        // fade in animation
        this.tl.from(this.elements.nav, { opacity: 0, duration: .25, ease: 'linear'})
        this.tl.from(this.elements.subtitle, { opacity: 0, duration: .25, ease: 'linear'})
    }

    addEventListeners() {
        window.addEventListener('load', this.onLoad)
    }

    init() {
        this.addEventListeners()
    }
}