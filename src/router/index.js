import manager from '../views/manager/manager.vue'
import Data from '../views/manager/data'
import Log from '../views/manager/log'
import managerUser from '../views/manager/user'

import User from '../views/index.vue'
import Navigation from '../views/navigation.vue'
import Empty from '../views/empty.vue'

import analysis from "../views/analysis";
import mapMarket from "../views/mapMarket";

import secIndex from '../views/secondIndex.vue'
import Paper from '../views/academia/paper/paper.vue'
import Journal from '../views/academia/journal/journal.vue'
import Lecture from '../views/academia/lecture/lecture.vue'

import spaceData from '../views/spacedata.vue'
import onlineAnalysis from '../views/onlineAnalysis/onlineAnalysis.vue'
import webTool from '../views/webTool.vue'
import teaminfo from '../views/about/teamInfo.vue'
import datainfo from '../views/about/dataInfo.vue'

import Markdown from "../views/education/markdown/markdown.vue"
import CodeOnline from '../views/education/codeonline/codeOnline.vue'
import Jupyter from '../views/education/jupyter/jupyter.vue'
import eduCases from "../views/education/eduCases.vue";

export const userRouters = [
    {
        meta: {
            title:'首页',
            title2:'HOME'
        },
        path: '/index',
        name: 'index',
        component: Navigation,
        iconCls: 'el-icon-message',
    },
    {
        meta: {
            title: '学术资源',
            title2: 'RESOURCES'
        },
        path: '/academia',
        redirect: '/academia/paper',
        name: 'academia',
        component: secIndex,
        iconCls: 'el-icon-message',
        children:[
            {
                meta: {
                    title: '学位论文',
                    title2:'PAPER'
                },
                path: '/academia/paper',
                component: Paper,
                name: 'paper',
                iconCls: 'el-icon-message',
            },
            {
                meta: {
                    title: '专业期刊',
                    title2:'JOURNAL'
                },
                path: '/academia/journal',
                component: Journal,
                name: 'journal',
                iconCls: 'el-icon-message',
            },
            {
                meta: {
                    title: '讲座信息',
                    title2:'LECTURE'
                },
                path: '/academia/lecture',
                component: Lecture,
                name: 'lecture',
                iconCls: 'el-icon-message',
            }
        ],
    },
    {
        meta: {
            title: '空间数据',
            title2:'SPACE DATA'
        },
        path: '/spaceData',
        component: spaceData,
        name: 'spaceData',
        iconCls: 'el-icon-message',
    },
    {
        meta: {
            title: '常用工具',
            title2:'WEB TOOL'
        },
        path: '/webTool',
        component: webTool,
        name: 'webTool',
        iconCls: 'el-icon-message',
    },
    {
        meta: {
            title: '地图集市',
            title2:'MAP MARKET'
        },
        path: '/mapMarket',
        component: mapMarket,
        name: 'mapMarket',
        iconCls: 'el-icon-message',
    },
    {
        meta: {
            title: '在线分析',
            title2: 'ONLINE ANALYSIS'
        },
        path: '/onlineAnalysis',
        component: onlineAnalysis,
        name: 'onlineAnalysis',
        iconCls: 'el-icon-message',
    },
    {
        meta: {
            title: '教学案例',
            title2:'EDU CASE'
        },
        path: '/eduCases',
        redirect: '/eduCase/market',
        name: 'eduCases',
        component:secIndex,
        iconCls: 'el-icon-message',
        children: [
            {
                meta: {
                    title: '案例仓库',
                    title2: 'EDU MARKET'
                },
                path: '/eduCase/market',
                component: eduCases,
                name: 'eduCases',
                iconCls: 'el-icon-message',
            },
            {
                meta: {
                    title: '标记语言',
                    title2: 'MARKDOWN'
                },
                path: '/eduCase/markdown',
                component: Markdown,
                name: 'markdown',
                iconCls: 'el-icon-message',
            },
            {
                meta: {
                    title: '在线编译',
                    title2: 'CODE ONLINE'
                },
                path: '/eduCase/codeOnline',
                component: CodeOnline,
                name: 'codeOnline',
                iconCls: 'el-icon-message',
            },
            {
                meta: {
                    title: '交互式笔记本',
                    title2: 'JUPYTER'
                },
                path: '/eduCase/jupyter',
                component: Jupyter,
                name: 'jupyter',
                iconCls: 'el-icon-message',
            }
        ]
    },
    {
        meta: {
            title: '分析平台',
            title2:'PLATFORM'
        },
        path: '/platform',
        component: analysis,
        name: 'platform',
        iconCls: 'el-icon-message',
    },
    {
        meta: {
            title: '关于',
            title2:'ABOUT'
        },
        path: '/about',
        redirect:'/about/teamInfo',
        component: secIndex,
        name: 'about',
        iconCls: 'el-icon-message',
        children: [
            {
                meta: {
                    title: '团队介绍',
                    title2:'TEAM INFO'
                },
                path: '/about/teamInfo',
                component: teaminfo,
                name: 'teamInfo',
                iconCls: 'el-icon-message',
            },
            {
                meta: {
                    title: '数据声明',
                    title2:'Data INFO'
                },
                path: '/about/dataInfo',
                component: datainfo,
                name: 'dataInfo',
                iconCls: 'el-icon-message',
            }
        ]
    }
];

export const userRouter = {
    path: '/',
    redirect: '/index',
    name: 'index',
    meta: {
        title: '首页',
        title2:'HOME'
    },
    component: User,
    children: userRouters
};

export const backRouter= [
    {
        path: '/manager/data',
        name: 'data',
        meta: {
            title: '管理系统',
            title2:'HOME'
        },
        icon: 'fa fa-user-circle-o fa-lg',
        component: Data,
    },
    {
        path: '/manager/log',
        name: 'log',
        meta: {
            title: '日志',
            title2:'LOG'
        },
        icon: 'fa fa-user-circle-o fa-lg',
        component: Log,
    },
    {
        path: '/manager/user',
        name: 'user',
        meta: {
            title: '用户管理',
            title2:'USER'
        },
        icon: 'fa fa-user-circle-o fa-lg',
        component: managerUser,
    },
];

export const managerRouter = {
        path: '/manager/manager',
        redirect:'/manager/data' ,
        name: 'manager',
        meta: {
            title: '管理系统',
            title2:'HOME'
        },
        icon: 'fa fa-user-circle-o fa-lg',
        component:manager,
        children: backRouter
    }
;


export const routers = [
    userRouter,//除个人中心外所有
    managerRouter,
];
