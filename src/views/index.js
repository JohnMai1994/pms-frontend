import Loadable from 'react-loadable';
import Loading from "../components/Loading";

// 路由的懒加载

// 公开
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})


// 私人

// Email 邮箱
const CconestepEmail = Loadable({
    loader: () => import('./Menu/Email/cconestepEmail'),
    loading: Loading
})

const KaiyaoEmail = Loadable({
    loader: () => import('./Menu/Email/kaiyaoEmail'),
    loading: Loading
})

const CaseDepEmail = Loadable({
    loader: () => import('./Menu/Email/casedepEmail'),
    loading: Loading
})

const OtherEmail = Loadable({
    loader: () => import('./Menu/Email/otherEmail'),
    loading: Loading
})

// Phone 电话

const CurrentPhone = Loadable({
    loader: () => import('./Menu/Phone/currentPhone'),
    loading: Loading
})

const BillPhone = Loadable({
    loader: () => import('./Menu/Phone/billPhone'),
    loading: Loading
})

const PasswordPhone = Loadable({
    loader: () => import('./Menu/Phone/passwordPhone'),
    loading: Loading
})


// Equipment 设备

const ComputerEquipment = Loadable({
    loader: () => import('./Menu/Equipment/computerEquipment'),
    loading: Loading
})

const OtherEquipment = Loadable({
    loader: () => import('./Menu/Equipment/otherEquipment'),
    loading: Loading
})

// Other 其他账号

const Monitor = Loadable({
    loader: () => import('./Menu/Other/monitor'),
    loading: Loading
})


export {

// 公开
    Login,
    NotFound,
// 私人
    // 邮箱
    CconestepEmail,
    KaiyaoEmail,
    CaseDepEmail,
    OtherEmail,
    // 电话
    PasswordPhone,
    BillPhone,
    CurrentPhone,
    // 电脑
    ComputerEquipment,
    OtherEquipment,
    // 其他
    Monitor,
}