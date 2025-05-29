<template>
  <div class="tv-stream-page">
    <div class="btns">
      <el-button type="primary" size="mini" @click="fetchM3uList" :loading="loading"
        :disabled="loading">手动刷新直播源</el-button>
      <el-select v-model="selectedUrl" :placeholder="`选择源(${streamList.length})`" filterable style="width: 180px;">
        <el-option v-for="(item, index) in streamList" :key="index" :label="`${index + 1} - ${item.name}`"
          :value="item.url" />
      </el-select>
      <el-select v-model="selectedUrl" :placeholder="`FLV源(${streamListByFLV.length})`" filterable
        style="width: 180px;">
        <el-option v-for="(item, index) in streamListByFLV" :key="index" :label="`${index + 1} - ${item.name}`"
          :value="item.url" />
      </el-select>
      <el-select v-model="selectedUrl" :placeholder="`HLV源(${streamListByHLV.length})`" filterable
        style="width: 180px;">
        <el-option v-for="(item, index) in streamListByHLV" :key="index" :label="`${index + 1} - ${item.name}`"
          :value="item.url" />
      </el-select>
    </div>
    <div v-if="selectedUrl" class="player-area">
      <div id="dplayer" style="width: 800px; height: 450px; background: #000"></div>
    </div>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import flvjs from 'flv.js'; // 引入 flv.js

const STREAM_CACHE_KEY = 'tv_stream_list_cache';

export default {
  name: "TvStream",
  data() {
    return {
      streamList: [],
      selectedUrl: "",
      dp: null,
      loading: false,
    };
  },
  computed: {
    streamListByFLV() {
      return this.streamList.filter(item => item.url.endsWith('.flv') || item.url.endsWith('.hlv'));
    },
    streamListByHLV() {
      return this.streamList.filter(item => item.url.endsWith('.m3u8') || item.url.endsWith('.hlv'));
    }
  },
  watch: {
    selectedUrl(newUrl) {
      if (newUrl) {
        this.initPlayer(newUrl);
      }
    }
  },
  mounted() {
    // 优先读取缓存
    const cache = localStorage.getItem(STREAM_CACHE_KEY);
    if (cache) {
      try {
        this.streamList = JSON.parse(cache);
      } catch (e) { }
    }
    // 自动拉取一次最新
    this.fetchM3uList();
  },
  methods: {
    async fetchM3uList() {
      this.loading = true
      try {
        const res = await fetch("https://gh.tryxd.cn/raw.githubusercontent.com/suxuang/myIPTV/main/ipv4.m3u");
        const text = await res.text();
        this.streamList = this.parseM3u(text);
        this.loading = false;
        // 缓存到 localStorage
        localStorage.setItem(STREAM_CACHE_KEY, JSON.stringify(this.streamList));
      } catch (e) {
        this.loading = false;
        this.$message.error("直播源列表获取失败");
      }
    },
    parseM3u(m3uText) {
      const lines = m3uText.split('\n');
      const list = [];
      let name = '';
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF')) {
          const match = line.match(/,(.*)$/);
          name = match ? match[1].trim() : '未知频道';
        } else if (line && !line.startsWith('#')) {
          list.push({ name, url: line });
        }
      }
      return list;
    },
    initPlayer(url) {
      console.log("初始化播放器，当前URL:", url);
      if (this.dp) {
        this.dp.destroy();
        this.dp = null;
      }
      // 判断格式
      let type = 'auto';
      let customType = {};
      if (url.endsWith('.m3u8')) {
        console.log("检测到 HLS 流，使用 customHls");
        type = 'customHls';
        customType = this.handleHLV(url)
      } else if (url.endsWith('.flv') || url.endsWith('.hlv')) {
        console.log("检测到 FLV 流，使用 customFlv");
        type = 'customFlv';
        customType = this.handleFLV(url);
      }
      this.$nextTick(() => {
        this.dp = new DPlayer({
          container: document.getElementById('dplayer'),
          autoplay: true,
          video: {
            url: url,
            type: type,
            customType: customType
          }
        });
        // 自动切换 customType
        // if (type === 'customHls') {
        //   this.dp.switchVideo({
        //     url: url,
        //     type: 'customHls'
        //   });
        // } else if (type === 'customFlv') {
        //   this.dp.switchVideo({
        //     url: url,
        //     type: 'customFlv'
        //   });
        // }
      });
    },
    handleFLV(url) {
      return {
        customFlv: function (video) {
          if (flvjs.isSupported()) {
            const flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: url
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
            flvPlayer.play();
          }
        }
      }
    },
    handleHLV(url) {
      return {
        customHls: function (video) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.tv-stream-page {
  padding: 32px;
  background: #f8faff;
  min-height: 100vh;
}

.player-area {
  margin-top: 24px;
}

.btns {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}
</style>