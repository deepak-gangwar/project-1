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

    init() {
        new SmoothScroll(this.element, this.elements)
        console.log("App")
    }
}

new App()