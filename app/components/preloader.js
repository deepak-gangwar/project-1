import gsap from "gsap"
import { check } from "../utils/check"

export default class Preloader {
    constructor() {
        this.bind()

        this.preloader = document.querySelector('.preloader')
        this.elements = {
            slider: document.querySelector('.slider'),
            slides: document.querySelectorAll('.slider__item'),
            title: document.querySelectorAll('.hero__title'),
            subtitle: document.querySelector('.hero__subtitle'),
            nav: document.querySelector('.nav'),
            videoPlaceholder: document.querySelector('.video__content')
        }

        this.tl = new gsap.timeline()

        this.init()
    }

    bind() {
        ['onLoad'].forEach(fn => this[fn] = this[fn].bind(this))
    }

    onLoad() {
        this.tl.set(this.preloader, { display: 'none' })

        // slides animation
        this.tl.from(this.elements.slides, { x: '120vw', duration: 2.5, ease: "power3.inOut", stagger: 0.05 })
        this.tl.to(this.elements.slides, { y: 0, duration: 2, ease: "power3.inOut", stagger: 0.05 })

        // title reveal animation
        this.tl.set(document.body, { overflowY: 'visible' })
        this.tl.from(this.elements.title, { transform: 'translate3d(0, -150%, 0) skewY(-4deg)', duration: 1.2, ease: 'power3.out', stagger: 0.1 })

        // fade in animation
        this.tl.from(this.elements.nav, { opacity: 0, duration: .25, ease: 'linear' })
        this.tl.from(this.elements.subtitle, { opacity: 0, duration: .25, ease: 'linear' })

        //load the video now to improve performance
        this.tl.call(this.lazyLoadVideo)

    }

    lazyLoadVideo() {
        // var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"))
        const lazyVideo = document.querySelector('video.lazy')

        // Update poster attribute
        const posterSrc = check.isWebPSupported ? 'preview.webp' : 'preview.png'
        lazyVideo.setAttribute('poster', `${posterSrc}`)

        // check if intersection observer is supported by the browser 
        // (use "in" operator for detecting features)
        if ("IntersectionObserver" in window) {
            const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((video) => {

                    // when video comes in viewport i.e. intersects with root
                    if (video.isIntersecting) {
                        
                        // iterate through all child source elements (eg webm, mp4 etc.)
                        // update the source element's src to its data-src value
                        for (let source in video.target.children) {
                            let videoSource = video.target.children[source]
                            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                                videoSource.src = videoSource.dataset.src
                            }
                        }

                        // once source is updated, trigger the load of video
                        video.target.load()
                        video.target.classList.remove('lazy')
                        lazyVideoObserver.unobserve(video.target)
                    }
                })
            })

            lazyVideoObserver.observe(lazyVideo)
            // lazyVideos.forEach(function (lazyVideo) {
            //     lazyVideoObserver.observe(lazyVideo)
            // })
        }
    }

    // delayedVideoLoad() {
    //     let video = document.createElement('video')
    //     video.autoplay = true
    //     video.playsInline = true
    //     video.disablePictureInPicture = true
    //     video.loop = true
    //     video.setAttribute('muted', 'muted')
    //     video.setAttribute('oncontextmenu', 'return false;')
    //     this.elements.videoPlaceholder.appendChild(video)

    //     let source = document.createElement('source')
    //     source.src = 'preview.mp4'
    //     source.type = 'video/mp4'
    //     video.appendChild(source)
    // }

    addEventListeners() {
        window.addEventListener('load', this.onLoad)
    }

    init() {
        this.addEventListeners()
    }
}