<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: MyStery
 * @Date: 2023-01-08 16:28:58
 * @LastEditors: MyStery
 * @LastEditTime: 2023-01-09 23:10:47
-->
<script setup>
import { pageList } from "./setting";
import HelloWorld from "./components/HelloWorld.vue";
// import tTreeSelect from "packages/treeSelect/src/index.vue";
import wowTable from "packages/table/src/index.vue";
// import tTreeSelect from "../dist/tTreeSelect.es.js";
import { useTable } from "wow-cis-js";
import { useWowForm } from "./libs/useWowForm";
import wowDesign from "../dist/wowDesign.es.js";
import "../dist/style.css";
const { wowButton, tTreeSelect, wowForm } = wowDesign;

const fieldNames = {
  children: "children",
  label: "name",
  key: "id",
  value: "id",
};
const table = ref(null);
const tableHeight = ref(0);
// const tableHeight = computed(() => {
//   const fullHeight = window.innerHeight;
//   return fullHeight - table.value.offsetTop - 60;
// });
const init = () => {
  const fullHeight = window.innerHeight;
  tableHeight.value = fullHeight - table.value.offsetTop - 60;
};
onMounted(() => {
  init();
  window.onresize = () => {
    const fullHeight = window.innerHeight;
    tableHeight.value = fullHeight - table.value.offsetTop - 60;
  };
});

// 测试数据
const departTree = [
  {
    id: 1,
    name: "根部门",
    departNumber: 6,
    children: [
      {
        id: 11,
        pid: 1,
        name: "一级部门1",
        departNumber: 2,
        children: [
          { id: 111, pid: 11, name: "二级部门1", departNumber: 0 },
          { id: 112, pid: 11, name: "二级部门2", departNumber: 0 },
        ],
      },
      { id: 21, pid: 1, name: "一级部门2", departNumber: 0 },
      { id: 31, pid: 1, name: "一级部门3", departNumber: 0 },
      { id: 41, pid: 1, name: "一级部门4", departNumber: 0 },
      { id: 51, pid: 1, name: "一级部门5", departNumber: 0 },
      {
        id: 61,
        pid: 1,
        name: "一级部门6",
        departNumber: 2,
        children: [
          { id: 611, pid: 61, name: "二级部门3", departNumber: 0 },
          { id: 612, pid: 61, name: "二级部门4", departNumber: 0 },
        ],
      },
    ],
  },
];

const departId = 11;
const buttonName = "我是个按钮";
const transformAssistance = (data) => {
  if (unref(data).lenght !== 0) {
    let newData = unref(data).map((item) => {
      item.medicalAssistance = item.hurtDoctFlag === "0" ? "否" : "是";
      return item;
    });
    return newData;
  }
};
const { dataSource, pageInfo, sortCallback, getTableList, selectCallback } =
  useTable("123", false, transformAssistance);
const columns = reactive([
  {
    title: "序号",
    key: "index",
    dataIndex: "index",
    align: "center",
    // customRender: (text, record, index) => `${index + 1}`,
    width: 80,
  },
  {
    title: "床号",
    key: "bedNum",
    dataIndex: "bedNum",
    align: "center",
    width: "10%",
  },
  {
    title: "姓名",
    key: "inpatientName",
    dataIndex: "inpatientName",
    width: "10%",
  },
  {
    title: "医疗救助",
    key: "medicalAssistance",
    dataIndex: "medicalAssistance",
    align: "center",
    width: 100,
  },
  {
    title: "性别",
    key: "gender",
    dataIndex: "gender",
    align: "center",
    minWidth: 100,
  },
  {
    title: "年龄",
    key: "dage",
    dataIndex: "dage",
    align: "center",
    width: "100px",
  },
  {
    title: "病历号",
    key: "patientNum",
    align: "center",
    dataIndex: "patientNum",
    width: "100px",
  },
  {
    title: "入院时间",
    key: "entryTime",
    dataIndex: "entryTime",
    align: "center",
    width: 207,
    minWidth: 207,
  },
  {
    title: "入院诊断",
    key: "mainDiagnose",
    dataIndex: "mainDiagnose",
    width: 150,
  },
  {
    title: "科室",
    key: "departmentName",
    dataIndex: "departmentName",
    ellipsis: true,
    align: "center",
    width: 120,
    minWidth: 120,
  },
  {
    title: "病区",
    key: "wardName",
    dataIndex: "wardName",
    ellipsis: true,
    width: 100,
    minWidth: 100,
  },
  {
    title: "主治医生",
    key: "physicianName",
    dataIndex: "physicianName",
    width: 100,
    align: "center",
  },
  {
    title: "费别",
    key: "insurance",
    dataIndex: "insurance",
    align: "center",
    // width: '12%'
  },
  {
    title: "性质",
    key: "patinatureName",
    dataIndex: "patinatureName",
    align: "center",
    // width: '12%'
  },
  {
    title: "报告",
    // isSlot: true,
    key: "action",
    dataIndex: "action",
    align: "center",
    width: 200,
  },
]);
const options = reactive({
  bordered: true,
  rowKey: (record) => record.id,
  columns,
  dataSource,
});

