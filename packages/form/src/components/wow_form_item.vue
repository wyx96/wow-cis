<template>
	<!--  v-bind="item.formItemProps" -->
	<!-- v-bind="validateInfos[item.name]" -->
	<!-- v-bind="{ ...item.formItemProps, ...validateInfos[item.name] }" -->

	<a-form-item
		:label="item.label"
		:name="item.name"
		:hasFeedback="item.rule ? true : false"
		v-bind="formItemAllProps"
	>
		<!-- input框 -->
		<a-input
			v-model:value.trim="formData[item.name]"
			:placeholder="item.placeholder || `请输入${item.label}`"
			:type="item.inputType ? item.inputType : 'text'"
			allowClear
			bordered
			v-bind="item.formElementProps"
			v-if="item.type === 'input'"
		/>
		<!-- input number -->
		<a-input-number
			v-model:value="formData[item.name]"
			:placeholder="item.placeholder || `请输入${item.label}`"
			allowClear
			bordered
			v-bind="item.formElementProps"
			v-else-if="item.type === 'inputNumber'"
		/>

		<!-- 选择器 -->
		<a-select
			v-model:value="formData[item.name]"
			:mode="item.multiple ? 'multiple' : null"
			:placeholder="item.placeholder"
			allowClear
			:maxTagCount="1"
			:maxTagTextLength="5"
			:options="item.selects"
			:style="[{ width: item.multiple ? '230px' : '100%' }, { textAlign: 'left' }]"
			v-bind="item.formElementProps"
			v-else-if="item.type === 'select'"
		></a-select>
		<!-- 单选 radio -->
		<a-radio-group
			v-model:value="formData[item.name]"
			name="radioGroup"
			v-bind="item.formElementProps"
			v-else-if="item.type === 'radio'"
		>
			<template v-for="(opt, index) in item.option" :key="index">
				<template v-if="opt.element && opt.element.length">
					<template v-for="(ele, eleIndex) in opt.element" :key="eleIndex">
						<template
							v-if="
								!ele.linkShow || (ele.linkShow && formData[ele.linkShow.key] == ele.linkShow.value)
							"
						>
							<wow_form_item :item="ele" :formData="formData" :validateInfos="validateInfos">
							</wow_form_item>
						</template>
					</template>
				</template>

				<a-radio v-else :value="opt.value" v-bind="opt.optionProps">{{ opt.label }}</a-radio>
			</template>
		</a-radio-group>
		<!-- 复选 checkbox -->
		<a-checkbox-group
			v-model:value="formData[item.name]"
			v-bind="item.formElementProps"
			v-else-if="item.type === 'checkbox'"
			style="width: 100%"
		>
			<template v-for="(opt, index) in item.option" :key="index">
				<a-checkbox :value="opt.value" v-bind="opt.optionProps">{{ opt.label }}</a-checkbox>
			</template>
		</a-checkbox-group>
		<!-- 日期区间选择器 -->
		<a-range-picker
			v-model:value="formData[item.name]"
			:ranges="ranges"
			:disabledDate="item.disabledDate"
			:placeholder="item.placeholder"
			valueFormat="YYYY-MM-DD"
			separator="至"
			allowClear
			v-bind="item.formElementProps"
			v-else-if="item.type === 'dateRange'"
		/>
		<!-- 日期选择器 -->
		<a-date-picker
			v-model:value="formData[item.name]"
			allowClear
			v-bind="item.formElementProps"
			v-else-if="item.type === 'datePicker'"
		/>
		<a-button
			v-bind="item.formElementProps"
			v-on="item.formElementEvents"
			@click="resetFields"
			v-else-if="item.type === 'button'"
			>{{ item.text }}</a-button
		>
		<slot :name="item.slotName" v-else-if="item.type === 'slot'"></slot>
	</a-form-item>

	<template v-if="item.slotName && item.type != 'slot'">
		<slot :name="item.slotName"></slot>
	</template>
</template>

<script setup name="wow_form_item">
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';
import { object } from 'vue-types';
const slots = useSlots();
// console.log(slots, 2);
// const emits = defineEmits(['exportTable']);
const props = defineProps({
	// item
	item: {
		type: Object,
		default: () => {}
	},
	// formData
	formData: {
		type: Object,
		default: () => {}
	},
	// formRef
	formRef: {
		type: Object,
		default: () => {}
	},
	formMethods: {
		type: Object,
		default: () => {}
	},
	validateInfos: {
		type: Object,
		default: () => {}
	}
});
const { item, formData, formRef, formMethods, validateInfos } = toRefs(props);
const formItemAllProps = computed(() => {
	let option = unref(item).formItemProps;

	if (unref(validateInfos)[unref(item).name]) {
		option = { ...option, ...unref(validateInfos)[unref(item).name] };
	}
	return option;
});
// const { resetFields, validate, validateInfos } = formMethods;
// console.log(resetFields, validate, validateInfos);
// // 查询功能
// const search = () => {
// 	const searchParams = {};
// 	for (const item of unref(formComponents)) {
// 		switch (item.type) {
// 			case 'dateRange':
// 				item.val = [
// 					dayjs(item.val[0]).format('YYYY-MM-DD'),
// 					dayjs(item.val[1]).format('YYYY-MM-DD')
// 				];
// 				break;
// 			case 'dateTime':
// 				item.val.time = cloneDeep(dayjs(item.val.time).format(formatType(item.val.dataType)));
// 				break;
// 			default:
// 				break;
// 		}
// 		searchParams[item.filed] = typeof item.val === 'object' ? toRaw(item.val) : item.val;
// 	}
// 	console.log(searchParams, 'searchParams');
// 	emits('getData', searchParams);
// };
// // 导出
// const exportData = () => {
// 	emits('exportTable');
// };
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

<style lang="scss" scoped></style>
