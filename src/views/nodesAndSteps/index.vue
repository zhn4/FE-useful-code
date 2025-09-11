<template>
  <div class="test-page">
    <!-- 流程节点导航栏 -->
    <div class="process-navigation">
      <div
        v-for="(node, index) in flowNodes"
        :key="node.id"
        :class="['node-item', { active: activeNodeId === node.id.toString() }]"
        @click="selectNode(node.id)"
      >
        <div class="node-index">{{ index + 1 }}</div>
        <div class="node-content">
          <div class="node-name">{{ node.name }}</div>
          <!-- <div class="node-progress">
            <div class="progress-bar" :style="{ width: getNodeProgress(node.id) + '%' }"></div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- 步骤展示区域 -->
    <div class="flow-steps">
      <div class="steps-header">
        <h2>{{ getCurrentNodeName() }}</h2>
        <div class="steps-count">{{ currentSteps.length }} 个步骤</div>
      </div>

      <div class="steps-container" v-if="currentSteps.length > 0">
        <div
          v-for="(step, index) in currentSteps"
          :key="step.id"
          class="step-card"
          :class="{ active: activeStep === step.id }"
          @click="selectStep(step.id)"
        >
          <div class="step-index">
            <div class="index-number">{{ index + 1 }}</div>
            <!-- <div class="step-status" :class="getStepStatus(step.id)"></div> -->
          </div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
            <div v-if="step.image" class="step-image">
              <img :src="step.image" :alt="step.title" />
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" v-else>
        <div class="empty-icon">📋</div>
        <p>请选择一个流程节点查看具体步骤</p>
      </div>
    </div>

    <!-- 使用 Element UI 的 Drawer 组件 -->
    <el-drawer
      :visible.sync="drawerVisible"
      direction="rtl"
      size="600px"
      :with-header="false"
      custom-class="step-detail-drawer"
    >
      <div class="panel-content" v-if="getCurrentStep()">
        <div class="panel-header">
          <h3>步骤详情</h3>
          <button class="close-btn" @click="closeDetailPanel">×</button>
        </div>
        <div class="panel-body">
          <h4>{{ getCurrentStep().title }}</h4>
          <p>{{ getCurrentStep().description }}</p>
          <div v-if="getCurrentStep().image" class="detail-image">
            <img :src="getCurrentStep().image" :alt="getCurrentStep().title" />
          </div>
          <div class="step-navigation">
            <button class="nav-btn prev-btn" :disabled="getPrevStepId() === null" @click="goToPrevStep">
              ← 上一步
            </button>
            <button class="nav-btn next-btn" :disabled="getNextStepId() === null" @click="goToNextStep">
              下一步 →
            </button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'FlowProcess',
  data() {
    return {
      // 当前激活的节点 ID
      activeNodeId: '1',

      // 当前激活的步骤
      activeStep: 0,

      // 抽屉可见性
      drawerVisible: false,

      // 已完成的步骤记录
      completedSteps: new Set(),

      // 流程节点数据
      flowNodes: [
        {
          id: 1,
          name: '需求分析',
        },
        {
          id: 2,
          name: '系统设计',
        },
        {
          id: 3,
          name: '开发实现',
        },
        {
          id: 4,
          name: '测试验证',
        },
        {
          id: 5,
          name: '部署上线',
        },
      ],

      // 各节点对应的具体步骤
      flowSteps: {
        1: [
          {
            id: 101,
            title: '收集用户需求',
            description: '与客户沟通，明确业务需求和功能要求，了解用户的实际使用场景和痛点。',
            image: '',
          },
          {
            id: 102,
            title: '需求评审',
            description: '组织相关人员对需求进行评审和确认，确保需求的完整性和可行性。',
            image: '',
          },
          {
            id: 103,
            title: '编写需求文档',
            description: '整理并编写详细的需求规格说明书，为后续开发提供明确指导。',
            image: '',
          },
        ],
        2: [
          {
            id: 201,
            title: '架构设计',
            description: '设计系统整体架构和技术选型，确定系统的可扩展性和稳定性方案。',
            image: '',
          },
          {
            id: 202,
            title: '数据库设计',
            description: '设计数据库表结构和关系，优化数据存储和查询性能。',
            image: '',
          },
          {
            id: 203,
            title: '接口设计',
            description: '定义系统各模块间的接口规范，确保模块间的良好协作。',
            image: '',
          },
        ],
        3: [
          {
            id: 301,
            title: '环境搭建',
            description: '搭建开发环境和配置相关工具，确保团队成员开发环境的一致性。',
            image: '',
          },
          {
            id: 302,
            title: '编码实现',
            description: '按照设计文档进行代码编写，遵循编码规范和最佳实践。',
            image: '',
          },
          {
            id: 303,
            title: '代码审查',
            description: '团队成员之间进行代码审查，提高代码质量和可维护性。',
            image: '',
          },
        ],
        4: [
          {
            id: 401,
            title: '单元测试',
            description: '对各个模块进行单元测试，确保每个功能模块的正确性。',
            image: '',
          },
          {
            id: 402,
            title: '集成测试',
            description: '测试各模块之间的集成效果，验证系统整体功能。',
            image: '',
          },
          {
            id: 403,
            title: '用户验收测试',
            description: '由最终用户进行验收测试，确保系统满足业务需求。',
            image: '',
          },
        ],
        5: [
          {
            id: 501,
            title: '部署准备',
            description: '准备部署环境和相关配置，制定详细的部署计划。',
            image: '',
          },
          {
            id: 502,
            title: '系统部署',
            description: '将系统部署到生产环境，确保部署过程的稳定性和安全性。',
            image: '',
          },
          {
            id: 503,
            title: '运行监控',
            description: '监控系统运行状态，及时处理异常，保障系统稳定运行。',
            image: '',
          },
        ],
      },
    }
  },

  computed: {
    // 当前节点的步骤
    currentSteps() {
      const nodeId = parseInt(this.activeNodeId)
      return this.flowSteps[nodeId] || []
    },
  },

  methods: {
    // 选择节点
    selectNode(nodeId) {
      this.activeNodeId = nodeId.toString()
      // 重置激活的步骤
      this.activeStep = 0
    },

    // 选择步骤
    selectStep(stepId) {
      this.activeStep = stepId
      this.drawerVisible = true
      // 标记为已完成
      this.completedSteps.add(stepId)
    },

    // 获取当前节点名称
    getCurrentNodeName() {
      const node = this.flowNodes.find(n => n.id.toString() === this.activeNodeId)
      return node ? node.name : ''
    },

    // 获取当前步骤
    getCurrentStep() {
      if (this.activeStep === 0) return null
      for (const steps of Object.values(this.flowSteps)) {
        const step = steps.find(s => s.id === this.activeStep)
        if (step) return step
      }
      return null
    },

    // 获取节点进度
    getNodeProgress(nodeId) {
      const steps = this.flowSteps[nodeId] || []
      if (steps.length === 0) return 0

      const completed = steps.filter(step => this.completedSteps.has(step.id)).length
      return (completed / steps.length) * 100
    },

    // 获取步骤状态
    getStepStatus(stepId) {
      if (this.activeStep === stepId) return 'active'
      if (this.completedSteps.has(stepId)) return 'completed'
      return 'pending'
    },

    // 关闭详情面板
    closeDetailPanel() {
      this.drawerVisible = false
      this.activeStep = 0
    },

    // 获取上一步ID
    getPrevStepId() {
      const steps = this.currentSteps
      const currentIndex = steps.findIndex(step => step.id === this.activeStep)
      if (currentIndex <= 0) return null
      return steps[currentIndex - 1].id
    },

    // 获取下一步ID
    getNextStepId() {
      const steps = this.currentSteps
      const currentIndex = steps.findIndex(step => step.id === this.activeStep)
      if (currentIndex === -1 || currentIndex >= steps.length - 1) return null
      return steps[currentIndex + 1].id
    },

    // 跳转到上一步
    goToPrevStep() {
      const prevId = this.getPrevStepId()
      if (prevId !== null) {
        this.activeStep = prevId
        this.completedSteps.add(prevId)
      }
    },

    // 跳转到下一步
    goToNextStep() {
      const nextId = this.getNextStepId()
      if (nextId !== null) {
        this.activeStep = nextId
        this.completedSteps.add(nextId)
      }
    },
  },

  mounted() {
    // 默认设置第一个节点为激活状态
    if (this.flowNodes.length > 0) {
      this.activeNodeId = this.flowNodes[0].id.toString()
    }
  },
}
</script>

