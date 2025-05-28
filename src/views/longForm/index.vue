<template>
  <div class="long-form-page">
    <el-form :model="form" label-width="120px" class="medical-form" ref="medicalForm">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请选择">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="form.age" :min="0" :max="120" />
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.idNumber" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="form.maritalStatus" placeholder="请选择">
          <el-option label="未婚" value="未婚" />
          <el-option label="已婚" value="已婚" />
          <el-option label="离异" value="离异" />
          <el-option label="丧偶" value="丧偶" />
        </el-select>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="form.occupation" />
      </el-form-item>
      <el-form-item label="过敏史">
        <el-input v-model="form.allergyHistory" placeholder="如无请填无" />
      </el-form-item>
      <el-form-item label="既往病史">
        <el-input v-model="form.pastMedicalHistory" placeholder="如无请填无" />
      </el-form-item>
      <el-form-item label="家族病史">
        <el-input v-model="form.familyHistory" placeholder="如无请填无" />
      </el-form-item>
      <el-form-item label="现病史">
        <el-input v-model="form.currentIllness" type="textarea" rows="6" />
      </el-form-item>
      <el-form-item label="主要症状">
        <el-input v-model="form.mainSymptoms" type="textarea" rows="6" />
      </el-form-item>
      <el-form-item label="体温(℃)">
        <el-input-number v-model="form.temperature" :min="30" :max="45" :step="0.1" />
      </el-form-item>
      <el-form-item label="脉搏(次/分)">
        <el-input-number v-model="form.pulse" :min="30" :max="200" />
      </el-form-item>
      <el-form-item label="呼吸(次/分)">
        <el-input-number v-model="form.breath" :min="10" :max="60" />
      </el-form-item>
      <el-form-item label="血压(mmHg)">
        <el-input v-model="form.bloodPressure" placeholder="如120/80" />
      </el-form-item>
      <el-form-item label="身高(cm)">
        <el-input-number v-model="form.height" :min="30" :max="250" />
      </el-form-item>
      <el-form-item label="体重(kg)">
        <el-input-number v-model="form.weight" :min="2" :max="300" />
      </el-form-item>
      <el-form-item label="吸烟史">
        <el-select v-model="form.smoking" placeholder="请选择">
          <el-option label="无" value="无" />
          <el-option label="有" value="有" />
        </el-select>
      </el-form-item>
      <el-form-item label="饮酒史">
        <el-select v-model="form.drinking" placeholder="请选择">
          <el-option label="无" value="无" />
          <el-option label="有" value="有" />
        </el-select>
      </el-form-item>
      <el-form-item label="用药史">
        <el-input v-model="form.medicationHistory" placeholder="如无请填无" />
      </el-form-item>
      <el-form-item label="手术史">
        <el-input v-model="form.surgeryHistory" placeholder="如无请填无" />
      </el-form-item>
      <el-form-item label="疫苗接种史">
        <el-input v-model="form.vaccineHistory" placeholder="如无请填无" />
      </el-form-item>
      <el-form-item label="月经史">
        <el-input v-model="form.menstrualHistory" placeholder="如无请填无/不适用" />
      </el-form-item>
      <el-form-item label="孕产史">
        <el-input v-model="form.obstetricHistory" placeholder="如无请填无/不适用" />
      </el-form-item>
      <el-form-item label="辅助检查">
        <el-input v-model="form.auxiliaryExam" type="textarea" rows="6" />
      </el-form-item>
      <el-form-item label="初步诊断">
        <el-input v-model="form.preliminaryDiagnosis" type="textarea" rows="6" />
      </el-form-item>
      <el-form-item label="处理意见">
        <el-input v-model="form.treatmentAdvice" type="textarea" rows="6" />
      </el-form-item>
      <el-form-item label="主治医生">
        <el-input v-model="form.doctor" />
      </el-form-item>
      <el-form-item label="就诊日期">
        <el-date-picker v-model="form.visitDate" type="date" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" rows="6" />
      </el-form-item>
      <el-form-item class="modify-item">
        <el-button type="primary" @click="submitForm" size="large">提交</el-button>
        <el-button @click="resetForm" size="large">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LongForm",
  data() {
    return {
      form: {
        name: "",
        gender: "",
        age: null,
        idNumber: "",
        phone: "",
        address: "",
        maritalStatus: "",
        occupation: "",
        allergyHistory: "",
        pastMedicalHistory: "",
        familyHistory: "",
        currentIllness: "",
        mainSymptoms: "",
        temperature: null,
        pulse: null,
        breath: null,
        bloodPressure: "",
        height: null,
        weight: null,
        smoking: "",
        drinking: "",
        medicationHistory: "",
        surgeryHistory: "",
        vaccineHistory: "",
        menstrualHistory: "",
        obstetricHistory: "",
        auxiliaryExam: "",
        preliminaryDiagnosis: "",
        treatmentAdvice: "",
        doctor: "",
        visitDate: "",
        remark: ""
      },
      saveTimer: null
    };
  },
  mounted() {
    this.$notify({
      title: '提示1',
      message: '长表单，带缓存机制，防止误操作刷新或浏览器卡死，刷新页面自动加载缓存数据',
      type: 'success',
      position: 'bottom-right',
      duration: 10000
    });
    setTimeout(() => {
      this.$notify({
        title: '提示2',
        message: '请注意：重置按钮会清除缓存数据',
        type: 'success',
        position: 'bottom-right',
        duration: 10000
      });
    }, 1000);
    // 页面加载时尝试恢复缓存
    const cache = localStorage.getItem('medicalFormCache');
    if (cache) {
      try {
        this.form = JSON.parse(cache);
      } catch (e) {
        console.error("恢复缓存失败:", e);
        localStorage.removeItem('medicalFormCache'); // 清除无效缓存
      }
    }
  },
  watch: {
    form: {
      handler() {
        if (this.saveTimer) clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(() => {
          localStorage.setItem('medicalFormCache', JSON.stringify(this.form));
        }, 2000);
      },
      deep: true
    }
  },
  methods: {
    submitForm() {
      this.$refs.medicalForm.validate(valid => {
        if (valid) {
          this.$message.success("提交成功！");
          localStorage.removeItem('medicalFormCache');
        }
      });
    },
    resetForm() {
      this.$refs.medicalForm.resetFields();
      localStorage.removeItem('medicalFormCache');
    }
  }
};
</script>

<style scoped>
.long-form-page {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px #e3e8ee;
  box-sizing: border-box;
  overflow: auto;
}

.medical-form {
  width: 700px;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
}

.modify-item {
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 11;
  background-color: #fff;
}
</style>