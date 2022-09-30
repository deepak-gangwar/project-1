import SmoothScroll from './components/smoothScroll'
import Cursor from './components/cursor'
import Preloader from './components/preloader'
import ConsoleStyles from './components/console'
import { check } from './utils/check'

class App {
    constructor() {
        this.element = document.querySelector('.app')
        this.elements = {
            wrapper: document.querySelector('.app__wrapper'),
        }

        this.createPreloader()
        this.createConsoleStyles()
        this.init()
    }

    init() {
        if(!check.isMobile()) {
            new SmoothScroll(this.element, this.elements)
            new Cursor()
        }
    }

    createPreloader() {
        this.preloader = new Preloader
    }

    createConsoleStyles() {
        ConsoleStyles()
    }
}

new App()