<style lang="less" scoped>
.test-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
}

/* 流程节点导航栏 */
.process-navigation {
  display: flex;
  background: #409eff;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
}

.node-item {
  display: flex;
  align-items: center;
  min-width: 180px;
  padding: 12px 15px;
  margin-right: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &.active {
    background: #ffffff;
    color: #409eff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}

.node-index {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
  color: white;
  font-size: 12px;

  .node-item.active & {
    background: #ecf5ff;
    color: #409eff;
  }
}

.node-content {
  flex: 1;
}

.node-name {
  color: white;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 14px;

  .node-item.active & {
    color: #409eff;
  }
}

.node-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;

  .node-item.active & {
    background: #d9ecff;
  }
}

.progress-bar {
  height: 100%;
  background: #67c23a;
  transition: width 0.3s ease;
}

/* 步骤展示区域 */
.flow-steps {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.steps-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;

  h2 {
    margin: 0;
    color: #303133;
    font-weight: 500;
  }

  .steps-count {
    background: #ecf5ff;
    color: #409eff;
    padding: 5px 12px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
  }
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.step-card {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: 1px solid #ebeef5;
  display: flex;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    border-color: #c6e2ff;
  }

  &.active {
    border-color: #409eff;
    box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.3);
  }
}

.step-index {
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.index-number {
  width: 32px;
  height: 32px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}

.step-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.pending {
    background: #c0c4cc;
  }

  &.active {
    background: #409eff;
    box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.3);
  }

  &.completed {
    background: #67c23a;
  }
}

