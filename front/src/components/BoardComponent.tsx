import React from 'react'
import {Breadcrumb, Icon, Layout, Menu} from "antd";
import {Route, Switch} from "react-router";
import browserHistory from '../browserHistory'
import FeatureEditComponent from "./feature/FeatureEditComponent";
import FeatureListComponent from "./feature/FeatureListComponent";


let menuInfoArray = [
    {
        title: '风控规则',
        key: 'frequency',
        iconType: 'mail',
        defaultOpen: true,
        items: [
            {
                title: '特征管理',
                path: '/p/feature/list',
                component: FeatureListComponent,
                references: [
                    {
                        path: '/p/feature/add', component: FeatureEditComponent
                    },
                    {
                        path: '/p/feature/edit/:id', component: FeatureEditComponent
                    }
                ]
            }
        ]
    },
    /*
    {
        title: '服务告警',
        key: 'report',
        iconType: 'mail',
        items: [

        ]
    }
    */
]
let defaultOpenKeys: any[] = []
let menuComponents = Array()
for (let menuInfo of menuInfoArray) {
    if (menuInfo.defaultOpen) {
        defaultOpenKeys.push(menuInfo.key)
    }
    for (let menuItem of menuInfo.items) {
        menuComponents.push({
            path: menuItem.path,
            component: menuItem.component
        })
        if (menuItem.references) {
            for (let reference of menuItem.references) {
                menuComponents.push({
                    path: reference.path,
                    component: reference.component
                })
            }
        }
    }
}
let menuBreadCrumbs = {}
for (let menuInfo of menuInfoArray) {
    for (let menuItem of menuInfo.items) {
        menuBreadCrumbs[menuItem.path] = ['首页', menuInfo.title, menuItem.title]
    }
}

export default class BoardComponent extends React.Component<any, {activeMenuKey: string}> {

    state = {
        activeMenuKey: browserHistory.location.pathname
    }

    menuOnSelect(options: {key: string}) {
        browserHistory.push(options.key)
    }

    render() {
        return (
            <Layout>
                <Menu mode="horizontal"
                        style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Menu.SubMenu title={<span><Icon type="setting" />设置</span>}>
                        <Menu.Item key="setting:1">退出</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
                <Layout>
                    <Layout.Sider width={200}>
                        <Menu mode="inline"
                                theme="dark"
                                defaultOpenKeys={defaultOpenKeys}
                                // selectedKeys={[this.state.activeMenuKey]}
                                onSelect={this.menuOnSelect.bind(this)}>
                            {
                                menuInfoArray.map(menuInfo => {
                                    return (
                                        <Menu.SubMenu key={menuInfo.key} title={<span><Icon type={menuInfo.iconType} /><span>{menuInfo.title}</span></span>}>
                                            {
                                                menuInfo.items.map(menuItem => {
                                                    return (<Menu.Item key={menuItem.path}>{menuItem.title}</Menu.Item>)
                                                })
                                            }
                                        </Menu.SubMenu>
                                    )
                                })
                            }

                        </Menu>
                    </Layout.Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                (menuBreadCrumbs[this.state.activeMenuKey] || ['首页']).map((breadCrumbName: any) => {
                                    return (<Breadcrumb.Item key={breadCrumbName}>{breadCrumbName}</Breadcrumb.Item>)
                                })
                            }
                        </Breadcrumb>
                        <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Switch>
                                {
                                    menuComponents.map(menuComponent => {
                                        return (<Route key={menuComponent.path} path={menuComponent.path} component={menuComponent.component}/>)
                                    })
                                }
                            </Switch>
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}