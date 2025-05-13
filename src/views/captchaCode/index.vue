<template>
  <div class="captcha-page">
    <h3>验证码生成器</h3>
    <el-input
      v-model="inputText"
      placeholder="请输入验证码内容"
      class="captcha-input"
    />
    <el-button type="primary" @click="generateCaptcha">生成验证码</el-button>
    <canvas ref="captchaCanvas" width="200" height="80" class="captcha-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "CaptchaCode",
  data() {
    return {
      inputText: "", // 用户输入的验证码内容
    };
  },
  methods: {
    generateCaptcha() {
      const canvas = this.$refs.captchaCanvas;
      const ctx = canvas.getContext("2d");

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制背景
      ctx.fillStyle = this.getRandomColor(200, 255);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制验证码文字
      ctx.font = "30px Arial";
      ctx.fillStyle = this.getRandomColor(0, 150);
      ctx.textBaseline = "middle";
      const text = this.inputText || "验证码";
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(
        text,
        (canvas.width - textWidth) / 2,
        canvas.height / 2
      );

      // 添加干扰线
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.getRandomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
        ctx.lineTo(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
        ctx.stroke();
      }

      // 添加干扰点
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = this.getRandomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
    getRandomColor(min, max) {
      const r = Math.floor(Math.random() * (max - min) + min);
      const g = Math.floor(Math.random() * (max - min) + min);
      const b = Math.floor(Math.random() * (max - min) + min);
      return `rgb(${r}, ${g}, ${b})`;
    },
  },
};
</script>

<style scoped>
.captcha-page {
  padding: 20px;
  text-align: center;
}

.captcha-input {
  margin-bottom: 10px;
  width: 300px;
}

.captcha-canvas {
  display: block;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>