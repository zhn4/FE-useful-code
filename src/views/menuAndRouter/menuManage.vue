<template>
  <div class="menu-manage-page">
    <div class="left-tree">
      <el-button type="primary" size="mini" @click="addRootMenu" style="margin-bottom: 12px">新增根菜单</el-button>
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        highlight-current
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :key="treeKey"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <img v-if="data.customIcon" :src="data.customIcon" style="width: 16px; height: 16px" />
            <i v-else :class="data.icon"></i>
            {{ data.label }}
          </span>
          <span style="float: right">
            <el-button type="text" size="mini" @click.stop="addChildMenu(data)">新增</el-button>
            <el-button type="text" size="mini" style="color: #f56c6c" @click.stop="deleteMenu(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="right-form">
      <el-form v-if="form" :model="form" label-width="100px" class="edit-form" :rules="rules" ref="formRef">
        <el-form-item label="菜单名称" prop="label">
          <el-input v-model="form.label" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" />
        </el-form-item>
        <el-form-item label="自定义图标" prop="customIcon">
          <el-upload
            class="icon-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeIconUpload"
            :on-change="handleIconChange"
            accept=".jpg,.jpeg,.png"
            :limit="1"
          >
            <img v-if="form.customIcon" :src="form.customIcon" class="icon-preview" />
            <i v-else class="el-icon-plus icon-upload-placeholder"></i>
            <span style="font-style: italic; font-size: 12px">优先使用自定义图标</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="1" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div v-else class="empty-tip">请选择左侧菜单进行编辑</div>
    </div>
  </div>
</template>

