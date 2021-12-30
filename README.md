## application-theme 主题样式组件

### 开发指南
#### 安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```javascript
npm install -S application-theme
```

#### 快速上手
**引入 Application-theme**

完整引入
在 main.js 中写入以下内容：
```javascript
import Vue from 'vue';
import ApplicationTheme from 'application-theme';
import 'application-theme/theme/index.css';
import App from './App.vue';

Vue.use(ApplicationTheme);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
#### 使用 Element-UI 版本
element-ui 版本需要安装 V2.15.0 版本以上， 建议安装 V2.15.6 版本

### 定制样式组件结构
```javascript
— theme                          主题样式定制文件夹
 — components                    单独定制组件
   _ BaseSetting.vue             基本设置页面模型
   — Content.vue                 内容盒模型
   — DefaultEmpty.vue            默认表格空状态组件
   — Divider.vue                 表格操作按钮分隔组件
   — FormItem.vue                Model 态框表单结构
   — Pagination.vue              分页组件
   — Search.vue                  搜索单盒模型组件
   _ SearchController.vue        搜索展开控制器组件
   — Selection.vue               多选框表格 alert 组件
   — TableTool.vue               表格操作工具组件
 — element
   — fonts                       element icon
   — element.scss                全局定制样式
   — index.css                   element 默认定制主题样式
 — index.css                     样式主入口
```

### 布局组件样式定制方法
#### 注意事项

| 序号   | 注意事项  |
| ------------ | ------------ |
| 1 | 所有表单 &lt;el-form&gt; 统一加上 status-icon 属性，校验表单所显示对应状态  |
| 2 | &lt;el-form&gt; 与 &lt;el-col&gt; 配合使用务必 组项之间务必使用 &lt;el-form-item&gt; 搭配使用，否则容易产生组项之间存在行高差 |
| 3  | &lt;el-form&gt; 未设置 inline 属性时右外边距为 0。若设置了 inline 属性右边默认 element 右外边距  |
| 4 | &lt;el-pagination&gt; 组件 layout 属性 设置 "total, prev, pager, next" 四个值。page-sizes 属性 统一设置 [10,20,30,40] 值 |


#### 搜索盒模型组件样式
| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 将原 &lt;el-form&gt; 在内的标签 dom 元素包括在 &lt;Search&gt; 组件中  |
| 2 | 在原先 &lt;el-form&gt; 子标签中添加 &lt;el-row&gt; 作为唯一子节点 |
| 3  | 以 &lt;el-row&gt; 搭配 &lt;el-col :span="8"&gt; 使用将盒模型以 8 为比例切割，并且将原先 &lt;el-form-item&gt; 在内所有元素包括在 &lt;el-col&gt; 中  |
| 4 | 如果搜索表单选项超过 3 项，需搭配 &lt;SearchController&gt; 搜索展开控制器组件使用。|

**参考代码**
```javascript
<Search>
	<el-form>
		<el-col :span="8">
          <el-form-item label="手机号码:">
            <el-input
              placeholder="请输入手机号码"
              v-model="mobile"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手环id:">
            <el-input
              placeholder="请输入手环id"
              v-model="braceletId"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备识别号:">
            <el-input
              placeholder="请输入设备识别号"
              v-model="deviceCode"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <SearchController>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
        </SearchController>
	</el-form>
</Search>
```


#### 表格列表组件样式

| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 将原先 &lt;el-tabel&gt; 标签所在的所有元素包裹在 &lt;Content&gt; 组件中  |
| 2 | &lt;Content&gt; 组件添加 start-min-height 属性既可开启最小高度模式 |
| 3  | 将需要操作表格外的按钮标签 &lt;el-button&gt; 包裹在 &lt;Tabel-Tool&gt; 组件中，例如：新增某表格选项  |
| 4 | 在 &lt;/el-tabel&gt; 闭合标签前新增 &lt;DefaultEmpty slot="empty"/&gt; 默认空状态组件 |
| 5 | 在 &lt;el-tabel&gt; 相邻兄弟元素中添加 &lt;Pagination&gt; 组件并且将 &lt;el-pagination&gt; 组件包裹其中 |
| 6 | 在 &lt;el-pagination slot-scope="data" :page-sizes="data.sizes" :layout="data.layout"&gt; 中添加以上三个属性值 |

