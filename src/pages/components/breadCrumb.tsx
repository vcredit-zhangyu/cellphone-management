/*
 * @Author: waghao10
 * @Date: 2023-06-12 16:25:43
 * @Description: 
 */
import { NavLink } from 'umi'
import { Breadcrumb } from 'antd'
import { v4 as uuidv4 } from 'uuid'
const Breadcrumbs = ({ routes, pageType }: any) => {
  // 如果没有设置breadcrumb默认不渲染
  // 如果存在pageType,说明存在三级路由
  const config: any = {
    detail: '查看',
    edit: '编辑',
    add:'新增'
  }
  if (pageType && routes[routes.length - 1].route.parent) {
    const addRoute = {
      pathname: routes[routes.length - 1].route.parent?.pathname,
      route: {
        id: uuidv4(),
        breadcrumb: routes[routes.length - 1].route.parent?.title,
      }
    }
    routes.splice(1, 0, addRoute)
    routes[routes.length - 1].route.breadcrumb = config[pageType]
    routes[routes.length - 1].pathname = ''
  }
  const breadList = routes.filter((s: any) => s.route.breadcrumb !== '').map((v: any) => {
    return {
      title: v?.pathname ? <NavLink to={v?.pathname} key={v.route.id}>{v.route.breadcrumb}</NavLink> : <span>{v.route.breadcrumb}</span>
    }
  })
  return (
    <Breadcrumb items={breadList} />
  )
}

export default Breadcrumbs