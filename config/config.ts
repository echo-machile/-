import { defineConfig } from '@umijs/max';

import routes from './router'

export default defineConfig({
    antd: {},
    access: {
    },
    model: {},
    initialState: {},
    request: {
    },
    layout: {
        title: '图书管理系统',
        logo:'../public/images/7g.JPGE',
    },
    routes,
    npmClient: 'pnpm',

    proxy:{
        '/lib':{
            'target': "http://localhost:8090",
            'changeOrigin': true,
            'pathRewrite': { '^/lib' : '' },
        }
    }

});

