import React, {Component} from 'react';
import {Button, Card, Form, Input, Modal, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";
import XLSX from "xlsx";
import CreateButton from "../../../components/CreateButton";
import ExcelSimpleExportButton from "../../../components/ExcelExportButton/simpleExcel";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";

class OtherEmail extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            entozh: {
                "key": "编号",
                "name": "姓名",
                "email": "邮箱",
            },
            // 表结构
            columns: [
                {
                    title: 'Name姓名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Email邮箱',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: 'Password密码',
                    dataIndex: 'password',
                    key: 'password',
                },
                {
                    title: 'Action操作',
                    key: 'operation',
                    render: (text, record) => {
                        return (
                            <ButtonGroup>
                                <EditButton record={record} address={"/other-email"}/>
                                <DeleteButton record={record} address={"/other-email"}/>
                            </ButtonGroup>
                        )
                    }

                }
            ],
            // 获取到的数据
            dataSource: [],
            total: 100,
            isLoading: false
        }
    }

    // 渲染前， 获取数据
    componentDidMount() {
        this.setState({isLoading: true})
        // 通过 "/cconestepEmail" 来获取对应页面的数据
        getTopics("/other-email").then(response => {
            this.setState(
                {
                    dataSource: response.result.list,
                    total: response.result.total
                }
            )
        }).catch(error => {
            throw error
        }).finally(() => {
            this.setState({isLoading: false})
        })
    }

    render() {
        return (
            <Card title="OTHER其他邮箱"
                  extra={
                      <ButtonGroup>
                          <CreateButton columns={this.state.columns} address={"/other-email"}/>
                          <ExcelSimpleExportButton dataSource={this.state.dataSource} entozh={this.state.entozh}/>
                      </ButtonGroup>
                  }>
                <Table
                    loading={this.state.isLoading}
                    // 使用表
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
            </Card>
        );
    }
}

export default OtherEmail;