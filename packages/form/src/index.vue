<template>
	<div class="wowForm" v-if="formComponents.length > 0">
		<a-form v-bind="formProps" v-on="formEvents">
			<template v-if="formProps.renderType == 'search'">
				<!-- :formMethods="formMethods"
					:formRef="formProps.ref" -->
				<template v-for="(item, index) in formComponents" :key="index">
					<!-- <slot v-if="item.type === 'slot'" :name="item.name"></slot> -->
					<!-- v-else -->
					<wow_form_item :item="item" :formData="formData" :validateInfos="validateInfos">
						<template v-for="(slotItem, key, i) in slots" :key="i" v-slot:[key]>
							<!-- <span>{{ key }}</span> -->
							<slot :name="key"></slot>
						</template>
					</wow_form_item>
					<!-- <template v-if="item.children && item.children.length">
						<template v-for="(citem, cindex) in item.children" :key="cindex">
							<wow_form_item :item="citem" :formData="formData"> </wow_form_item>
						</template>
					</template> -->
				</template>
			</template>
			<template v-else-if="['row'].includes(formProps.renderType)">
				<template v-for="(rowItem, index) in formComponents" :key="index">
					<div v-if="rowItem.rowTitle" class="rowTitle">{{ rowItem.rowTitle }}</div>
					<!-- type="flex" -->
					<a-row class="rowStyle" v-bind="rowItem.rowProps">
						<!-- :flex="2" -->
						<!-- :span="12" -->
						<a-col
							class="colStyle"
							v-for="(item, index) in rowItem.cols"
							:key="index"
							v-bind="item.colProps"
						>
							<wow_form_item :item="item" :formData="formData" :validateInfos="validateInfos">
								<template v-for="(slotItem, key, i) in slots" :key="i" v-slot:[key]>
									<!-- <span>{{ key }}</span> -->
									<slot :name="key"></slot>
								</template>
							</wow_form_item>
						</a-col>
						<!-- <slot name="searchItem"></slot>
				<div class="form_item">
					<a-button type="primary" @click="search">查询</a-button>
					<a-button type="primary" @click="reset">重置</a-button>
					<a-button type="primary" @click="exportData" v-if="setting?.export">导出</a-button>
					<slot name="searchBtn"></slot>
				</div> -->
					</a-row>
				</template>
			</template>
			<template v-if="['table'].includes(formProps.renderType)">
				<!-- type="flex" -->
				<template v-for="(rowItem, index) in formComponents" :key="index">
					<div v-if="rowItem.rowTitle" class="rowTitle">{{ rowItem.rowTitle }}</div>
					<a-row class="rowStyle" v-bind="rowItem.rowProps">
						<!-- :flex="2" -->
						<!-- :span="12" -->
						<a-col
							class="colStyle"
							v-for="(item, index) in rowItem.cols"
							:key="index"
							v-bind="item.colProps"
						>
							<div class="colCustom" v-bind="item.colCustomProps">
								<div
									class="labelCustom"
									:style="{
										width: formProps.customLabelWidth ? formProps.customLabelWidth : '120px'
									}"
									v-bind="item.labelCustomProps"
								>
									<span v-if="item.require || item.element[0].rule" class="redStar">*</span>
									{{ item.label }}
								</div>
								<div class="itemCustom" v-bind="item.itemCustomProps">
									<template v-if="item.element">
										<template v-for="(it, index) in item.element" :key="index">
											<template
												v-if="
													!it.linkShow ||
													(it.linkShow &&
														it.linkShow.type != 'Array' &&
														formData[it.linkShow.key] == it.linkShow.value) ||
													(it.linkShow &&
														it.linkShow.type === 'Array' &&
														formData[it.linkShow.key].includes(it.linkShow.value))
												"
											>
												<wow_form_item
													:item="it"
													:formData="formData"
													:validateInfos="validateInfos"
												>
													<template v-for="(slotItem, key, i) in slots" :key="i" v-slot:[key]>
														<!-- <span>{{ key }}</span> -->
														<slot :name="key"></slot>
													</template>
												</wow_form_item>
											</template>
										</template>
									</template>
								</div>
							</div>
						</a-col>
						<!-- <slot name="searchItem"></slot>
				<div class="form_item">
					<a-button type="primary" @click="search">查询</a-button>
					<a-button type="primary" @click="reset">重置</a-button>
					<a-button type="primary" @click="exportData" v-if="setting?.export">导出</a-button>
					<slot name="searchBtn"></slot>
				</div> -->
					</a-row>
				</template>
			</template>
		</a-form>
	</div>
</template>

