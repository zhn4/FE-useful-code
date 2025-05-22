<template>
  <div class="svg-gen-page">
    <div class="svg-preview" :style="{ width: svgWidth + 'px', height: svgHeight + 'px' }">
      <svg :width="svgWidth" :height="svgHeight" style="background: #f8faff;">
        <!-- X轴 -->
        <line x1="0" :y1="svgHeight - 1" :x2="svgWidth" :y2="svgHeight - 1" stroke="#bbb" stroke-width="1" />
        <text :x="svgWidth - 20" :y="svgHeight - 8" font-size="12" fill="#888">X</text>
        <!-- Y轴 -->
        <line x1="1" y1="0" x2="1" :y2="svgHeight" stroke="#bbb" stroke-width="1" />
        <text x="8" y="14" font-size="12" fill="#888">Y</text>
        <!-- 曲线和控制点 -->
        <path :d="svgPath" :stroke="color" :stroke-width="strokeWidth" :stroke-dasharray="dashArray" fill="none" />
        <circle :cx="startX" :cy="startY" r="3" fill="green" />
        <circle :cx="endX" :cy="endY" r="3" fill="red" />
        <circle :cx="cpX" :cy="cpY" r="3" fill="#E6A23C" />
      </svg>
      <!-- <div class="svg-source">
        <pre>{{ svgSource }}</pre>
      </div> -->
    </div>
    <div class="svg-params">
      <el-form label-width="80px">
        <el-form-item label="起点X">
          <el-slider v-model="startX" :min="0" :max="svgWidth" show-input class="start-point" />
        </el-form-item>
        <el-form-item label="起点Y">
          <el-slider v-model="startY" :min="0" :max="svgHeight" show-input class="start-point" />
        </el-form-item>
        <el-form-item label="终点X">
          <el-slider v-model="endX" :min="0" :max="svgWidth" show-input class="end-point" />
        </el-form-item>
        <el-form-item label="终点Y">
          <el-slider v-model="endY" :min="0" :max="svgHeight" show-input class="end-point" />
        </el-form-item>
        <el-form-item label="控制点X">
          <el-slider v-model="cpX" :min="0" :max="svgWidth" show-input class="ctl-point" />
        </el-form-item>
        <el-form-item label="控制点Y">
          <el-slider v-model="cpY" :min="0" :max="svgHeight" show-input class="ctl-point" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="color"></el-color-picker>
          <el-input v-model="color" />
        </el-form-item>
        <el-form-item label="线宽">
          <el-slider v-model="strokeWidth" :min="1" :max="10" show-input />
        </el-form-item>
        <el-form-item label="虚线">
          <el-input v-model="dashArray" placeholder="如 6,6" />
        </el-form-item>
      </el-form>
      <div class="svg-source">
        <pre>{{ svgSource }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SvgGen",
  data() {
    return {
      svgWidth: 300,
      svgHeight: 120,
      startX: 20,
      startY: 20,
      endX: 280,
      endY: 100,
      cpX: 20,
      cpY: 100,
      color: "#409EFF",
      strokeWidth: 2,
      dashArray: "6,6",
    };
  },
  computed: {
    svgPath() {
      // 二次贝塞尔曲线
      return `M${this.startX},${this.startY} Q${this.cpX},${this.cpY} ${this.endX},${this.endY}`;
    },
    svgSource() {
      // 生成 SVG 源码字符串
      return `<svg width="${this.svgWidth}" height="${this.svgHeight}">
  <line x1="0" y1="${this.svgHeight - 1}" x2="${this.svgWidth}" y2="${this.svgHeight - 1}" stroke="#bbb" stroke-width="1" />
  <text x="${this.svgWidth - 20}" y="${this.svgHeight - 8}" font-size="12" fill="#888">X</text>
  <line x1="1" y1="0" x2="1" y2="${this.svgHeight}" stroke="#bbb" stroke-width="1" />
  <text x="8" y="14" font-size="12" fill="#888">Y</text>
  <path d="${this.svgPath}" stroke="${this.color}" stroke-width="${this.strokeWidth}" stroke-dasharray="${this.dashArray}" fill="none"/>
  <circle cx="${this.startX}" cy="${this.startY}" r="3" fill="green"/>
  <circle cx="${this.endX}" cy="${this.endY}" r="3" fill="red"/>
  <circle cx="${this.cpX}" cy="${this.cpY}" r="3" fill="blue"/>
</svg>`;
    }
  },
};
</script>

<style scoped>
.svg-gen-page {
  display: flex;
  gap: 40px;
  padding: 32px;
}

.svg-preview {
  background: #f8faff;
  border: 1px solid #e3e8ee;
  border-radius: 8px;
  /* width: 320px; */
  /* height: 240px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 16px;
}

.svg-source {
  width: 100%;
  margin-top: 16px;
  background: #222;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  padding: 8px;
  overflow-x: auto;
  max-height: 120px;
}

.svg-params {
  flex: 1;
  min-width: 300px;
  padding-right: 50px;
}

.start-point ::v-deep .el-slider__bar {
  background-color: green;
}

.start-point ::v-deep .el-slider__button {
  border-color: green;
}

.end-point ::v-deep .el-slider__bar {
  background-color: red;
}

.end-point ::v-deep .el-slider__button {
  border-color: red;
}

.ctl-point ::v-deep .el-slider__bar {
  background-color: #E6A23C;
}

.ctl-point ::v-deep .el-slider__button {
  border-color: #E6A23C;
}
</style>