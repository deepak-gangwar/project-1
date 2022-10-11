import gsap from "gsap"

export default class VideoPlayer {
    constructor() {
        this.bind()

        this.isMobile = this.setIsMobile()
        this.isAndroid = this.setIsAndroid()

        this.isMuted = false
        this.isPlaying = true
        this.isIdle = false
        this.isOpen = false
        
        this.rAF = undefined
        
        this.trigger = document.querySelector('section.video')
        this.trigger.addEventListener('click', this.togglePlayerOpen)
    }

    bind() {
        ['createPlayer', 'checkMute', 'checkPause', 'onRaf', 'onClose', 'togglePlayerOpen', 'onEnded', 'changeTime', 'onCanPlay', 'onMouseMove', 'onIdle', 'enter'].forEach(fn => this[fn] = this[fn].bind(this))
    }

    setIsMobile() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    }

    setIsAndroid() {
        return window.navigator.userAgent.toLowerCase().includes("android")
    }

    togglePlayerOpen() {
        if(this.isOpen) {
            this.removePlayer()
            document.body.style.overflow = 'visible'
            this.isOpen = false
        } else {
            this.init()
            document.body.style.overflow = 'hidden'
            this.isOpen = true
        }
    }

    createPlayer() {
        let videoPlayer = document.createElement('div')
        videoPlayer.classList.add('video-player')

        let video = document.createElement('video')
        video.classList.add('video')
        video.autoplay = true
        video.crossOrigin = 'anonymous'
        video.disablePictureInPicture = true
        videoPlayer.appendChild(video)

        let source = document.createElement('source')
        // source.src = t.video.video.src
        // source.src = 'https://asset.cloudinary.com/dsd5tjyri/21751a2e43f3e881b71a367602311186'
        source.src = 'reel.mp4'
        source.type = 'video/mp4'
        video.appendChild(source)

        let close = document.createElement('button')
        close.classList.add('close')
        close.innerHTML = "Close"
        videoPlayer.appendChild(close)


        let gradient = document.createElement('div')
        gradient.classList.add('gradient')
        videoPlayer.append(gradient)

        let controls = document.createElement('div')
        controls.classList.add('controls')
        videoPlayer.appendChild(controls)

        let pause = document.createElement('button')
        pause.classList.add('pause')
        pause.innerHTML = "Pause"
        controls.appendChild(pause)
        
        let timeline = document.createElement('div')
        timeline.classList.add('timeline')
        controls.appendChild(timeline)
        
        let range = document.createElement('input')
        range.classList.add('range')
        range.setAttribute('min', '0')
        range.setAttribute('step', '0.5')
        range.setAttribute('type', 'range')
        timeline.appendChild(range)

        let progress = document.createElement('progress')
        progress.classList.add('progress')
        progress.setAttribute('max', '100')
        timeline.appendChild(progress)

        let mute = document.createElement('button')
        mute.classList.add('mute')
        mute.innerHTML = "Mute"
        controls.appendChild(mute)

        // Add all these to the UI which can be used in place of $refs
        this.ui = {
            videoPlayer,
            video,
            range,
            progress,
            pause,
            mute,
            close
        }

        this.enter()
        document.body.appendChild(videoPlayer)
    }

    removePlayer() {
        document.body.removeChild(this.ui.videoPlayer)
    }

    isNative() {
        this.ui.video.play()
        this.ui.video.setAttribute("controls", "controls")

        if (this.isAndroid) {
            this.ui.video.requestFullscreen()
        } else {
            this.ui.video.addEventListener("webkitendfullscreen", function() {
                this.togglePlayerOpen()
            })
        }
    }

    onRaf() {
        this.setTime()
        this.requestAnimationFrame(this.onRaf)
    }
    
    onCanPlay() {
        let ui = this.ui,
            video = ui.video,
            range = ui.range,
            progress = ui.progress;

        if(null != video && video.duration) {
            range.max = Math.round(10 * video.duration)
            progress.max = Math.round(10 * video.duration)
        }
    }

    onMouseMove() {
        const vp = this.ui.videoPlayer

        if(!this.isIdle) {
            this.isIdle = true
            // if(null === (vp = this.$el) || vp !== undefined) {
            if(null === vp || vp !== undefined) {
                vp.classList.add("is-idle")
                // this.onMouseEnterCursor("close", "Close")
            }
        }

        if(this.isIdle) {
            this.isIdle = false
            gsap.killTweensOf(this.onIdle)
            gsap.delayedCall(1.5, this.onIdle)
        }
    }

    onIdle() {
        const vp = this.ui.videoPlayer

        // if(null === (vp = this.$el) || vp !== undefined) {
        if(null === vp || vp !== undefined) {
            vp.classList.remove("is-idle")
            // this.onMouseLeaveCursor()
        }
    }

    checkMute() {
        if(this.isMuted) 
            this.onMuted()
        else 
            this.onMute()
    }

    onMute() {
        this.ui.video.muted = true
        // this.ui.video.setAttribute('muted', 'true')
        this.ui.mute.innerHTML = "Unmute"
        this.isMuted = true
    }
    
    onMuted() {
        this.ui.video.muted = false
        // this.ui.video.setAttribute('muted', 'false')
        this.ui.mute.innerHTML = "Mute"
        this.isMuted = false
    }

    checkPause() {
        if(this.isPlaying) 
            this.onPause()
        else 
            this.onPlay()
    }

    onPlay() {
        this.ui.video.play()
        this.ui.pause.textContent = 'Pause'
        this.isPlaying = true
    }
    
    onPause() {
        this.ui.video.pause()
        this.ui.pause.textContent = 'Play'
        this.isPlaying = false
    }

    onEnded() {
        this.togglePlayerOpen()
    }

    onClose() {
        if(!this.isTouch && !this.isMobile) {
            this.leave(this.togglePlayerOpen)
        }

        if(document.fullscreenElement && this.isTouch) {
            this.togglePlayerOpen()
        }
    }

    setTime() {
        let ui = this.ui, 
            video = ui.video,
            range = ui.range,
            progress = ui.progress;

        this.videoCurrentTime = video.currentTime
        range.value = 10 * video.currentTime
        progress.value = 10 * video.currentTime
    }

    changeTime() {
        this.ui.video.currentTime = this.ui.range.value / 10 
        this.setTime()
    }

    enter() {
        gsap.fromTo(this.ui.videoPlayer, { autoAlpha: 0 }, { autoAlpha: 1 })
    }

    leave(t) {
        this.ui.video.pause()
        gsap.fromTo(this.ui.videoPlayer, { autoAlpha: 1 }, { autoAlpha: 0, onComplete: t })
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.onRaf)
    }

    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF)
    }

    addEventListeners() {
        this.ui.videoPlayer.addEventListener('mousemove', this.onMouseMove)
        
        this.ui.video.addEventListener('click', this.onClose)
        this.ui.video.addEventListener('fullscreenchange', this.onClose)
        this.ui.video.addEventListener('ended', this.onEnded)
        this.ui.video.addEventListener('canplay', this.onCanPlay)
        
        this.ui.pause.addEventListener('click', this.checkPause)
        this.ui.range.addEventListener('input', this.changeTime)
        this.ui.mute.addEventListener('click', this.checkMute)
        this.ui.close.addEventListener('click', this.onClose)
        
    }
    
    removeEventListeners() {
        this.ui.videoPlayer.removeEventListener('mousemove', this.onMouseMove)
        
        this.ui.video.removeEventListener('click', this.onClose)
        this.ui.video.addEventListener('fullscreenchange', this.onClose)
        this.ui.video.removeEventListener('ended', this.onEnded)
        this.ui.video.removeEventListener('canplay', this.onCanPlay)
        
        this.ui.pause.removeEventListener('click', this.checkPause)
        this.ui.range.removeEventListener('input', this.changeTime)
        this.ui.mute.removeEventListener('click', this.checkMute)
        this.ui.close.removeEventListener('click', this.onClose)

    }

    destroy() {
        if(!this.isTouch) {
            gsap.killTweensOf(this.onIdle)

            this.removeEventListeners()
            this.cancelAnimationFrame()
        }
    }

    init() {
        if(this.isTouch) {
            this.isNative()
        } else {
            this.createPlayer()
            this.addEventListeners()
            this.onRaf()
        }
    }
}