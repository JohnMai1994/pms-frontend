import React, {Component} from 'react';
import {Button, Card, Form, Input, Modal, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";
import XLSX from "xlsx";


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 12},
};

// 修改 弹出窗
const editContent = (record) => {

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
            onSubmitCapture={submitHandle}
        >

            {/* 编号*/}
            <Form.Item
                label="Key编号"
                name="key"
                initialValue={record.key}
            >
                <Input disabled={true}/>
            </Form.Item>

            {/* 姓名 */}
            <Form.Item
                label="Name姓名"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
                initialValue={record.name}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="Email邮件"
                name={"email"}
                rules={[{required: true, message: '请填入您的邮箱!'}]}
                initialValue={record.email}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="Password密码"
                name={"password"}
                rules={[{required: true, message: '请填入您的主邮箱密码!'}]}
                initialValue={record.password}
            >
                <Input/>
            </Form.Item>

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                提交
            </Button>
        </Form>
    )
}
// 新增 弹出窗
const createContent = () => {
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
            onSubmitCapture={submitHandle}
        >

            {/* 姓名 */}
            <Form.Item
                label="Name姓名"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="Email邮件"
                name={"parentEmail"}
                rules={[{required: true, message: '请填入您的主邮箱!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="Password密码"
                name={"password"}
                rules={[{required: true, message: '请填入您的主邮箱密码!'}]}
            >
                <Input/>
            </Form.Item>

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                提交
            </Button>

        </Form>
    )
}

class CasedepEmail extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
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
                        console.log(record)
                        return (
                            <ButtonGroup>
                                <Button size={"small"} type={"primary"}
                                        onClick={this.editHandler.bind(this, record)}>修改</Button>
                                <Button size={"small"} type={"danger"}
                                        onClick={this.delHandler.bind(this, record)}>删除</Button>
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

    // 点击 导出Excel文件
    xmlHandler = (e) => {
        const entozh = {
            "key": "编号",
            "name": "姓名",
            "email": "邮箱",
        }

        const nowdata = this.state.dataSource;


        const json = nowdata.map((item) => {
            return Object.keys(item).reduce((newData, key) => {
                if (key !== "password") {
                    const newKey = entozh[key] || key
                    newData[newKey] = item[key]
                }

                return newData
            }, {})
        });

        const sheet = XLSX.utils.json_to_sheet(json);

        this.openDownloadDialog(this.sheet2blob(sheet, undefined), `CASES文案邮件.xlsx`);

    }
    openDownloadDialog = (url, saveName) => {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    }
    sheet2blob = (sheet, sheetName) => {
        sheetName = sheetName || 'sheet1';
        var workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

        var wopts = {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }); // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        return blob;
    }
    // 点击 新增按钮 会触发此函数
    createHandler = () => {
        Modal.info({
            title: "Create新增",
            content: createContent(),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onOk: () => {
                console.log("用户取消操作")
            }
        })
    }
    // 点击 修改按钮 触发此函数
    editHandler = (record) => {
        Modal.info({
            title: "Update更新",
            content: editContent(record),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onOk: () => {
                console.log("用户取消操作", record.key)
            }
        })

    }
    // 点击 删除按钮 触发此函数
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


    // 渲染前， 获取数据
    componentDidMount() {
        this.setState({isLoading: true})
        // 通过 "/cconestepEmail" 来获取对应页面的数据
        getTopics("/restEmail").then(response => {
            this.setState(
                {
                    dataSource: response.result.list
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
            <Card title="CASES文案部邮箱"
                  extra={
                      <ButtonGroup>
                          <Button size={"small"} type="text" danger
                                  onClick={this.createHandler}>新增</Button>
                          <Button size={"small"} type="dashed" danger
                                  onClick={this.xmlHandler}>导出Excel</Button>
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

export default CasedepEmail;