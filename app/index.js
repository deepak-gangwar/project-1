import SmoothScroll from './components/smoothScroll'
import Cursor from './components/cursor'
import Preloader from './components/preloader'
import ConsoleStyles from './components/console'
import { check } from './utils/check'
import Carousel from './components/carousel'
import VideoPlayer from './components/videoPlayer'

class App {
    constructor() {
        this.element = document.querySelector('.app')
        this.elements = {
            wrapper: document.querySelector('.app__wrapper'),
        }

        this.createPreloader()
        this.createConsoleStyles()
        this.init()
        this.createCarousel()
        this.createVideoPlayer()
    }

    init() {
        if(!check.isMobile()) {
            new SmoothScroll(this.element, this.elements)
            new Cursor()
        }
    }

    createPreloader() {
        this.preloader = new Preloader()
    }

    createConsoleStyles() {
        ConsoleStyles()
    }

    createCarousel() {
        this.carousel = new Carousel()
    }

    createVideoPlayer() {
        this.videoPlayer = new VideoPlayer()
    }
}

new App()