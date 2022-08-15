import SmoothScroll from './components/smoothScroll'
import { split } from './utils/text'

class App {
    constructor() {
        this.element = document.querySelector('.app')
        this.elements = {
            wrapper: document.querySelector('.app__wrapper'),
            heroLines: document.querySelectorAll('.hero__line__wrapper'),
            heroDescription: document.querySelector('.hero__description')
        }

        this.init()
    }

    // if it is not a mobile device then you run the code.
    isMobile() {
        if(!(/iPhone|iPad|iPod|Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent) )) {
            return false
        } else {
            return true
        }
    }

    init() {
        if(!this.isMobile()) {
            new SmoothScroll(this.element, this.elements)
        }
    }
}

new App()