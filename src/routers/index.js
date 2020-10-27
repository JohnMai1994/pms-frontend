// 应该存在两类路由
// 1. 公共的(Login, NotFound) 2. 私有的(dashboard article setting)

import {
    Login,
    NotFound,
    CconestepEmail,
    Monitor,
    ComputerEquipment,
    OtherEquipment,
    CurrentPhone,
    BillPhone,
    PasswordPhone,
    OtherEmail,
    CaseDepEmail,
    KaiyaoEmail,
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
                title: "CCONESTEP加合移民",
                comment: "记录CCONESTEP加合移民公司：邮箱使用者，主邮箱，次邮箱，密码"
            },
            // kaiyao 邮箱
            {
                pathname: "/admin/email/kaiyaoEmail",
                component: KaiyaoEmail,
                title: "KAIYAO凯耀移民",
                comment: "记录KAIYAO凯耀移民公司：邮箱名字，邮箱，密码"
            },
            // 文案部门邮箱
            {
                pathname: "/admin/email/caseDepEmail",
                component: CaseDepEmail,
                title: "Case文案部邮箱",
                comment: "记录CASES文案部经常使用的邮箱：邮箱名字，邮箱，密码"
            },
            // 其他邮箱
            {
                pathname: "/admin/email/otherEmail",
                component: OtherEmail,
                title: "Other其他邮箱",
                comment: "其他无法归类or零散的邮箱：邮箱名字，邮箱，密码"
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
                title: "最新电话号码",
                comment: "公司员工正在使用的手机号码列表"
            },
            // 手机公司&计划&价格
            {
                pathname: "/admin/phone/billPhone",
                component: BillPhone,
                title: "手机公司&计划&价格",
                comment: "各个电话号码对应的手机公司&计划&价格"

            },
            // 手机密码：（登录密码，icloud密码，VoiceMail）
            {
                pathname: "/admin/phone/passwordPhone",
                component: PasswordPhone,
                title: "手机密码",
                comment: "与每台手机绑定的登录密码，icloud密码，VoiceMail密码"
            }

        ]
    },
// 电脑设备
    {
        pathname: '/admin/equipment',
        isShow: true,
        key: "equipment",
        title: "Equipment设备",
        children: [
            // 电脑设备
            {
                pathname: "/admin/equipment/computerEquipment",
                component: ComputerEquipment,
                title: "电脑设备",
                comment: "记录电脑设备使用者，系统，CPU，存储空间，RAM"
            },
            // 其他设备（打印机，投影仪，照相机，路由器）
            {
                pathname: "/admin/equipment/otherEquipment",
                component: OtherEquipment,
                title: "其他设备",
                comment: "记录其他电子设备的情况：打印机，投影仪，照相机，路由器"
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