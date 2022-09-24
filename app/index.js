import SmoothScroll from './components/smoothScroll'
import Cursor from './components/cursor'
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
        this.styleConsoleForDevs()
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
            new Cursor()
        }
    }

    styleConsoleForDevs() {
        // 1. Pass CSS styles in an array
        const style1 = [
            'font-family: Helvetica',
            'padding-top: 20px',
            'padding-bottom: 20px',
            'font-size: 1.2rem',
        ].join(';')// 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)
    
        const style2 = [
            'color: red',
            'padding-top: 20px',
            'padding-bottom: 20px',
            'font-size: 1.2rem',
        ].join(';')
    
        const styleLink = [
            'font-size: .7rem',
            'padding-bottom: 20px',
            // 'font-family: Helvetica',
        ].join(';')
    
        // 3. Pass the styles variable
        console.log('%cMade with %c♥%c by Deepak Gangwar%c\n✌ https://deepakgangwar.me', style1, style2, style1, styleLink)
        // console.log('http://deepakgangwar.me');
    }
}

new App()