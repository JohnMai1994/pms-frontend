import React, {Component} from 'react';
import {Button, Form, Input, message, Modal} from "antd"
import {create} from "../../api";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 12},
};

// 新增 弹出窗
const createContent = (columns, address) => {
    const onFinish = values => {
        let apiAddresss = `${address}`
        create(apiAddresss, values)
            .then(res => {
                message.success('新增数据成功！');
            })
            .catch(error => {

                message.error("需要联系John~")
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            {
                columns.map(item => {
                    if (item.key !== "operation"){
                        return (
                            <Form.Item label={item.title} name={item.key} rules={[{required: true, message: '请勿留空!'}]}>
                                <Input/>
                            </Form.Item>
                        )
                    }
                })
            }

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                提交
            </Button>

        </Form>
    )
}

class CreateButton extends Component {
    constructor(props) {
        super(props);

    }

    // 点击 新增按钮 会触发此函数
    createHandler = () => {
        Modal.info({
            title: "Create新增",
            content: createContent(this.props.columns, this.props.address),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onOk: () => {
                console.log("用户取消操作")
            }
        })
    }


    render() {
        return (
            <Button size={"small"} type="text" danger
                    onClick={this.createHandler.bind(this)}
            >
                新增
            </Button>
        );
    }
}

export default CreateButton;