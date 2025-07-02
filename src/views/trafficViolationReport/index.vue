<template>
  <el-form :model="form" ref="formRef" label-width="100px" :rules="rules">
    <el-form-item label="举报时间" prop="reportTime">
      <el-date-picker v-model="form.reportTime" type="datetime" placeholder="请选择举报时间" style="width: 100%;" />
    </el-form-item>
    <el-form-item label="事发路段" prop="road">
      <el-input v-model="form.road" placeholder="请输入事发路段" />
    </el-form-item>
    <el-form-item label="违规行为" prop="violation">
      <el-input v-model="form.violation" placeholder="请输入违规行为" />
    </el-form-item>
    <el-form-item label="图片" prop="images">
      <el-upload
        action=""
        list-type="picture-card"
        :file-list="form.images"
        :show-file-list="true"
        :auto-upload="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-change="handleChange"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="车牌号" prop="plateNumber">
      <el-input v-model="form.plateNumber" placeholder="请输入车牌号" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Tesseract from 'tesseract.js';

export default {
  data() {
    return {
      form: {
        reportTime: '',
        road: '',
        violation: '',
        images: [],
        plateNumber: ''
      },
      rules: {
        reportTime: [{ required: true, message: '请选择举报时间', trigger: 'change' }],
        road: [{ required: true, message: '请输入事发路段', trigger: 'blur' }],
        violation: [{ required: true, message: '请输入违规行为', trigger: 'blur' }],
        plateNumber: [{ required: true, message: '请输入车牌号', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$message.success('提交成功');
          // 提交逻辑
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    handlePreview(file) {
      window.open(file.url || file.response?.url);
    },
    handleRemove(file, fileList) {
      this.form.images = fileList;
    },
    async handleSuccess(response, file, fileList) {
      console.log(response)
      this.form.images = fileList;
      // 只识别最新上传的图片
      const imgUrl = file.url || (file.response && file.response.url) || file.raw && URL.createObjectURL(file.raw);
      if (imgUrl) {
        this.$message.info('正在识别车牌号...');
        try {
          const { data: { text } } = await Tesseract.recognize(imgUrl, 'eng');
          // 简单正则提取车牌号（可根据实际情况优化）
          const match = text.match(/[A-Z0-9]{5,}/);
          if (match) {
            this.form.plateNumber = match[0];
            this.$message.success('车牌号识别成功');
          } else {
            this.$message.warning('未识别到车牌号');
          }
        } catch (e) {
          this.$message.error('车牌号识别失败');
        }
      }
    },
    async handleChange(file, fileList) {
      // this.file = file
      console.log('文件变化: file', file);
      console.log('文件变化: fileList', fileList);
      // const imgUrl = file.url || (file.response && file.response.url) || file.raw && URL.createObjectURL(file.raw);
      const imgUrl =  URL.createObjectURL(file.raw) 
      if (imgUrl) {
        this.$message.info('正在识别车牌号...');
        try {
          // const { data: { text } } = await Tesseract.recognize(imgUrl, 'eng');
          const data = await Tesseract.recognize(imgUrl, 'eng');
          // 简单正则提取车牌号（可根据实际情况优化）
          console.log('识别结果:', data);
          console.log('识别结果:', data.data.text);
          // const match = text.match(/[A-Z0-9]{5,}/);
          // if (match) {
          //   this.form.plateNumber = match[0];
          //   this.$message.success('车牌号识别成功');
          // } else {
          //   this.$message.warning('未识别到车牌号');
          // }
        } catch (e) {
          this.$message.error('车牌号识别失败');
        }
      }
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('只能上传图片文件');
      }
      return isImage;
    }
  }
};
</script>