import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";


const parentColumns = [
    {title: 'Provider手机运营商', dataIndex: 'provider', key: 'provider'},

    {title: 'Type类型', dataIndex: 'type', key: 'type'},
    {title: 'Account Num手机运营商号码', dataIndex: 'providerNum', key: 'providerNum'},
    {
        title: 'Action操作',
        key: 'operation',
        render: (record) => {
            return (
                <ButtonGroup>
                    <Button size={"small"} type="primary">修改</Button>
                    <Button size={"small"} type="danger">删除</Button>
                </ButtonGroup>
            )
        }

    },
];

const childColumns = [
    {title: 'Phone电话号码', dataIndex: 'phone', key: 'phone'},
    {title: 'Service服务', dataIndex: 'service', key: 'service'},
    {title: 'Plan电话计划', dataIndex: 'plan', key: 'plan'},
    {title: 'Discount优惠', dataIndex: 'discount', key: 'discount'},
    {title: 'Cost花费', dataIndex: 'cost', key: 'cost'},
];




class BillPhone extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 100,
            parentColumns,
            childColumns,
        }
    }

    expandedRowRender = (data) => {

        return <Table columns={this.state.childColumns} dataSource={data.childrenPhone} pagination={false}/>;
    };

    // 渲染前， 获取数据
    componentDidMount() {
        // 通过 "/billPhone" 来获取对应页面的数据
        getTopics("/billPhone").then(response => {
            this.setState(
                {
                    dataSource: response.result.list
                }
            )
        }).catch(error => {
            throw error
        })
    }


    render() {
        return (
            <Card title="Phone Bill手机账单" extra={
                <ButtonGroup>
                    <Button size={"small"} type="text" danger>新增</Button>
                    <Button size={"small"} type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>
                <Table
                    className="components-table-demo-nested"
                    columns={this.state.parentColumns}
                    expandable={{
                        expandedRowRender: this.expandedRowRender,
                        defaultExpandAllRows: true
                    }}
                    dataSource={this.state.dataSource}
                />
            </Card>
        );
    }
}

export default BillPhone;