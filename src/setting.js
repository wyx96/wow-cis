import dayjs from 'dayjs';
export function pageList() {
	// search模式
	const formSearchComponents = ({ formData }) => [
		{
			type: 'input',
			label: '审核信息',
			val: null,
			placeholder: '请输入审核任务标题',
			name: 'taskInfo',
			formItemProps: {},
			formElementProps: {}
		},
		{
			type: 'inputNumber',
			label: '数字',
			val: null,
			placeholder: '请输入',
			name: 'num',
			formItemProps: {},
			formElementProps: {}
		},
		{
			type: 'select',
			label: '审核类型',
			placeholder: '请选择审核类型',
			val: [-1],
			defaultValue: [-1],
			name: 'type',
			multiple: true,
			selects: [
				{
					label: '全部',
					value: -1
				},
				{
					label: '直播任务11111111111111',
					value: 2
				},
				{
					label: '视频任务',
					value: 1
				},
				{
					label: '征集素材',
					value: 3
				}
			],
			formItemProps: {},
			formElementProps: { style: 'width: 100%' }
		},
		{
			type: 'dateRange',
			label: '时间',
			defaultValue: [dayjs(), dayjs()],
			placeholder: ['开始时间', '结束时间'],
			name: 'dateRange',
			disabledDate(current) {
				return current && current > dayjs().endOf('day');
			},
			formItemProps: {},
			formElementProps: { style: 'width: 100%' }
			// slotName: 'buttonSlot'
		},
		{
			type: 'slot',
			label: '',
			val: null,
			placeholder: '',
			name: '',
			formItemProps: { hasFeedback: false },
			formElementProps: {},
			slotName: 'buttonSlot'
		}
	];
	// 栅格模式
	const formComponents = ({ formData }) => [
		{
			rowProps: {},
			cols: [
				{
					type: 'input',
					label: '审核信息',
					val: null,
					placeholder: '请输入审核任务标题',
					name: 'taskInfo',
					formItemProps: {},
					formElementProps: {},
					colProps: { span: 12 }
				},
				{
					type: 'select',
					label: '审核类型',
					placeholder: '请选择审核类型',
					val: [-1],
					defaultVal: [-1],
					name: 'type',
					multiple: true,
					selects: [
						{
							label: '全部',
							value: -1
						},
						{
							label: '直播任务11111111111111',
							value: 2
						},
						{
							label: '视频任务',
							value: 1
						},
						{
							label: '征集素材',
							value: 3
						}
					],
					formItemProps: {},
					formElementProps: { style: 'width: 100%' },
					colProps: { span: 12 },
					slotName: 'inputSlot'
				}
			]
		},
		{
			rowProps: {},
			cols: [
				{
					type: 'dateRange',
					label: '时间',
					val: [dayjs(), dayjs()],
					placeholder: ['开始时间', '结束时间'],
					name: 'dateRange',
					disabledDate(current) {
						return current && current > dayjs().endOf('day');
					},
					formItemProps: {},
					formElementProps: { style: 'width: 100%' },
					colProps: { span: 12 }
				},
				{
					type: 'datePicker',
					label: '时间',
					val: {
						dataType: 'date',
						time: dayjs()
					},
					dataType: [
						{
							label: '日',
							value: 'date'
						},
						{
							label: '月',
							value: 'month'
						},
						{
							label: '季',
							value: 'quarter'
						},
						{
							label: '年',
							value: 'year'
						}
					],
					name: 'dateTime',
					formItemProps: {},
					formElementProps: {},
					colProps: { span: 12 }
					// disabledDate(current) {
					// 	return current && current > dayjs().endOf("day");
					// }
				}
			]
		}
	];
	// 表格模式
	const formTableComponents = ({ formData }) => [
		{
			rowProps: {},
			rowTitle: '测试标题',
			cols: [
				{
					label: '病历号',
					require: true,
					colProps: { span: 12 },
					colCustomProps: {},
					labelCustomProps: {},
					itemCustomProps: {},
					element: [
						{
							type: 'input',
							label: '',
							val: null,
							placeholder: '请输入审核任务标题',
							name: 'taskInfo',
							formItemProps: {},
							formElementProps: {
								onChange: e => {
									console.log('111', e.target.value);
									// formData.taskInfo1 = '2222';
								}
							},
							colProps: { span: 12 },
							rule: [{ required: true, message: '22222' }]
						},
						{
							type: 'input',
							label: '11',
							val: null,
							placeholder: '11',
							name: 'taskInfo1',
							formItemProps: {},
							formElementProps: {},
							colProps: { span: 12 },
							linkShow: { key: 'taskInfo', value: '1' }
						},
						{
							type: 'input',
							label: '22',
							val: null,
							placeholder: '22',
							name: 'taskInfo2',
							formItemProps: {},
							formElementProps: {},
							colProps: { span: 12 }
						}
					]
				},
				{
					label: '审核类型',
					colProps: { span: 12 },
					colCustomProps: {},
					labelCustomProps: {},
					itemCustomProps: {},
					element: [
						{
							type: 'select',
							label: '',
							placeholder: '请选择审核类型',
							val: [-1],
							defaultVal: [-1],
							name: 'type',
							multiple: true,
							selects: [
								{
									label: '全部',
									value: -1
								},
								{
									label: '直播任务11111111111111',
									value: 2
								},
								{
									label: '视频任务',
									value: 1
								},
								{
									label: '征集素材',
									value: 3
								}
							],
							formItemProps: {},
							formElementProps: { style: 'width: 100%' },
							colProps: { span: 12 },
							rule: [{ required: true, message: '22222' }]
						},
						{
							type: 'slot',
							label: '',
							val: '',
							defaultVal: '',
							name: 'a',
							formItemProps: {},
							formElementProps: { style: 'width: 100%' },
							colProps: { span: 12 },
							slotName: 'a',
							rule: [{ required: true, message: '22222' }]
						},
						{
							type: 'slot',
							label: '',
							val: '',
							defaultVal: '',
							name: 'b',
							formItemProps: {},
							formElementProps: { style: 'width: 100%' },
							colProps: { span: 12 },
							slotName: 'b',
							rule: [{ required: true, message: '22222' }]
						}
					]
				}
			]
		},
		{
			rowProps: {},
			cols: [
				{
					label: '时间',
					colProps: { span: 12 },
					colCustomProps: {},
					labelCustomProps: {},
					itemCustomProps: {},
					element: [
						{
							type: 'dateRange',
							label: '',
							val: [dayjs(), dayjs()],
							placeholder: ['开始时间', '结束时间'],
							name: 'dateRange',
							disabledDate(current) {
								return current && current > dayjs().endOf('day');
							},
							formItemProps: {},
							formElementProps: { style: 'width: 100%' },
							colProps: { span: 12 }
						}
					]
				},
				{
					label: '时间',
					colProps: { span: 12 },
					colCustomProps: {},
					labelCustomProps: {},
					itemCustomProps: {},
					element: [
						{
							type: 'datePicker',
							label: '',
							val: {
								dataType: 'date',
								time: dayjs()
							},
							dataType: [
								{
									label: '日',
									value: 'date'
								},
								{
									label: '月',
									value: 'month'
								},
								{
									label: '季',
									value: 'quarter'
								},
								{
									label: '年',
									value: 'year'
								}
							],
							name: 'dateTime',
							formItemProps: {},
							formElementProps: {},
							colProps: { span: 12 }
							// disabledDate(current) {
							// 	return current && current > dayjs().endOf("day");
							// }
						}
					]
				}
			]
		},
		{
			rowProps: {},
			rowTitle: '患者信息',
			cols: [
				{
					label: '单选',
					colProps: { span: 12 },
					colCustomProps: {},
					labelCustomProps: {},
					itemCustomProps: { class: 'newline' },
					element: [
						{
							type: 'radio',
							label: '',
							val: null,
							name: 'radio1',
							formItemProps: {},
							formElementProps: {},
							colProps: { span: 12 },
							option: [
								{ value: '是', label: '是', optionProps: {} },
								{
									element: [
										{
											type: 'input',
											label: '级联',
											val: null,
											placeholder: '1',
											name: 'radio11',
											formItemProps: {},
											formElementProps: {},
											colProps: { span: 12 },
											linkShow: { key: 'radio1', value: '是' }
										}
									]
								},
								{ value: '否', label: '否', optionProps: {} }
							]
						}
					]
				},
				{
					label: '移植方式',
					colProps: { span: 12 },
					colCustomProps: {},
					labelCustomProps: {},
					itemCustomProps: {},
					element: [
						{
							type: 'checkbox',
							label: '',
							val: null,
							placeholder: '',
							name: 'checkbox1',
							formItemProps: { style: { width: '100%' } },
							formElementProps: {},
							colProps: { span: 12 },
							option: [
								{ value: 'A', label: 'A', optionProps: {} },
								{ value: 'B', label: 'B', optionProps: {} }
							]
						},
						{
							type: 'radio',
							label: '33',
							val: null,
							placeholder: '33',
							name: 'taskInfo1',
							formItemProps: { style: { width: '100%' } },
							formElementProps: {},
							colProps: { span: 12 },
							linkShow: { key: 'checkbox1', value: 'A', type: 'Array' },
							option: [
								{ value: '是', label: '是', optionProps: {} },
								{ value: '否', label: '否', optionProps: {} }
							]
						},
						{
							type: 'radio',
							label: '44',
							val: null,
							placeholder: '44',
							name: 'taskInfo2',
							formItemProps: { style: { width: '100%' } },
							formElementProps: {},
							colProps: { span: 12 },
							linkShow: { key: 'checkbox1', value: 'B', type: 'Array' },
							option: [
								{ value: '是', label: '是', optionProps: {} },
								{ value: '否', label: '否', optionProps: {} }
							]
						}
					]
				}
			]
		}
	];
	return {
		formComponents,
		formSearchComponents,
		formTableComponents
	};
}