**参考代码**
```javascript
<Content>
	<TableTool @refresh="刷新表格数据方法"></TableTool>
	<el-table :data="tableData" v-loading="loading">
		<el-table-column prop="mobile" label="手机号"></el-table-column>
		<el-table-column prop="nickName" label="昵称"></el-table-column>
         <DefaultEmpty slot="empty"/>
	</el-table>
	<Pagination>
          <el-pagination
            slot-scope="data"
            :page-sizes="data.sizes"
            :layout="data.layout"
            @size-change="分页条数切换方法"
          ></el-pagination>
	</Pagination>
</Content>
```

#### Model态框表单组件样式

| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 在迁移组件样式时 将原来 &lt;el-form-item&gt; 改成 &lt;Form-Item&gt; 即可  |
| 2 | 注意：需要在 &lt;el-form&gt; 添加属性 label-width 值为 '140px', 统一label项宽度样式 |

**参考代码**

```javascript
<el-form status-icon label-width="140px">
	<Form-Item label="业务员等级：" prop="promoLevel">
		<el-input
		v-model="ruleForm.promoLevel"
		placeholder="请输入业务员等级"
		:disabled="falg"
		></el-input>
	</Form-Item>
	<FormItem label="业务员达成条件：" prop="promoShops">
		<el-input
		v-model="ruleForm.promoShops"
		placeholder="请输入业务员达成条件"
		></el-input>
	</FormItem>
</el-form>
```

#### 基本设置模型

| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 在 &lt;BaseSetting&gt; 标签添加对应设置标题属性 title  |
| 2 | 在原来 &lt;el-form&gt; 表单基础上添加属性 label-position 值为 'top'，并且包裹在 &lt;BaseSetting&gt; 组件中 |

**参考代码**
```javasctipt
<BaseSetting title="弹窗广告设置">
	<el-form label-position="top">
		<el-form-item label="详情id">
			<el-input
			placeholder="请输入详情id"
			v-model="ruleForm.id"
			:maxlength="19"
			></el-input>
		</el-form-item>
		<el-form-item label="模型类型">
			<el-select v-model="ruleForm.contentModel">
				<el-option label="文本" value="0"></el-option>
				<el-option label="图片跳转" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-button type="primary" @click="confrimSettled">保 存</el-button>
	</el-form>
</BaseSetting>
```

#### 搜索展开控制器组件

| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 将搜索相关按钮元素包裹在 &lt;SearchController&gt; 组件插槽中  |

**参考代码**
```javascript
<SearchController>
	<el-button type="primary" @click="search">查询</el-button>
	<el-button type="primary" @click="reset">重置</el-button>
</SearchController>
```

#### 表格多选框 alert 提示

| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 将 &lt;el-table&gt; 表格组件包裹在 &lt;Selection :number="number" @clearEmpty="clearEmpty"&gt; 中  |
| 2 | 并且包含属性 number 代表表格数据 length |
| 3 | 自定义事件 clearEmpty 代表清空表格事件 |

**参考代码**
```javascript
<Selection :number="multipleSelection.length" @clearEmpty="清空多选项方法" />
```

#### 表格操作项按钮间 Divider 分隔线组件

| 序号   | 迁移方案  |
| ------------ | ------------ |
| 1 | 迁移过程中将所有操作选项 &lt;el-button&gt; 组件包裹在 &lt;Divider&gt; 组件中 |

**参考代码**

```javascript
<Divider>
	// 保持 <Divider> 组件包裹子元素的平级关系，子元素中不能包含其他子元素
	<el-button @click="edit">编辑</el-button> 
	<el-button @clcik="del">删除</el-button>
</Divider>
```
