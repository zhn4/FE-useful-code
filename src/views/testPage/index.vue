<template>
  <div class="test-page">
    <!-- <div class="video-part">
      <video
        ref="video"
        autoplay
        class="video"
        playsinline
        style="width: 640px; height: 480px; background: #000"
      ></video>
      <div class="video-controls">
        <el-button type="danger" @click="closeCamera" size="large">关闭摄像头</el-button>
        <el-button type="primary" @click="openCamera" size="large">打开摄像头</el-button>
      </div>
    </div>
    <div class="img-part">
      <div class="title">截图列表</div>
      <div class="img-list">
        <template v-for="(item, index) in imgSrcList">
          <div class="img-item" :key="index">
            <div>第{{ index + 1 }}张图片</div>
            <img :src="item" :key="index" class="img" />
          </div>
        </template>
      </div>
    </div> -->
    <!-- <FlowChart /> -->
    <!-- <VueSuperFlow /> -->
    <AntvPage />
  </div>
</template>

<script>
import Tesseract from 'tesseract.js'

// import FlowChart from './components/FlowChart.vue'

import VueSuperFlow from './components/VueSuperFlow.vue'
import AntvPage from './components/AntvPage.vue'

export default {
  components: {
    // FlowChart,
    VueSuperFlow,
    AntvPage,
  },
  data() {
    return {
      stream: null,
      recognizeTimer: null,
      imgSrcList: [],
    }
  },
  methods: {
    async openCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true })
        this.$refs.video.srcObject = this.stream
        this.startRecognize()
      } catch (e) {
        this.$message.error('无法打开摄像头')
      }
    },
    closeCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop())
        this.stream = null
        this.$refs.video.srcObject = null
      }
      clearInterval(this.recognizeTimer)
    },
    startRecognize() {
      this.recognizeTimer = setInterval(this.recognizeFrame, 2000)
    },
    async recognizeFrame() {
      const video = this.$refs.video
      // 创建离屏canvas
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      // 用img展示当前帧
      // this.imgSrc = canvas.toDataURL('image/png');
      const currentImg = canvas.toDataURL('image/png')
      this.imgSrcList.push(currentImg)
      console.log(this.imgSrcList)
      // 识别内容
      const {
        data: { text },
      } = await Tesseract.recognize(currentImg, 'eng')
      console.log('识别内容:', text)
    },
  },
  beforeDestroy() {
    this.closeCamera()
  },
}
</script>

<style lang="less" scoped>
.test-page {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
}

.video-part {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  .video {
    margin-bottom: 10px;
  }
}

.img-part {
  width: 240px;
  height: 480px;
  overflow: auto;
  border: 1px solid #ccc;

  .title {
    font-size: 16px;
    font-weight: bold;
    position: sticky;
    top: 0;
    padding: 10px;
    background: #f5f5f5;
  }

  .img-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .img {
    width: 100%;
    height: auto;
  }
}
</style>
