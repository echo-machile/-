// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

import {RunTimeLayoutConfig} from "@@/plugin-layout/types";
import {IconMap} from "antd/lib/result";
import Right from "@/layouts/rightRender";
import React, {lazy} from "react";

import Loadable from 'react-loadable';
import rou from '../config/router'
import Home from './pages/Home'

let extraRoutes;
let newRoutes :[] = [];

const lazyLoad = (moduleName: string) => {
    const Module = Loadable({
        loader: ()=>import(`${moduleName}`),
        loading({error}) {
            if (error) {
                console.log(error);
                return <div>Error!</div>;
            } else {
                return <div>Loading...</div>;
            }
    }
    });

    console.log("加载完成")
    return <Module />;
};

const menuToRoute = (menu,parentName)=>{

    if(menu.component){
        let route={
            name:menu.name,
            path: menu.path,
            meta:{
                parentName: parentName
            },
            redirect: menu.redirect,
            element: lazyLoad("./pages/"+menu.component),
            layout: menu.layout?false:true,
        }
        return route;
    }

}
export const patchClientRoutes = ({routes}) => {
    extraRoutes = JSON.parse(sessionStorage.getItem("menuList") as string);

    rou.map(m=>{
        if(m.component){
            let  route = menuToRoute(m,null);
            newRoutes.push(route);
        }

    })

    if(extraRoutes){
        extraRoutes.forEach(menu =>{
            console.log(menu.children);
            if(menu.children){
                menu.children.map((m)=>{
                    let  route = menuToRoute(m,menu.name);
                    newRoutes.push(route);

                })
            }
        })

        Object.assign(routes,newRoutes);
        console.log(routes);
    }

};





//菜单转成路由



export async function getInitialState(): Promise<{ name: string }> {
  return { name: '尘落' };
}

export const layout :RunTimeLayoutConfig = ( initialState ) =>  {
  return {
      rightRender: ()=>{
          return <Right />
      },
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
        request: () => {
            let paths: any;
            paths = JSON.parse(sessionStorage.getItem('menuList') as string);

            if(paths){
                return paths.map((item: any) => ({
                    name: item.name,
                    icon: item.icon && IconMap[item.icon as string],
                    path: item.path,
                    routes: item.children,
                }));
            }
            return [];

        },
    },

      avatarProps:{
          src: '../public/images/7g.jpeg',
          title: '七妮妮',
          size: 'small',
      },

      layout:"mix" ,
      menuFooterRender:()=>{
          return "© 2021 Made with love";
      }
      ,
      route: { newRoutes }


  };
};