<script>
let idSeed = 1000
export default {
  name: 'MenuManage',
  data() {
    return {
      treeData: [
        {
          id: 10,
          label: '工作台',
          path: '/system',
          icon: 'el-icon-setting',
          customIcon: '',
          order: 10,
          remark: '',
          children: [
            {
              id: 101,
              label: '用户管理',
              path: '/system/user',
              icon: 'el-icon-s-user',
              customIcon:
                'data:image/png;base64,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',
              order: 101,
              remark: '',
              parentId: 10,
              children: [
                {
                  id: 1001,
                  label: '分类1',
                  path: '/class1',
                  icon: 'el-icon-setting',
                  customIcon: '',
                  order: 1001,
                  remark: '',
                  parentId: 101,
                  children: [
                    {
                      id: 10001,
                      label: '分类1-小类1',
                      path: '/class1',
                      icon: 'el-icon-setting',
                      customIcon: '',
                      order: 1001,
                      remark: '',
                      parentId: 101,
                    },
                  ],
                },
                {
                  id: 1002,
                  label: '分类2',
                  path: '/class2',
                  icon: 'el-icon-setting',
                  customIcon: '',
                  order: 1002,
                  remark: '',
                  parentId: 102,
                  children: [
                    {
                      id: 10002,
                      label: '分类1-小类1',
                      path: '/class1',
                      icon: 'el-icon-setting',
                      customIcon: '',
                      order: 1002,
                      remark: '',
                      parentId: 102,
                    },
                  ],
                },
              ],
            },
            {
              id: 102,
              label: '角色管理',
              path: '/system/role',
              icon: 'el-icon-s-custom',
              customIcon: '',
              order: 102,
              remark: '',
              parentId: 10,
            },
            {
              id: 103,
              label: '系统设置',
              path: '/system/settings',
              icon: 'el-icon-setting',
              customIcon: '',
              order: 103,
              remark: '',
              parentId: 10,
            },
          ],
        },
        {
          id: 20,
          label: '功能1',
          path: '/menu',
          icon: 'el-icon-menu',
          customIcon: '',
          order: 20,
          remark: '',
          children: [
            {
              id: 201,
              label: '功能1-1',
              path: '/menu/board',
              icon: 'el-icon-data-board',
              customIcon: '',
              order: 201,
              remark: '',
              parentId: 20,
            },
            {
              id: 202,
              label: '功能1-2',
              path: '/menu/warning',
              icon: 'el-icon-warning',
              customIcon: '',
              order: 202,
              remark: '',
              parentId: 20,
            },
          ],
        },
        {
          id: 30,
          label: '功能2',
          path: '/digital-review',
          icon: 'el-icon-search',
          customIcon: '',
          order: 30,
          remark: '',
          children: [
            {
              id: 301,
              label: '功能2-1',
              path: '/digital-review/task',
              icon: 'el-icon-document',
              customIcon: '',
              order: 301,
              remark: '',
              parentId: 30,
            },
            {
              id: 302,
              label: '功能2-2',
              path: '/digital-review/record',
              icon: 'el-icon-notebook-2',
              customIcon: '',
              order: 302,
              remark: '',
              parentId: 30,
            },
          ],
        },
        {
          id: 40,
          label: '功能3',
          path: '/digital-comprehensive',
          icon: 'el-icon-data-analysis',
          customIcon: '',
          order: 40,
          remark: '',
          children: [
            {
              id: 401,
              label: '功能3-1',
              path: '/digital-comprehensive/report',
              icon: 'el-icon-s-data',
              customIcon: '',
              order: 401,
              remark: '',
              parentId: 40,
            },
            {
              id: 402,
              label: '功能3-2',
              path: '/digital-comprehensive/statistics',
              icon: 'el-icon-pie-chart',
              customIcon: '',
              order: 402,
              remark: '',
              parentId: 40,
            },
          ],
        },
        {
          id: 50,
          label: '功能4',
          path: '/data-resource',
          icon: 'el-icon-folder',
          customIcon: '',
          order: 50,
          remark: '',
          children: [
            {
              id: 501,
              label: '功能4-1',
              path: '/data-resource/catalog',
              icon: 'el-icon-menu',
              customIcon: '',
              order: 501,
              remark: '',
              parentId: 50,
            },
            {
              id: 502,
              label: '功能4-2',
              path: '/data-resource/apply',
              icon: 'el-icon-edit',
              customIcon: '',
              order: 502,
              remark: '',
              parentId: 50,
            },
            {
              id: 503,
              label: '功能4-3',
              path: '/data-resource/approve',
              icon: 'el-icon-s-check',
              customIcon: '',
              order: 503,
              remark: '',
              parentId: 50,
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      form: null,
      rules: {
        label: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur',
          },
        ],
        path: [
          {
            required: true,
            message: '路径不能为空',
            trigger: 'blur',
          },
        ],
      },
      currentNode: null,
      treeKey: 0, // 新增：用于强制刷新 el-tree
    }
  },
  methods: {
    handleNodeClick(data, node) {
      this.form = JSON.parse(JSON.stringify(data))
      this.currentNode = node
    },
    saveForm() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return
        // TODO: 这里可以添加保存逻辑，比如发送到后端
        Object.assign(this.currentNode.data, this.form)
        localStorage.setItem('menuData', JSON.stringify(this.treeData))
        this.treeKey++ // 新增：强制刷新 el-tree
        this.$message.success('保存成功')
      })
    },
    resetForm() {
      if (this.currentNode) {
        this.form = JSON.parse(JSON.stringify(this.currentNode.data))
      }
    },
    addRootMenu() {
      const newId = this.getNextRootId()
      const newMenu = {
        id: newId,
        label: '新菜单',
        path: '',
        icon: '',
        // 排序也沿用这个 id
        order: newId,
        remark: '',
        children: [],
      }
      this.treeData.push(newMenu)
      this.treeKey++
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(newMenu.id)
        this.handleNodeClick(newMenu, this.$refs.tree.getNode(newMenu))
      })
    },
    addChildMenu(parent) {
      // 判断 parent 层级
      let newId
      if (!parent.children) this.$set(parent, 'children', [])
      if (!this.getParentNode(parent)) {
        // 第一层，添加子菜单
        newId = this.getNextChildId(parent)
      } else {
        // 第二层，添加孙菜单
        newId = this.getNextGrandChildId(parent)
      }
      const newMenu = {
        id: newId,
        label: !this.getParentNode(parent) ? '新子菜单' : '新孙菜单',
        path: '',
        icon: '',
        // 排序也沿用这个 id
        order: newId,
        remark: '',
        children: [],
      }
      parent.children.push(newMenu)
      this.treeKey++
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(newMenu.id)
        this.handleNodeClick(newMenu, this.$refs.tree.getNode(newMenu))
      })
    },
    deleteMenu(node, data) {
      this.$confirm('确定要删除该菜单吗？', '提示', {
        type: 'warning',
      })
        .then(() => {
          const parent = node.parent
          const children = parent.data.children || this.treeData
          const index = children.findIndex(item => item.id === data.id)
          if (index !== -1) {
            children.splice(index, 1)
            this.form = null
            this.currentNode = null
            this.treeKey++ // 新增：强制刷新 el-tree
            this.$message.success('删除成功')
          }
        })
        .catch(() => {})
    },
    beforeIconUpload(file) {
      const isImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      if (!isImage) {
        this.$message.error('仅支持 jpg/jpeg/png 格式图片')
      }
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 1MB')
      }
      return isImage && isLt1M
    },
    handleIconChange(file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.form.customIcon = e.target.result
      }
      reader.readAsDataURL(file.raw)
    },
    getNextRootId() {
      // 根菜单 id: 10, 20, 30, ...
      const ids = this.treeData.map(item => item.id)
      let max = ids.length ? Math.max(...ids) : 0
      return max ? max + 10 : 10
    },
    getNextChildId(parent) {
      // 子菜单 id: 101, 102, 201, 202, ...
      const base = parent.id
      const children = parent.children || []
      const ids = children.map(item => item.id)
      let max = ids.length ? Math.max(...ids) : base * 10
      if (max < base * 10) max = base * 10
      return max + 1
    },
    getNextGrandChildId(parent) {
      // 孙菜单 id: 1001, 1002, 1101, ...
      const base = parent.id
      const children = parent.children || []
      const ids = children.map(item => item.id)
      let max = ids.length ? Math.max(...ids) : base * 10
      if (max < base * 10) max = base * 10
      return max + 1
    },
    // 获取父节点，判断层级
    getParentNode(node) {
      // node: 数据对象
      // 遍历 treeData 查找 node 的父节点
      let parent = null
      function findParent(list, target) {
        for (const item of list) {
          if (item.children && item.children.some(child => child.id === target.id)) {
            parent = item
            return
          }
          if (item.children) findParent(item.children, target)
        }
      }
      findParent(this.treeData, node)
      return parent
    },
  },
}
</script>

<style scoped>
.menu-manage-page {
  display: flex;
  height: 100%;
  background: #f8faff;
}

.left-tree {
  width: 320px;
  background: #fff;
  border-right: 1px solid #e3e8ee;
  box-sizing: border-box;
}

.right-form {
  flex: 1;
  padding: 40px 48px;
  background: #fff;
  min-width: 320px;
}

.edit-form {
  max-width: 400px;
}

.empty-tip {
  color: #888;
  font-size: 16px;
  margin-top: 80px;
}

.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.icon-uploader {
  display: inline-block;
}

.icon-preview {
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 6px;
  border: 1px solid #eee;
  object-fit: contain;
}

.icon-upload-placeholder {
  font-size: 32px;
  color: #bbb;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