<script setup name="wowForm">
import wow_form_item from './components/wow_form_item.vue';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';
import { object } from 'vue-types';
const formRefNow = ref();
const slots = useSlots();
// console.log(slots, 1);
const emits = defineEmits(['exportTable']);
const props = defineProps({
	// 搜索组件
	formComponents: {
		type: Array,
		default: () => []
	},
	// formRef
	formProps: {
		type: Object,
		default: () => {}
	},
	// formData
	formData: {
		type: Object,
		default: () => {}
	},
	// formMethods
	formMethods: {
		type: Object,
		default: () => {}
	},
	// 表单事件
	formEvents: {
		type: Object,
		default: () => {}
	},
	// ref
	formRef: {
		type: Object,
		default: () => {}
	},
	validateInfos: {
		type: Object,
		default: () => {}
	},
	// 更多设置
	setting: {
		type: Object,
		default: () => {}
	}
});
const {
	formComponents,
	formProps,
	formMethods,
	formEvents,
	formData,
	formRef,
	validateInfos,
	setting
} = toRefs(props);
console.log('formData:', formData);

// 查询功能
const search = () => {
	const searchParams = {};
	for (const item of unref(formComponents)) {
		switch (item.type) {
			case 'dateRange':
				item.val = [
					dayjs(item.val[0]).format('YYYY-MM-DD'),
					dayjs(item.val[1]).format('YYYY-MM-DD')
				];
				break;
			case 'dateTime':
				item.val.time = cloneDeep(dayjs(item.val.time).format(formatType(item.val.dataType)));
				break;
			default:
				break;
		}
		searchParams[item.filed] = typeof item.val === 'object' ? toRaw(item.val) : item.val;
	}
	emits('getData', searchParams);
};
// 导出
const exportData = () => {
	emits('exportTable');
};
// 检查是否存在表情包
const retEmit = (e, index) => {
	const reg =
		/[^a-zA-Z0-9_\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b/\s,.!！:()?/_""-——]/g;
	unref(formComponents)[index].val = e.target.value.replace(reg, '');
};

// 时间选择器预设时间
const ranges = {
	今天: [dayjs(), dayjs()]
};
// 日期选择器
const format = ref('YYYY-MM-DD');
const formatType = type => {
	switch (type) {
		case 'date':
			format.value = 'YYYY-MM-DD';
			break;
		case 'month':
			format.value = 'YYYY-MM';
			break;
		case 'quarter':
			format.value = 'YYYY-MM';
			break;
		case 'year':
			format.value = 'YYYY';
			break;
		default:
			break;
	}
	return format.value;
};
</script>

<style lang="scss" scoped>
.wowForm {
	// padding: 24px 0 8px 24px;
	// background: #fff;
	// border-radius: 4px;
	// display: flex;
	// align-items: center;
	// flex-wrap: wrap;
	.formTableStyle {
		.rowStyle {
			border: 1px solid #d9d9db;
			&:not(:first-child) {
				border-top: none;
			}
		}
		.colStyle {
			padding: 0px;

			&:not(:first-child) {
				border-left: 1px solid #d9d9db;
			}

			:deep(.ant-form-item) {
				margin-bottom: 0;
			}
		}
		.colCustom {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 100%;
			.labelCustom {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				height: 100%;
				border-right: 1px solid #f6f6f6;
				background: #f6f6f6;
				padding: 5px;
			}
			.itemCustom {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 5px;
				flex: 1;
				flex-wrap: wrap;
				:deep(.ant-form-item) {
					// width: 100%;
				}
				:deep(.ant-radio-group) {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				:deep(.ant-checkbox-group) {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
			// .itemCustomNewLine{
			// 	dis
			// }
		}
	}

	.form_item {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #303133;
		padding: 0;
		// max-width: 280px;
		margin-bottom: 0px;
		// margin-right: 10px;
		.item_label {
			flex-shrink: 0;
			margin-right: 6px;
			text-align: right;
		}
		.item_content {
			flex-shrink: 0;
			min-width: 100px;
			.ant-input,
			:deep(.ant-select-selector) {
				min-width: 200px;
			}
			.dataStyle {
				:deep(.ant-select-selector) {
					min-width: 20px;
					width: 100%;
				}
			}
		}
		.ant-select__tags {
			padding-left: 6px !important;
		}
	}
	.rowTitle {
		padding: 0 10px;
		margin: 5px;
		border-left: 4px solid #06aea6;
		text-align: left;
	}
	:deep(.ant-form-item-control) {
		position: relative;
	}
	:deep(.ant-form-item-explain) {
		position: absolute;
		width: auto;
		max-width: 100%;
		line-height: 12px;
		padding: 12px 14px;
		background: #ffffff;
		border-radius: 3px;
		bottom: 37px;
		right: 16px;
		transform: translate(50%, 0%);
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffffff;
		box-shadow: 0px 1px 20px 1px rgb(0 0 0 / 20%);
		.ant-form-item-explain-error {
			color: #333333;
		}
	}
	:deep(.ant-form-item-explain::after) {
		display: block;
		content: '';
		width: 0;
		height: 0;
		border-top: 5px solid #ffffff;
		border-bottom: 5px solid transparent;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		z-index: 99;
		position: absolute;
		right: 50%;
		top: 100%;
		transform: translate(50%, 0%);
	}
	:deep(.ant-form-item-control-input-content) {
		display: flex;
	}
	.redStar {
		display: inline-block;
		margin-right: 4px;
		color: #ff4d4f;
		font-size: 14px;
		font-family: SimSun, sans-serif;
		line-height: 1;
	}
}
</style>
