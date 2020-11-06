import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";
import CreateButton from "../../../components/CreateButton";
import ExcelSimpleExportButton from "../../../components/ExcelExportButton/simpleExcel";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";

class BillPhone extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            // Excel 导出 中英对比
            entozh: {
                "phone": "电话号码",
                "service": "服务",
                "plan": "电话计划",
                "discount": "优惠",
                "cost": "花费",
                "provider": "运营商",
                "providerNum": "运营商编号",
            },
            // 主表结构
            columns: [
                {title: 'Phone电话号码', dataIndex: 'phone', key: 'phone'},
                {title: 'Service服务', dataIndex: 'service', key: 'service'},
                {title: 'Plan电话计划', dataIndex: 'plan', key: 'plan'},
                {title: 'Discount优惠', dataIndex: 'discount', key: 'discount'},
                {title: 'Cost花费', dataIndex: 'cost', key: 'cost'},
                {title: 'Provider运营商', dataIndex: 'provider', key: 'provider'},
                {title: 'Account Num运营商编号', dataIndex: 'providerNum', key: 'providerNum'},
                {
                    title: 'Action操作',
                    key: 'operation',
                    render: (record) => {
                        return (
                            <ButtonGroup>
                                <EditButton record={record} address={"/bill-phone"}/>
                                <DeleteButton record={record} address={"/bill-phone"}/>
                            </ButtonGroup>
                        )
                    }

                },
            ],
            dataSource: [],
            total: 100,
        }
    }


    // 渲染前， 获取数据
    componentDidMount() {
        // 通过 "/billPhone" 来获取对应页面的数据
        getTopics("/bill-phone").then(response => {
            this.setState(
                {
                    dataSource: response.result.list,
                    total: response.result.total
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
                    <CreateButton columns={this.state.columns} address={"/bill-phone"}/>
                    <ExcelSimpleExportButton dataSource={this.state.dataSource} entozh={this.state.entozh}/>

                </ButtonGroup>
            }>
                <Table
                    className="components-table-demo-nested"
                    columns={this.state.columns}
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