<template>
  <div class="custom-page">
    <div class="main">
      <div class="left">
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="title">
            <el-input
              type="textarea"
              placeholder="内容"
              v-model="form.title"
              maxlength="30"
              show-word-limit
              :rows="3"
              resize="none"
            />
          </el-form-item>
          <el-form-item prop="deadline">
            <el-date-picker
              v-model="form.deadline"
              type="datetime"
              placeholder="期限"
              :picker-options="{
                disabledDate(time) {
                  return time.getTime() < Date.now()
                },
              }"
              value-format="timestamp"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="onSubmit">添加</el-button>
          </el-form-item>
        </el-form>
        <div class="list">
          <draggable class="group normal-group" :list="list" group="people" @change="onLog">
            <template v-for="item in list">
              <CardItem :item="item" :key="item.id" />
            </template>
          </draggable>
        </div>
      </div>
      <div class="right">
        <draggable class="group" :list="notImportAndUrgentList" group="people" @change="onLog">
          <template v-for="item in notImportAndUrgentList">
            <CardItem :item="item" :key="item.id" class="not-import-urgent" />
          </template>
        </draggable>
        <draggable class="group" :list="importAndUrgentList" group="people" @change="onLog">
          <template v-for="item in importAndUrgentList">
            <CardItem :item="item" :key="item.id" class="import-urgent" />
          </template>
        </draggable>
        <draggable class="group" :list="notImportAndUnurgentList" group="people" @change="onLog">
          <template v-for="item in notImportAndUnurgentList">
            <CardItem :item="item" :key="item.id" class="not-import-unurgent" />
          </template>
        </draggable>
        <draggable class="group" :list="importAndUnurgentList" group="people" @change="onLog">
          <template v-for="item in importAndUnurgentList">
            <CardItem :item="item" :key="item.id" class="import-unurgent" />
          </template>
        </draggable>
      </div>
      <div class="extra">
        <el-popover placement="right" width="400" trigger="click">
          <div class="desc">
            <div class="content">
              <p>这是一个四象限时间管理工具，帮助你更好地管理任务。</p>
              <p>每个象限代表不同的任务类型：</p>
              <ul>
                <li>重要且紧急：需要立即处理的任务</li>
                <li>重要但不紧急：可以安排时间处理的任务</li>
                <li>不重要但紧急：可以委托他人处理的任务</li>
                <li>不重要且不紧急：可以忽略或删除的任务</li>
              </ul>
            </div>
          </div>
          <el-button slot="reference">说明</el-button>
        </el-popover>
        <el-button type="primary" @click="onLoad">加载</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import CardItem from './components/CardItem.vue'

export default {
  name: 'FxxxThing',
  components: {
    draggable,
    CardItem,
  },
  data() {
    return {
      form: {
        title: '',
        deadline: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'focus' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'focus' },
        ],
        deadline: [{ type: 'date', required: true, message: '请选择截止日期', trigger: 'change' }],
      },
      list: [],
      // 紧急+重要
      importAndUrgentList: [],
      // 不紧急+重要
      importAndUnurgentList: [],
      // 紧急+不重要
      notImportAndUrgentList: [],
      // 不紧急+不重要
      notImportAndUnurgentList: [],
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      this.initByDev()
    } else {
      this.onLoad()
    }
    // this.initByDev()
  },
  methods: {
    initByDev() {
      this.list = [
        { title: '好好学习,天天向上', deadline: 1752595200000, id: 1752562482094 },
        {
          title: '测试超时内容,看看效果如何,再看看超长内容展示效果如何，te',
          deadline: 1752225900000,
          id: 1752225900000,
        },
      ]
      this.importAndUrgentList = [{ title: '打咏春', deadline: 1752768000000, id: 1752768000000 }]
      this.importAndUnurgentList = [{ title: '睇电视', deadline: 1753372800000, id: 1753372800000 }]
      this.notImportAndUrgentList = [
        {
          title: '测试超时内容,看看效果如何,再看看超长内容展示效果如何，te',
          deadline: 1752143400000,
          id: 1752143400000,
        },
      ]
      this.notImportAndUnurgentList = [{ title: '倒垃圾', deadline: 1752137700000, id: 1752137700000 }]
    },
    onSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$message.success('Form submitted successfully!')
          // Handle form submission logic here
          this.list.push({ ...this.form, id: new Date().getTime() })
          this.$refs.formRef.resetFields()
        } else {
          this.$message.error('Please fill in the required fields.')
          return false
        }
      })
    },
    onLog(evt) {
      console.log('List changed:', evt)
    },
    onSave() {
      localStorage.setItem(
        'fxxxThingData',
        JSON.stringify({
          list: this.list,
          importAndUrgentList: this.importAndUrgentList,
          importAndUnurgentList: this.importAndUnurgentList,
          notImportAndUrgentList: this.notImportAndUrgentList,
          notImportAndUnurgentList: this.notImportAndUnurgentList,
        }),
      )
      this.$message.success('数据已保存！')
    },
    onLoad() {
      const data = localStorage.getItem('fxxxThingData')
      if (data) {
        const parsedData = JSON.parse(data)
        this.list = parsedData.list || []
        this.importAndUrgentList = parsedData.importAndUrgentList || []
        this.importAndUnurgentList = parsedData.importAndUnurgentList || []
        this.notImportAndUrgentList = parsedData.notImportAndUrgentList || []
        this.notImportAndUnurgentList = parsedData.notImportAndUnurgentList || []
        this.$message.success('数据已加载！')
      } else {
        this.$message.warning('没有找到保存的数据！')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  row-gap: 20px;
  column-gap: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .left {
    width: 320px;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: 20px;

    .list {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
    position: relative;

    &::before {
      content: '重要';
      display: block;
      width: 100%;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -10px;
      text-align: right;
      line-height: 20px;
      background: linear-gradient(to right, rgb(253, 226, 226), #f56c6c);
      color: #fff;
      padding-right: 10px;
      box-sizing: border-box;
      font-weight: bolder;
    }

    &::after {
      content: '紧急';
      display: block;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -10px;
      text-align: center;
      line-height: 20px;
      background: linear-gradient(to top, rgb(253, 226, 226), #f56c6c);
      color: #fff;
      padding-top: 10px;
      box-sizing: border-box;
      font-weight: bolder;
    }
  }

  .extra {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    & > * {
      margin-top: 10px;
    }
  }
}

.group {
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;

  .card {
    margin-bottom: 5px;
    cursor: move;
  }
}

.normal-group {
  background-color: transparent;
  border: transparent;
  position: relative;

  &::after {
    content: '暂无内容';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 20px;
    left: 0;
    text-align: center;
    z-index: -1;
  }
}

.import-urgent {
  border-left: 6px solid #f56c6c;
}

.import-unurgent {
  border-left: 6px solid #409eff;
}

.not-import-urgent {
  border-left: 6px solid #e6a23c;
}

.not-import-unurgent {
  border-left: 6px solid #909399;
}
</style>
