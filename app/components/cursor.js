export default class Cursor {
    constructor() {
        this.bind() 
        
        this.video = document.querySelector('.video')
        this.cursor = {
            el: document.querySelector('.cursor'),
            bound: document.querySelector('.cursor').getBoundingClientRect().width,
            current: [0, 0],
            target: [0, 0],
        }

        this.ease = 0.1
        this.mouse = [0, 0]
        this.isHovering = false

        this.rAF = undefined

        this.init()
    }

    bind() {
        ['getPos', 'hideOnScroll', 'on', 'off', 'update'].forEach(fn => this[fn] = this[fn].bind(this))
    }

    createObserver() {
        if("IntersectionObserver" in window) {
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 0
            }

            const observer = new IntersectionObserver(this.hideOnScroll, options)
            observer.observe(this.video)
        }
    }

    hideOnScroll(entries, observer) {
        this.off()
        // entries.forEach(entry => {
        //     if(entry.isIntersecting) {
        //         // do something
        //     }
        // })
    }

    getPos(e) {
        this.mouse[0] = e.clientX
        this.mouse[1] = e.clientY
    }

    on() {
        this.isHovering = true
        this.cursor.el.style.opacity = 1
    }
    
    off() {
        this.isHovering = false
        this.cursor.el.style.opacity = 0
    }

    update() {
        this.cursor.current[0] += (this.mouse[0] - this.cursor.current[0]) * this.ease
        this.cursor.current[1] += (this.mouse[1] - this.cursor.current[1]) * this.ease

        this.cursor.target[0] = this.cursor.current[0] - this.cursor.bound / 2
        this.cursor.target[1] = this.cursor.current[1] - this.cursor.bound / 2
            
        this.cursor.el.style.transform = `translate3d(${this.cursor.target[0]}px, ${this.cursor.target[1]}px, 0)`
        
        this.requestAnimationFrame(this.update)
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.update)
    }
    
    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF)
    }

    addEventListeners() {
        this.video.addEventListener('mouseenter', this.on, false)
        this.video.addEventListener('mouseleave', this.off, false)
        
        window.addEventListener('mousemove', this.getPos, false)
    }
    
    removeEventListeners() {
        this.video.removeEventListener('mouseenter', this.on, false)
        this.video.removeEventListener('mouseleave', this.off, false)

        window.removeEventListener('mousemove', this.getPos, false)
    }
    
    destroy() {
        this.cursor = {}
        this.removeEventListeners()
        this.cancelAnimationFrame()
    }

    init() {
        this.createObserver()
        this.addEventListeners()
        this.update()
    }
}