export default class Carousel {
    constructor() {
        this.bind()

        this.slider = {
            slider: document.querySelector('.carousel__content'),
            headings: document.querySelectorAll('.carousel__heading'),
            texts: document.querySelectorAll('.carousel__text'),
            arrows: {
                left: document.querySelector('.carousel__arrow--left'),
                right: document.querySelector('.carousel__arrow--right'),
            }
        }

        this.slidesNum = this.slider.headings.length
        this.current = 0

        this.addEventListeners()
    }

    bind() {
        ['goToNext', 'goToPrev'].forEach(fn => this[fn] = this[fn].bind(this))
    }
    
    goToNext() {
        this.onCurrentItemChange(1)
    }
    
    goToPrev() {
        this.onCurrentItemChange(-1)
    }

    onCurrentItemChange(e) {
        let index = this.current + e

        this.slider.headings[this.current].classList.remove('current')
        this.slider.texts[this.current].classList.remove('current')
        
        if(index >= 0 && index < this.slidesNum) {
            this.current = index
        } else if (index < 0) {
            this.current = this.slidesNum - 1
        } else if (index >= this.slidesNum) {
            this.current = 0
        }
        
        this.slider.headings[this.current].classList.add('current')
        this.slider.texts[this.current].classList.add('current')
    }

    addEventListeners() {
        this.slider.arrows.left.addEventListener('click', this.goToPrev)
        this.slider.arrows.right.addEventListener('click', this.goToNext)
    }
}