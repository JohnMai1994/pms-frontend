import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {billPhoneResponse} from "../sampleResponse"


// Sample Response
const response = billPhoneResponse;


function NestedTable() {

    const expandedRowRender = (data) => {
        const columns = [
            {title: 'Phone电话号码', dataIndex: 'phone', key: 'phone'},
            {title: 'Service服务', dataIndex: 'service', key: 'service'},
            {title: 'Plan电话计划', dataIndex: 'plan', key: 'plan'},
            {title: 'Discount优惠', dataIndex: 'discount', key: 'discount'},
            {title: 'Cost花费', dataIndex: 'cost', key: 'cost'},
        ];

        return <Table columns={columns} dataSource={data.childrenPhone} pagination={false}/>;
    };

    const columns = [
        {title: 'Provider手机运营商', dataIndex: 'provider', key: 'provider'},

        {title: 'Type类型', dataIndex: 'type', key: 'type'},
        {title: 'Account Num手机运营商号码', dataIndex: 'providerNum', key: 'providerNum'},
        {
            title: 'Action操作',
            key: 'operation',
            render: (text, record) => {
                console.log(record)
                return (
                    <ButtonGroup>
                        <Button type="primary">修改</Button>
                        <Button type="danger">删除</Button>
                    </ButtonGroup>
                )
            }

        },
    ];

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{
                expandedRowRender,
                defaultExpandAllRows: true
            }}
            dataSource={response.result.list}
        />
    );
}





class BillPhone extends Component {
    render() {
        return (
            <Card title="Phone Bill手机账单" extra={
                <ButtonGroup>
                    <Button type="text" danger>新增</Button>
                    <Button type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>
                <NestedTable></NestedTable>
            </Card>
        );
    }
}

export default BillPhone;