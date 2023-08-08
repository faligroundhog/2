import { getData, postData } from './config.js'

export const toLogin = (params) => postData('/api/userlogin', params)
//菜单管理
export const getMenuList = () => getData('/api/menulist?istree=true')
export const addMenuList = (params) => postData('/api/menuadd', params)
export const editMenuList = (params) => postData('/api/menuedit', params)
export const delMenuList = (params) => postData('/api/menudelete', params)
export const getMenuDetail = (params) => getData('/api/menuinfo?id=' + params)
//角色管理
export const getRoleList = () => getData('/api/rolelist')
export const addRoleList = (params) => postData('/api/roleadd', params)
export const editRoleList = (params) => postData('/api/roleedit', params)
export const delRoleList = (params) => postData('/api/roledelete', params)
//管理员管理
export const getUserList = (params) => getData('/api/userlist', params)
export const getUserCount = (params) => getData('/api/usercount', params)
export const addUserList = (params) => postData('/api/useradd', params)
export const editUserList = (params) => postData('/api/useredit', params)
export const delUserList = (params) => postData('/api/userdelete', params)
//商品分类
export const getCateList = (params) => getData('/api/catelist', params)
export const addCateList = (params) => postData('/api/cateadd', params,true)
export const editCateList = (params) => postData('/api/cateedit', params,true)
export const delCateList = (params) => postData('/api/catedelete', params)
//商品规格
export const getSpecsList = (params) => getData('/api/specslist', params)
export const getSpecsCount = (params) => getData('/api/specscount', params)
export const addSpecsList = (params) => postData('/api/specsadd', params)
export const editSpecsList = (params) => postData('/api/specsedit', params)
export const delSpecsList = (params) => postData('/api/specsdelete', params)
//商品管理
export const getGoodsList = (params) => getData('/api/goodslist', params)
export const getGoodsCount = (params) => getData('/api/goodscount', params)
export const addGoodsList = (params) => postData('/api/goodsadd', params,true)
export const editGoodsList = (params) => postData('/api/goodsedit', params,true)
export const delGoodsList = (params) => postData('/api/goodsdelete', params)

//上传表格文件
export const exportExlsList=(params,fn)=>postData('/api/useradds',params,true,fn)