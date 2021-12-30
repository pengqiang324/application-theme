<template>
  <Content>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <Divider>
          <el-button
              type="text"
              @click="send(scope.row)"
              >发送</el-button
            >
            <!-- has('noticeModify') -->
            <el-button
              type="text"
              @click="editor(scope.row)"
              >编辑</el-button
            >
            <!-- has('noticeRemove') -->
            <el-button
              type="text"
              @click="remove(scope.row)"
              >删除</el-button
            >
            </Divider>
        </template>
      </el-table-column>
    </el-table>
    <Pagination>
        <el-pagination
        ></el-pagination>
      </Pagination>
  </Content>
</template>

<script>
export default {
  name: 'HelloWorld',

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  methods: {
    send() {
      console.log('发送了')
    },

    editor() {
      console.log('编辑了')
    },

    remove() {
      console.log('移除了')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
