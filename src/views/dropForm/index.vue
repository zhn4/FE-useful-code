<template>
  <div class="drag-form-page">
    <div class="drag-container">
      <h3>可拖拽的表单组件</h3>
      <draggable v-model="availableFields" group="fields" class="drag-list" :sort="false">
        <div v-for="field in availableFields" :key="field.id" class="drag-item">
          {{ field.label }}
        </div>
      </draggable>
    </div>

    <div class="form-container">
      <h3>生成的表单</h3>
      <draggable v-model="formFields" group="fields" class="form-list">
        <div v-for="field in formFields" :key="field.id" class="form-item">
          <label :for="field.id">{{ field.label }}</label>
          <el-input v-if="field.type === 'text'" type="text" :id="field.id" :placeholder="field.placeholder" />
          <el-input v-if="field.type === 'textarea'" type="textarea" :id="field.id" :placeholder="field.placeholder"
            v-bind="field.extra" />
          <el-input v-if="field.type === 'number'" type="number" :id="field.id" :placeholder="field.placeholder" />
          <el-select v-if="field.type === 'select'" :id="field.id">
            <el-option v-for="option in field.options" :key="option" :value="option">{{ option }}</el-option>
          </el-select>
          <div v-if="field.type === 'checkbox'" class="checkbox-group">
            <label v-for="option in field.options" :key="option">
              <input type="checkbox" :id="field.id" :value="option" /> {{ option }}
            </label>
          </div>
          <div v-if="field.type === 'radio'" class="radio-group">
            <label v-for="option in field.options" :key="option">
              <input type="radio" :name="field.id" :value="option" /> {{ option }}
            </label>
            <!-- <template v-for="option in field.options">
              <el-radio :key="option" v-model="radio" :label="option">{{ option }}</el-radio>
            </template> -->
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DropForm",
  components: {
    draggable,
  },
  data() {
    return {
      availableFields: [
        {
          id: "field1", label: "文本框", type: "text", placeholder: "请输入文本",
        },
        {
          id: "field11", label: "多文本框", type: "textarea", placeholder: "请输入文本", extra: {
            rows: 4,
            minLength: 1,
            maxLength: 100,
          }
        },
        { id: "field2", label: "数字框", type: "number", placeholder: "请输入数字" },
        { id: "field3", label: "下拉框", type: "select", options: ["选项1", "选项2", "选项3"] },
        { id: "field4", label: "复选框", type: "checkbox", options: ["选项A", "选项B", "选项C"] },
        { id: "field5", label: "单选框", type: "radio", options: ["选项X", "选项Y", "选项Z"] },
      ],
      formFields: [],
    };
  },
};
</script>

<style scoped>
.drag-form-page {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.drag-container,
.form-container {
  width: 45%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
}

.drag-list,
.form-list {
  min-height: 200px;
  border: 1px dashed #ccc;
  padding: 10px;
  background-color: #fff;
}

.drag-item,
.form-item {
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #e6e6e6;
  cursor: grab;
}

.drag-item:hover,
.form-item:hover {
  background-color: #d9d9d9;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}
</style>