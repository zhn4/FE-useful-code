<template>
  <div>
    <div class="custom-header">
      <div class="left">权责清单修订 - 意见采纳</div>
      <div class="right">
        <el-button type="primary">保存</el-button>
        <el-button>一键下载</el-button>
        <el-button>提交</el-button>
        <el-button>查看流程</el-button>
        <el-button>返回</el-button>
      </div>
    </div>
    <div class="custom-comment">
      <div class="comment">
        <div class="top">
          <div class="tips">
            <div>
              <span class="point" style="background-color: #409EFF;"></span>
              <span>新增</span>
            </div>
            <div>
              <span class="point" style="background-color: #F56C6C;"></span>
              <span>删除</span>
            </div>
            <div>
              <span class="point" style="background-color: #E6A23C;"></span>
              <span>调整</span>
            </div>
          </div>
          <div class="title">
            广西电网责任有限公司治理主体权责清单（2022年版）修订
          </div>
          <div class="btns">
            <div>
              <el-checkbox v-model="isShowComment" label="只显示修订内容" border></el-checkbox>
              <el-checkbox v-model="isShowDepartment" label="显示未处理部门" border></el-checkbox>
            </div>
            <div>
              <el-button type="text">上移</el-button>
              <el-button type="text">下移</el-button>
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-table :data="tableData" style="width: 100%; height: 300px">
            <tableHeaderRender v-for="item in tableHead" :item="item" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableHeaderRender from '@/components/tableHeaderRender.vue';

export default {
  name: 'handle',
  components: {
    tableHeaderRender,
  },
  data() {
    return {
      isShowComment: false,
      isShowDepartment: false,
      tableHead: [
        {
          id: '1',
          parentId: null, // 表头的上级关系，顶级为 null
          label: '序号', // 表头名
          prop: 'index', // 表头属性
          type: 'text', // 表头数据类型 number、text、textarea、select
          isReqired: true, // 是否必填数据
          children: [], // 包含的子选项，表头的嵌套
        },
        { label: '状态', prop: 'status' },
        { label: '业务领域', prop: 'params1' },
        { label: '一级业务', prop: 'params2' },
        { label: '具体权责事项', prop: 'params3' },
        { label: '是否属于三重一大事项', prop: 'params4' },
        { label: '三重一大编号', prop: 'params5' },
        { label: '是否需经法律审核', prop: 'params6' },
        {
          id: '123456',
          label: '行权主体及方式',
          prop: 'params7',
          parentId: null,
          children: [
            {
              id: '666',
              parentId: '123456', // 表头的上级关系
              label: '经理层',
              prop: 'params7_1',
              type: 'text', // 表头数据类型 number、text、textarea、select
              isReqired: true, // 是否必填数据
            },
            { label: '党委', prop: 'params7_2' },
            {
              label: '董事会',
              prop: 'params7_3',
              children: [
                { label: '授权总经理（总经理办公会）', prop: 'params7_3_1' },
                { label: '授权董事长（董事长专题会）', prop: 'params7_3_2' },
                { label: '咨询程序（董事会专门委会）', prop: 'params7_3_3' },
                { label: '董事会', prop: 'params7_3_4' },
              ],
            },
            { label: '监事会', prop: 'params7_4' },
            { label: '股东（会）', prop: 'params7_5' },
            { label: '民主程序（职工代表大会/职工大会）', prop: 'params7_6' },
          ],
        },
        {
          label: '对分子公司的行权路径',
          prop: 'params8',
          children: [
            { label: '依托股东权利管控事项', prop: 'params8_1' },
            { label: '依托外部董事管控事项', prop: 'params8_2' },
            { label: '依托本部职能管控事项', prop: 'params8_3' },
          ],
        },
        {
          label: '适用方式',
          prop: 'params9',
        },
        {
          label: '承办部门',
          prop: 'params10',
        },
        {
          label: '外部法律依据',
          prop: 'params11',
        },
        {
          label: '内部章程制度',
          prop: 'params12',
        },
        {
          label: '衔接上级权责清单',
          prop: 'params13',
        },
        {
          label: '备注',
          prop: 'params14',
        },
        {
          label: '修编情况说明',
          prop: 'params15',
        },
      ],
      tableData: [
        {
          index: 1,
          status: 'status',
          params1: 'params1 1518 弄',
          params2: 'params2',
          params3: 'params3',
          params4: 'params4',
          params5: 'params5',
          params6: 'params6',
          params7: 'params7',
          params7_1: 'params7_1',
          params7_2: 'params7_2',
          params7_3: 'params7_3',
          params7_3_1: 'params7_3_1',
          params7_3_2: 'params7_3_2',
          params7_3_3: 'params7_3_3',
          params7_3_4: 'params7_3_4',
          params7_4: 'params7_4',
          params7_5: 'params7_5',
          params7_6: 'params7_6',
          params7_7: 'params7_7',
          params8: 'params8',
          params8_1: 'params8_1',
          params8_2: 'params8_2',
          params8_3: 'params8_3',
          params9: 'params9',
          params10: 'params10',
          params11: 'params11',
          params12: 'params12',
          params13: 'params13',
          params14: 'params14',
          params15: 'params15',
          city: 'xx市区',
          contryside: '嘻嘻嘻村',
          number: 123,
        },
      ],
    }
  }
}
</script>

<style lang="less" scoped>
.custom-comment {
  padding: 20px;
  background-color: #EAF0F8;

  .tips {
    display: flex;

    &>div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 14px;
    }
  }

  .point {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50px;
    margin-right: 6px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(215, 215, 215);
    margin-bottom: 20px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .btns {
    display: flex;
  }
}

.comment {
  background-color: #fff;
  padding: 10px;
}
</style>