// form

const { formComponents, formSearchComponents, formTableComponents } =
  pageList();
// 搜索类型表格
const {
  customFormProps: searchFormProps,
  searchForm,
  modelRef,
} = useWowForm({
  formComponents: formSearchComponents,
  type: "search",
  formProps: {
    layout: "inline",
  },
});
const search = () => {
  searchForm
    .validate()
    .then(() => {
      console.log(toRaw(modelRef));
      searchFormProps.key = Math.random();
    })
    .catch((err) => {
      console.log("error", err);
    });
};
// 监听表单值改变
watchEffect((onInvalidate) => {
  const { taskInfo, num, type, dateRange } = modelRef;
  console.log(`${modelRef} 的值变化了！`, modelRef);
  onInvalidate(() => {
    console.log("清除副作用函数执行了！");
  });
});
// 栅格形式表格
const { customFormProps: rowFormProps } = useWowForm({
  formComponents: formComponents,
  type: "row",
  formProps: {
    // class: 'formTableStyle',
    // layout: 'inline',
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  },
});

// 表格形式表单
const {
  customFormProps: tableFormProps,
  searchForm: tableForm,
  resetFields: tableFormResetFields,
  submitFields: tableFormSubmitFields,
} = useWowForm({
  formComponents: formTableComponents,
  type: "table",
  formProps: {
    class: "formTableStyle",
    // layout: 'inline',
    // labelCol: { span: 4 },
    // wrapperCol: { span: 14 }
    // customLabelWidth: '150px'
  },
});
const submitForm = (fields) => {
  console.log(fields);
};
</script>

<template>
  <div>
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
    <div style="height: 100px"></div>
    <wowButton :bName="buttonName" />
    <div class="tableH" ref="table">
      <wow-table
        :pageInfo="pageInfo"
        :options="options"
        @select="selectCallback"
        @sort="sortCallback"
        @getTableData="getTableList"
      >
        <!-- 通过columns 里面对象来遍历生成 可编辑的组件, 不能编辑序号是因为是因为没有传过去slots , 所以及时columns里面包含序号,但是由于表格组件渲染插槽没有他,所以不会序号不可编辑,通过给操作自定义一个属性,来避免渲染生成操作-->
        <!-- //这里是插槽，用于对表格进行操作，比如数据渲染和操作列的增删改查 -->
        <template v-slot:bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span>
              {{ index + 1 }}
            </span>
            <!-- <p v-else class="text-overflow event-name">{{ record[column.key] }}</p> -->
          </template>
          <template v-else-if="column.key !== 'action'">
            <a-tooltip placement="top">
              <template #title>
                <span>{{ record[column.key] }}</span>
              </template>
              <p class="text-overflow event-name">{{ record[column.key] }}</p>
            </a-tooltip>
          </template>
          <!-- //这里的action是操作列，判断是否为操作列对其进行修改 -->
          <template v-else>
            <p class="flex-center">
              <img
                src="./assets/image/icon_jybg_hs.png"
                alt="检验报告"
                title="检验报告"
              />
              <a-divider type="vertical" />
              <img
                src="./assets/image/icon_jc_hs.png"
                alt="检查报告"
                title="检查报告"
              />
              <a-divider type="vertical" />
              <img
                src="./assets/image/icon_blbg_hs.png"
                alt="病理报告"
                title="病理报告"
              />
            </p>
          </template>
        </template>
      </wow-table>
    </div>

    <!-- <t-tree-select
      :depart-source="departTree"
      v-model:value="departId"
      :fieldNames="fieldNames"
    /> -->
    <h1 style="margin: 50px">搜索模式</h1>
    <wowForm v-bind="searchFormProps">
      <template v-slot:buttonSlot>
        <a-button @click="searchForm.resetFields">重置</a-button>
        <a-button @click="search">查询</a-button>
      </template>
    </wowForm>
    <h1>栅格模式</h1>
    <wowForm v-bind="rowFormProps" />
    <h1>表格模式</h1>
    <div>
      <a-button @click="tableFormResetFields">重置</a-button>
      <a-button @click="tableFormSubmitFields(submitForm)">查询</a-button>
    </div>
    <wowForm v-bind="tableFormProps">
      <!-- <template v-slot:a>
				<a-form-item label="额外1" :name="a">
					<a-input allowClear bordered v-model:value="tableFormProps.formData.a"
				/></a-form-item>
			</template>
			<template v-slot:b>
				<a-form-item label="额外2" :name="b"
					><a-input allowClear bordered v-model:value="tableFormProps.formData.b"
				/></a-form-item>
			</template> -->
    </wowForm>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.tableH {
  height: v-bind(tableHeight + "px");
}
</style>
