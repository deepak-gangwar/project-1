import gsap from "gsap"

export default class Cursor {
    constructor() {
        this.bind() 

        this.ease = 0.1

        this.video = document.querySelector('.video')
        this.cursor = {
            el: document.querySelector('.cursor'),
            bound: document.querySelector('.cursor').getBoundingClientRect().width,
            pos: {
                x: 0,
                y: 0
            }
        }

        this.target = {
            x: 0,
            y: 0
        }

        this.mouse = {
            x: 0,
            y: 0
        }

        this.state = {
            isHovering: false
        }

        this.rAF = undefined

        this.init()
    }

    bind() {
        ['getPos', 'on', 'off', 'update'].forEach(fn => this[fn] = this[fn].bind(this))
    }

    getPos(e) {
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY
    }

    on() {
        this.state.isHovering = true
        this.cursor.el.style.opacity = 1
    }
    
    off() {
        this.state.isHovering = false
        this.cursor.el.style.opacity = 0
    }

    update() {
        this.cursor.pos.x += (this.mouse.x - this.cursor.pos.x) * this.ease
        this.cursor.pos.y += (this.mouse.y - this.cursor.pos.y) * this.ease

        this.target.x = this.cursor.pos.x - this.cursor.bound / 2
        this.target.y = this.cursor.pos.y - this.cursor.bound / 2
            
        this.cursor.el.style.transform = `translate3d(${this.target.x}px, ${this.target.y}px, 0)`
        
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
        this.addEventListeners()
        this.update()
    }
}