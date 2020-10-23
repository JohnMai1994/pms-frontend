// 应该存在两类路由
// 1. 公共的(Login, NotFound) 2. 私有的(dashboard article setting)

import {
    Login,
    NotFound,
    CconestepEmail,
    Monitor,
    AllComputer,
    CurrentPhone,
    BillPhone,
    PasswordPhone,
    OtherEmail,
    CaseDepEmail,
    KaiyaoEmail
} from "../views";

const commentRoutes = [
    {
        pathname: '/login',
        component: Login,
    },
    {
        pathname: '/404',
        component: NotFound,
    }

]

// 加上一个前缀 /admin

const privateRoutes = [
// 邮箱
    {
        pathname: '/admin/email',
        isShow: true,
        key: "email",
        title: "Email邮件",
        children: [
            // cconestep 邮箱
            {
                pathname: "/admin/email/cconestepEmail",
                component: CconestepEmail,
                title: "cconestep加合移民邮箱",
            },
            // kaiyao 邮箱
            {
                pathname: "/admin/email/kaiyaoEmail",
                component: KaiyaoEmail,
                title: "Kaiyao凯耀移民邮箱",
            },
            // 文案部门邮箱
            {
                pathname: "/admin/email/caseDepEmail",
                component: CaseDepEmail,
                title: "Case文案部邮箱",
            },
            // 其他邮箱
            {
                pathname: "/admin/email/otherEmail",
                component: OtherEmail,
                title: "其他邮箱",
            }
        ]

    },
// 电话
    {
        pathname: '/admin/phone',
        isShow: true,
        key: "phone",
        title: "Phone电话",
        children: [
            // 现在使用电话
            {
                pathname: "/admin/phone/currentPhone",
                component: CurrentPhone,
                title: "现在使用电话号码",
            },
            // 手机公司&计划&价格
            {
                pathname: "/admin/phone/billPhone",
                component: BillPhone,
                title: "手机公司&计划&价格",
            },
            // 手机密码：（登录密码，icloud密码，VoiceMail）
            {
                pathname: "/admin/phone/passwordPhone",
                component: PasswordPhone,
                title: "手机密码",
            }

        ]
    },
// 电脑设备
    {
        pathname: '/admin/Computer',
        isShow: true,
        key: "computerEquipment",
        title: "Computer电脑设备",
        children: [
            // 电脑设备
            {
                pathname: "/admin/computer/allComputer",
                component: AllComputer,
                title: "电脑设备",
            }

        ]
    },
// 其他账号
    {
        pathname: '/admin/otherAccount',
        isShow: true,
        key: "otherAccount",
        title: "Other其他",
        children: [
            // 监控
            {
                pathname: "/admin/other/monitor",
                component: Monitor,
                title: "监控",
            }

        ]
    }
]


export {
    commentRoutes,
    privateRoutes
}