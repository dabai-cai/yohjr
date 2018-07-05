import React from 'react'
import {Button, Form, Input, message, Radio, Select, TimePicker} from "antd";
import browserHistory from '../../browserHistory'
import moment from 'moment'

const Option = Select.Option;

function periodTimeFormat(timePeriod: number) {
    let seconds = Math.round(timePeriod % 60)
    let allMinutes = Math.round(timePeriod / 60)
    let minutes = Math.round(allMinutes % 60)
    let hours = Math.round(timePeriod / 3600)
    let date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(seconds)
    return moment((hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds, 'HH:mm:ss')
}

type FeatureEditComponentState = {
    id: string
    formValue: any
}

const formItemLayout = {
    labelCol: {
        xs: {span: 14},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 14},
        sm: {span: 10},
    },
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}


const types = ['COUNTER', 'USER_PORTRAIT', 'BLACK_XX','LOCATION'];
const dataType = {
    COUNTER: ['BOOLEAN'],
    USER_PORTRAIT: ['BOOLEAN', 'NUMBER', 'STRING', 'LIST', 'DICT'],
    BLACK_XX: ['BOOLEAN', 'NUMBER', 'STRING', 'LIST', 'DICT'],
    LOCATION:['BOOLEAN', 'NUMBER', 'STRING', 'LIST', 'DICT']
};


class FeatureEditComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        let id = props.match && props.match.params && props.match.params.id;
        this.state = {
            id: id,
            formValue: {
                id: id
            },
            dataTypes: dataType[types[0]],
            dataType: dataType[types[0]][0],
            hideDetails: false
        }
    }

    handleTypeChange = (value: any) => {
        this.setState({
            dataTypes: dataType[value],
            dataType: dataType[value][0],
        });
        if (value != "COUNTER") {
            this.setState({
                hideDetails: false
            });
        }else {
            this.setState({
                hideDetails: true
            });
        }
    }
    ondataTypeChange = (value: any) => {
        this.setState({
            dataType: value,
        });
    }

    componentWillMount() {
        if (this.state.id != null) {
            fetch('/api/feature/strategy/' + this.state.id)
                .then(response => response.json())
                .then(responseBody => {
                    if (responseBody.code == 0) {
                        this.setState({
                            formValue: Object.assign({id: this.state.id}, responseBody.data, {
                                duration: periodTimeFormat(responseBody.data.duration),
                                blockPeriod: periodTimeFormat(responseBody.data.blockPeriod)
                            })
                        });
                        if(this.state.formValue.type!="COUNTER"){
                            this.setState(
                                {
                                    hideDetails:false
                                }
                            )
                        }else {
                            this.setState(
                                {
                                    hideDetails:true
                                }
                            )
                        }
                        let value=this.state.formValue.type;
                        this.setState({
                            dataTypes: dataType[value],
                            dataType: dataType[value][0],
                        });
                    }
                    else {
                        message.error(responseBody.message)
                    }
                })
                .catch(err => {
                    message.error(err)
                })
        }
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (err) {
                return;
            }
            let cycleTime = new Date(fieldsValue.duration)
            let blockPeriodTime = new Date(fieldsValue.blockPeriod)
            let submitObject = Object.assign({}, fieldsValue, {
                id: this.state.id,
                duration: (cycleTime.getHours() * 60 + cycleTime.getMinutes()) * 60 + cycleTime.getSeconds(),
                blockPeriod: (blockPeriodTime.getHours() * 60 + blockPeriodTime.getMinutes()) * 60 + blockPeriodTime.getSeconds(),
                creator: '',
                lastUpdater: ''
            })
            let method = this.state.id != null ? 'POST' : 'PUT';
            fetch('/api/feature/strategy', {

                body: JSON.stringify(submitObject),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: method
            }).then(response => response.json())
                .then(responseBody => {
                    if (responseBody.code == 0) {
                        message.success('操作成功')
                        browserHistory.push('/p/feature/list')
                    }
                    else {
                        message.error(responseBody.message)
                    }
                })
                .catch(err => {
                    message.error(err)
                })
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const typeOptions = types.map(type => <Option key={type}>{type}</Option>);
        const dataTypeOptions = this.state.dataTypes.map((dataType: any) => <Option key={dataType}>{dataType}</Option>);
        //特征分类
        const categorys=['IP','Mobile','Device'].map((category:any)=><Option key={category}>{category}</Option>);
        let details = null;
            let currentType=this.state.formValue.type;
                details = <Form.Item {...formItemLayout} label="特征详情">
                    {getFieldDecorator('details', {
                        rules: [
                          // {required: true, message: '必须输写特征详情,如{sql:select * from rc_feature}'}
                        ],
                        initialValue: this.state.formValue.details

                    })(
                        <Input.TextArea autosize={{minRows: 5, maxRows: 15}} placeholder="select count(1) from rc_feature group by ip"/>
                    )}
                </Form.Item>

        return (
            <div>
                <div>
                    <Button type="primary" onClick={() => {
                        browserHistory.push('/p/feature/list')
                    }}>返回</Button>
                </div>
                <Form onSubmit={this.handleSubmit.bind(this)}
                      style={{}}>
                    {
                        this.state.id != null && <Form.Item {...formItemLayout} label="ID">
                            {getFieldDecorator('id', {
                                rules: [],
                                initialValue: this.state.formValue.id
                            })(
                                <Input readOnly={true} disabled={true}/>
                            )}
                        </Form.Item>
                    }
                    <Form.Item {...formItemLayout} label="特征名称">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '必须输写特征名称'
                            }],
                            initialValue: this.state.formValue.title

                        })(
                            <Input placeholder="常登地"/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="唯一标识">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '必须输写唯一标识'
                            }],
                            initialValue: this.state.formValue.name

                        })(
                            <Input placeholder="IP_LOCATION"/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="分类">
                        {getFieldDecorator('category', {
                            rules: [{
                                required: true, message: '必须选择一种特征分类'
                            }],
                            initialValue: this.state.formValue.category || 'IP',
                        })(
                            <Select style={{width: 180}}  >
                                {categorys}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="特征类型">
                        {getFieldDecorator('type', {
                            rules: [{
                                required: true, message: '必须选择一种特征类型'
                            }],
                            initialValue: this.state.formValue.type || 'BLACK_XX',
                        })(
                            <Select style={{width: 180}} onChange={this.handleTypeChange.bind(this)} >
                                {typeOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="数据类型">
                        {getFieldDecorator('dataType', {
                            rules: [{
                                required: true, message: '必须选择一种数据类型'
                            }],
                            initialValue: this.state.formValue.dataType || ''
                        })(
                            <Select value={this.state.dataType} style={{width: 120}}
                                    onChange={this.ondataTypeChange.bind(this)}>
                                {dataTypeOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="说明">
                        {getFieldDecorator('description', {
                            rules: [
                                {required: true, message: '必须输写特征说明'}
                            ],
                            initialValue: this.state.formValue.description
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="特征键">
                        {getFieldDecorator('keys', {
                            rules: [{
                                required: true, message: '必须输写特征键'
                            }
                            ],
                            initialValue: this.state.formValue.keys

                        })(
                            <Input placeholder="填写格式示例: k1,k2,k3"/>
                        )}
                    </Form.Item>
                    {this.state.hideDetails? details : ""}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(FeatureEditComponent)