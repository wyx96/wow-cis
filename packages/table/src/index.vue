<template>
  <div class="table">
    <a-table
      id="out-table"
      @change="onChange"
      @resizeColumn="handleResizeColumn"
      v-bind="getBindValues"
    >
      <template v-slot:[item]="scope" v-for="item in renderArr">
        <!-- //renderArr 是父组件传递过来的用了插槽的名字,等下会在父组件中讲清楚,通过这个数组来遍历生成插槽 -->
        <slot :name="item" v-bind="scope || {}"></slot>
        <!-- //再通过这个插槽传递数据给父组件,做一些编辑提交的操作等等 -->
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "wowTable",
};
</script>

<script setup name="wowTable">
const props = defineProps({
  // 是否多选
  isSelect: {
    type: Boolean,
    default: false,
  },
  // 分页器配置
  pageInfo: {
    type: Object,
    default: false,
  },
  // 配置项
  options: {
    //表格配置项中主要有 rowKey——自定义行key值 ，columns——列配置项，dataSource——表格数据
    type: Object, //options中的key值需要按照antd中api字段赋值
  },
});
// eslint-disable-next-line no-undef
const slots = useSlots();
// 插槽的实例
const renderArr = Object.keys(slots);
// 渲染的数据
// console.log(renderArr);
const emits = defineEmits([]);
const { isSelect, pageInfo, options } = toRefs(props);
// 数据是否为空
const isDataSource = unref(options).dataSource.length === 0 ? "100%" : "none";
// 分页器配置
const paginationConfig = reactive({
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => {
    `共 ${total} 条`;
  },
  pageSizeOptions: ["5", "10", "20", "30", "40", "100"],
  onChange: (page, pageSize) => {
    pageChange(page, pageSize);
  },
  onShowSizeChange: (current, size) => {
    pageSizeChange(current, size);
  },
  pageInfo,
});
const getBindValues = computed(() => {
  let otherOptions = {
    // sticky: true,
    rowSelection: unref(isSelect) ? rowSelection : null,
    pagination: unref(pageInfo) ? paginationConfig : false,
    scroll: {
      x: "100%",
      y: `calc(100% - 55px)`,
      scrollToFirstRowOnChange: false,
    },
  };
  let option = Object.assign(options.value, otherOptions);
  // console.log(option.value, 'getBindValues');
  return option;
});
// 可伸缩列配置
const handleResizeColumn = (w, col) => {
  // console.log(w,col);
  col.width = w;
};
onMounted(() => {});
// 是否多选
const rowSelection = {
  // 当多选选择器发生变化传出emit事件
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys, selectedRows)
    emits("select", selectedRowKeys, selectedRows);
  },
  getCheckboxProps: (record) => {
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // name: record.name
    // console.log(record);
  },
};
// change事件，这里主要作用触发排序的emit事件
const onChange = (pagination, filters, sorter, extra) => {
  if (extra.action === "sort") {
    emits("sort", sorter);
  }
};
// 页码回调
const pageChange = (page, pageSize) => {
  pageInfo.value.current = page;

  console.log(page, pageSize, "pageChange");
  emits("getTableData");
};
// 分页回调
const pageSizeChange = (current, size) => {
  pageInfo.value.pageSize = size;
  console.log(current, size);
  emits("getTableData");
};
</script>
<style lang="scss" scoped>
.table {
  height: 100%;
}
:deep(.ant-table-wrapper) {
  height: 100%;
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-container {
    height: 100%;
  }

  .ant-table-body {
    height: calc(100% - 55px);
    table {
      height: v-bind(isDataSource);
    }
  }
  .ant-table-placeholder {
    height: v-bind(isDataSource);
    .ant-table-expanded-row-fixed {
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
