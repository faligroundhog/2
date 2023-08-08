import {
    container,
    card,
    header,
    main,
    dropdown,
    dropdownMenu,
    dropdownItem,
    breadcrumb,
    breadcrumbItem,
    row,
    aside,
    submenu,
    menu,
    menuItemGroup,
    menuItem,
    badge,
    Form,
    formItem,
    Input,
    tree,
    Radio,
    Select,
    Cascader,
    option,
    Upload,
    Switch,
    Button,
    Table,
    col,
    tableColumn,
    pagination,
    popover,
    scrollbar,
    progress,
    dialog,
    MessageBox,
    Loading,
    Message,
    Notification,
    Tag,
    colorPicker,
    avatar
} from "element-ui"

const componentsArray = [
    container,
    card,
    header,
    dropdown,
    dropdownMenu,
    dropdownItem,
    breadcrumb,
    breadcrumbItem,
    row,
    main,
    aside,
    submenu,
    menu,
    menuItemGroup,
    menuItem,
    badge,
    Tag,
    Form,
    formItem,
    tree,
    Input,
    Radio,
    Select,
    Cascader,
    option,
    Upload,
    Switch,
    Button,
    Table,
    col,
    tableColumn,
    dialog,
    pagination,
    popover,
    scrollbar,
    progress,
    colorPicker,
    avatar
]

export default (vue) => {
    // 3.1循环注册组件
    componentsArray.forEach((item) => {
        vue.component(item.name, item)
    })
    // 3.2挂载api
    vue.prototype.$loading = Loading.service;
    vue.prototype.$msgbox = MessageBox;
    vue.prototype.$alert = MessageBox.alert;
    vue.prototype.$confirm = MessageBox.confirm;
    vue.prototype.$prompt = MessageBox.prompt;
    vue.prototype.$notify = Notification;
    vue.prototype.$message = Message;
}