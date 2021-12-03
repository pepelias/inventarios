export const getVideo = new (class {
  constructor() {
    this.stream = null
  }

  async init() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 1280, ideal: 1920, max: 2560 },
          height: { min: 720, ideal: 1080, max: 1440 },
          frameRate: { ideal: 30, max: 30 },
          facingMode: 'environment',
        },
        audio: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async video() {
    if (this.stream) return this.stream
    await this.init()
    return this.stream
  }

  stop() { this.stream.stop() }
})()
