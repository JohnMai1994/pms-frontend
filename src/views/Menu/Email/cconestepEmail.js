import React, {Component} from 'react';
import {Space, Form, Card, Button, Table, Modal, Input} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons"
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api"


const editContent = (record) => {

    const emailList = [];
    record.childrenEmail.map((data) => {
        emailList.push(data.childEmail)
    })

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 12},
    };

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 20},
        },
    };

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 20, offset: 8},
        },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const submitHandle = (e) => {
        console.log(e)

    }

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{childrenEmail: emailList}}
            onSubmitCapture={submitHandle}
        >

            {/* 编号*/}
            <Form.Item
                label="key"
                name="key"
                initialValue={record.key}
            >
                <Input disabled={true} defaultValue={record.key}/>
            </Form.Item>

            {/* 姓名 */}
            <Form.Item
                label="name"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
                initialValue={record.name}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="parentEmail"
                name={"parentEmail"}
                rules={[{required: true, message: '请填入您的主邮箱!'}]}
                initialValue={record.parentEmail}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="password"
                name={"password"}
                rules={[{required: true, message: '请填入您的主邮箱密码!'}]}
                initialValue={record.password}
            >
                <Input/>
            </Form.Item>

            {/* 次邮箱 */}
            <Form.List name="childrenEmail">

                {(fields, {add, remove}, {errors}) => (
                    <>

                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Children Email' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Email" style={{width: '75%'}}/>
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        style={{marginLeft: "30px"}}
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}


                        <Button
                            type="dashed"
                            onClick={() => {
                                add("", 0);
                            }}
                            style={{width: '100%'}}
                            icon={<PlusOutlined/>}
                        >
                            Add New Child Email
                        </Button>
                    </>
                )}
            </Form.List>

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                Submit
            </Button>


        </Form>
    )

}

class CconestepEmail extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            parentColumns: [
                {
                    title: 'Name姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'ParentEmail主邮箱',
                    dataIndex: 'parentEmail',
                    key: 'parentEmail'
                },
                {
                    title: 'Password密码',
                    dataIndex: 'password',
                    key: 'password'
                },
                {
                    title: 'Action操作',
                    key: 'operation',
                    render: (record) => {
                        return (
                            <ButtonGroup>
                                <Button size={"small"} type="primary"
                                        onClick={this.editHandler.bind(this, record)}>修改</Button>
                                <Button size={"small"} type="danger"
                                        onClick={this.delHandler.bind(this, record)}>删除</Button>
                            </ButtonGroup>
                        )
                    }

                },
            ],
            childColumns: [
                {
                    title: 'Id编号',
                    dataIndex: 'key',
                    key: 'key'
                },
                {
                    title: 'ChildEmail子邮箱',
                    dataIndex: 'childEmail',
                    key: 'childEmail'
                },
                {
                    title: 'Platform所属平台',
                    dataIndex: 'platform',
                    key: 'platform'
                },
            ],
            dataSource: [],
            total: 100,
        }
    }


    editHandler = (record) => {
        // console.log(record);

        Modal.info({
            title: "Update更新",
            content: editContent(record),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onCancel: () => {
                console.log("用户取消操作")
            },
            onOk: () => {
                console.log("用户确认操作", record.key)
                // 发送异步请求，通过接口把当前的这条记录删除调用

            }
        })

    }

    delHandler = (record) => {

        Modal.confirm({
            title: "Delete删除",
            content: "是否要删除当前数据？此操作不可逆！",
            onCancel: () => {
                console.log("用户取消操作")
            },
            onOk: () => {
                console.log("用户确认操作", record.key)
                // 发送异步请求，通过接口把当前的这条记录删除调用

            }


        })


    }

    expandedRowRender = (data) => {
        return <Table columns={this.state.childColumns} dataSource={data.childrenEmail} pagination={false}/>;
    };

    // 渲染前， 获取数据
    componentDidMount() {
        // 通过 "/cconestepEmail" 来获取对应页面的数据
        getTopics("/cconestepEmail").then(response => {
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
            <Card title="CCONESTEP加合移民公司" extra={
                <ButtonGroup>
                    <Button size={"small"} type="text" danger>新增</Button>
                    <Button size={"small"} type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>
                {/*将this.state传递数据*/}
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

export default CconestepEmail;