.step-content {
  flex: 1;
}

.step-title {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 16px;
  font-weight: 500;
}

.step-description {
  margin: 0 0 15px 0;
  color: #606266;
  line-height: 1.5;
  font-size: 14px;
}

.step-image {
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    border: 1px solid #ebeef5;
  }
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    margin: 0;
  }
}

/* 抽屉内容样式 */
.panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ebeef5;

  h3 {
    margin: 0;
    color: #303133;
    font-size: 18px;
    font-weight: 500;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #909399;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      background: #f5f7fa;
      color: #303133;
    }
  }
}

.panel-body {
  flex: 1;
  padding: 20px;
  overflow: auto;

  h4 {
    margin: 0 0 15px 0;
    color: #303133;
    font-size: 16px;
    font-weight: 500;
  }

  p {
    color: #606266;
    line-height: 1.6;
    margin-bottom: 20px;
  }
}

.detail-image {
  text-align: center;
  margin: 20px 0;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    border: 1px solid #ebeef5;
  }
}

.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.nav-btn {
  padding: 9px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  background: white;
  color: #606266;
  font-size: 14px;

  &.prev-btn:hover:not(:disabled) {
    color: #409eff;
    border-color: #409eff;
    background: #ecf5ff;
  }

  &.next-btn {
    background: #409eff;
    border-color: #409eff;
    color: white;

    &:hover:not(:disabled) {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Element UI Drawer 自定义样式 */
.step-detail-drawer {
  .el-drawer__body {
    padding: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .process-navigation {
    padding: 10px;
  }

  .node-item {
    min-width: 150px;
    padding: 10px 12px;
    margin-right: 8px;
  }

  .node-name {
    font-size: 13px;
  }

  .steps-container {
    grid-template-columns: 1fr;
  }

  .steps-header {
    flex-direction: column;
    align-items: flex-start;

    .steps-count {
      margin-top: 10px;
    }
  }
}

@media (max-width: 480px) {
  .flow-steps {
    padding: 15px;
  }

  .step-card {
    padding: 15px;
  }

  .step-title {
    font-size: 15px;
  }
}
</style>
