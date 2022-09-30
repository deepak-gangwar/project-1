import SmoothScroll from './components/smoothScroll'
import Cursor from './components/cursor'
import Preloader from './components/preloader'
import ConsoleStyles from './components/console'

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