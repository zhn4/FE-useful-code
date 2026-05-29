<template>
  <div class="live-stream-page">
    <div class="input-panel">
      <el-input
        v-model.trim="inputUrl"
        placeholder="请输入直播源地址，例如 https://example.com/live.m3u8"
        clearable
        @keyup.enter.native="handlePlay"
      >
        <el-button slot="append" type="primary" @click="handlePlay">播放</el-button>
      </el-input>
      <div class="tips">支持 mp4/webm/ogg；m3u8 会自动尝试使用 hls.js 播放。</div>
    </div>

    <div class="player-panel">
      <video ref="videoRef" class="video-player" controls autoplay playsinline></video>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'LiveStreamInput',
  data() {
    return {
      inputUrl: '',
      hlsInstance: null,
      errorMessage: '',
    }
  },
  beforeDestroy() {
    this.destroyHls()
  },
  methods: {
    handlePlay() {
      const url = this.inputUrl
      if (!url) {
        this.errorMessage = '请输入直播源地址'
        return
      }

      this.errorMessage = ''
      this.playByUrl(url)
    },
    playByUrl(url) {
      const video = this.$refs.videoRef
      if (!video) return

      this.destroyHls()
      video.pause()
      video.removeAttribute('src')
      video.load()

      if (this.isM3u8(url)) {
        if (Hls.isSupported()) {
          this.hlsInstance = new Hls()
          this.hlsInstance.loadSource(url)
          this.hlsInstance.attachMedia(video)
          this.hlsInstance.on(Hls.Events.ERROR, () => {
            this.errorMessage = 'm3u8 播放失败，请检查地址是否有效或跨域是否允许'
          })
          video.play().catch(() => {
            this.errorMessage = '播放失败，请手动点击播放器上的播放按钮'
          })
          return
        }

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = url
          video.play().catch(() => {
            this.errorMessage = '播放失败，请手动点击播放器上的播放按钮'
          })
          return
        }

        this.errorMessage = '当前浏览器不支持 m3u8 播放'
        return
      }

      video.src = url
      video.play().catch(() => {
        this.errorMessage = '播放失败，请检查直播源地址或手动点击播放'
      })
    },
    isM3u8(url) {
      return /\.m3u8($|\?)/i.test(url)
    },
    destroyHls() {
      if (this.hlsInstance) {
        this.hlsInstance.destroy()
        this.hlsInstance = null
      }
    },
  },
}
</script>

<style lang="less" scoped>
.live-stream-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #f5f7fa;
}

.input-panel {
  width: 100%;
}

.tips {
  margin-top: 8px;
  color: #606266;
  font-size: 12px;
}

.player-panel {
  flex: 1;
  min-height: 360px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.video-player {
  width: 100%;
  height: calc(100% - 24px);
  min-height: 320px;
  background: #000;
}

.error-message {
  margin-top: 8px;
  color: #f56c6c;
  font-size: 12px;
}
</style>
