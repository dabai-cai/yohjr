import React from 'react'
import {Button, message, Pagination, Table} from "antd";
import browserHistory from '../../browserHistory'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },{
        title: '特征名',
        dataIndex: 'title',
    },{
        title: '特征标识',
        dataIndex: 'name',
    },{
        title: '分类',
        dataIndex: 'category',
    }
    ,
    {
        title: '说明',
        dataIndex: 'description'
    },
    {
        title: '键值',
        dataIndex: 'params'
    },
    {
        title: '特征类型',
        dataIndex: 'type',
        render: (text: string) => {
            if(text=='USER_PORTRAIT'){
                return '用户画像'
            }else if(text=='COUNTER'){
                return '计算型'
            }else if(text=='BLACK_XX'){
                return '黑产'
            }else if(text=='LOCATION'){
                 return '归属地';
            }
        }
    },
    {
        title: '数据类型',
        dataIndex: 'dataType'
    },
    {
        title: '操作',
        key: 'operation',
        render: (text: any, record: any) => {
            return (
                <div>
                    <Button type="primary" onClick={() => {
                        browserHistory.push('/p/feature/edit/' + record.id)
                    }}>编辑</Button>
                </div>

            )
        }
    }
]

type FeatureListComponentState = {
    data: any,
    total: number
    currentPage: number
}

let pagesize=10;//页面大小
export default class FeatureListComponent extends React.Component<any, FeatureListComponentState> {

    state = {
        data: [],
        total: 0,
        currentPage: 1
    }

    componentWillMount() {
        this.loadData()
    }

    onChange = (page:any) => {
        this.state.currentPage=page;
        this.loadData();
    }

    loadData() {
        fetch('/api/feature/strategy/search', {
            body: JSON.stringify({
                page: this.state.currentPage,
                size: pagesize
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseBody => {
                if (responseBody.code == 0) {//加载成功
                    this.setState({
                        data: responseBody.data.list,
                        total: responseBody.data.total
                    })
                }else if(responseBody.code==1){//删除成功
                    message.success(responseBody.message);
                    this.setState({
                        data: responseBody.data.list,
                        total: responseBody.data.total
                    })
                }
                else {//加载失败
                    message.error(responseBody.message)
                }
            }).catch(err => {
                message.error(err)
        })
    }

    onAddFrequencyClick() {
        browserHistory.push('/p/feature/add')
    }


    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '24px'}}>
                    <Button type="primary" onClick={this.onAddFrequencyClick.bind(this)}>新增特征</Button>
                </div>
                <Table columns={columns} dataSource={this.state.data} pagination={false} />
                <br/> <br/> <br/>
                {this.state.total > 1 ?
                    <Pagination defaultCurrent={this.state.currentPage}
                                defaultPageSize={pagesize}
                                onChange={this.onChange.bind(this)}
                                total={this.state.total}
                                style={{display: 'flex', justifyContent: 'center'}
                }
                    /> : ''}
            </div>
        )
    }
}