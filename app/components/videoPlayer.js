export default class VideoPlayer {
    constructor() {
        this.bind()

        this.trigger = document.querySelector('.video')

        this.isMuted = false
        this.isPlaying = true
        this.isIdle = false

        this.isOpen = false
        
        this.trigger.addEventListener('click', this.togglePlayerOpen)
        
    }

    bind() {
        ['createPlayer', 'checkMute', 'checkPause', 'onClose', 'togglePlayerOpen'].forEach(fn => this[fn] = this[fn].bind(this))
    }

    togglePlayerOpen() {
        if(this.isOpen) {
            this.removePlayer()
            document.body.style.overflow = 'visible'
            this.isOpen = false
        } else {
            this.createPlayer()
            this.addEventListeners()
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
        // source.src = 'https://asset.cloudinary.com/dsd5tjyri/1cf9f64a978e407d65165e3f91919120'
        source.src = 'reel.mp4'
        source.type = 'video/mp4'
        video.appendChild(source)

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

        document.body.appendChild(videoPlayer)

        // Add all these to the UI which can be used in place of $refs
        this.ui = {
            videoPlayer,
            video,
            range,
            progress,
            pause,
            mute,
        }
    }

    removePlayer() {
        document.body.removeChild(this.ui.videoPlayer)
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

    onClose() {
        if(!this.isTouch && !this.isMobile) {
            this.togglePlayerOpen()
        }

        if(document.fullscreenElement && this.isTouch) {
            this.togglePlayerOpen()
        }
    }

    addEventListeners() {
        this.ui.video.addEventListener('click', this.onClose)
        this.ui.pause.addEventListener('click', this.checkPause)
        this.ui.mute.addEventListener('click', this.checkMute)
        
    }
}