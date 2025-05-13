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
      const text = this.inputText || "验证码";
      const charArray = text.split(""); // 将文字拆分为单个字符
      const charCount = charArray.length;

      charArray.forEach((char, index) => {
        const fontSize = this.getRandomInt(24, 36); // 随机字体大小
        const angle = this.getRandomInt(-40, 40); // 随机旋转角度

        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = this.getRandomColor(0, 150);
        ctx.textBaseline = "middle";

        // 保存当前状态
        ctx.save();

        // 计算每个字符的位置
        const x = (canvas.width / charCount) * index + 10;
        const y = canvas.height / 2;

        // 设置旋转
        ctx.translate(x, y);
        ctx.rotate((angle * Math.PI) / 180);

        // 绘制字符
        ctx.fillText(char, 0, 0);

        // 恢复状态
        ctx.restore();
      });

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
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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