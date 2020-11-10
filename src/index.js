import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './Container';
// 1. 配置antd的中文环境，如果不想使用中文，可以改英文
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';


import "./css/index.less"

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Container/>
    </ConfigProvider>
    ,
    document.getElementById('root')
);

