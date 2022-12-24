import React, {Component} from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Avatar, Dropdown, Layout, message} from 'antd';
import { get }from '../utils/request';
import {history} from 'umi';
class Right extends Component {

    render() {
        const onClick: MenuProps['onClick'] = async ({ key }) => {
            message.info(`Click on item ${key}`);
            if(key==='2'){
                let result :any= await get("/lib/logout");
                if(result.data.code === 200){
                    sessionStorage.clear();
                    history.push('/login');
                }
            }


        };
        const items: MenuProps['items'] = [
            {
                key: '1',
                label: (
                    <p >
                        个人中心
                    </p>
                )
            },{
                key: '2',
                label: (
                <p>
                    安全退出
                </p>
                )
                ,
            }]
        return (
            <div>
                <Layout>

                    <Dropdown menu={{ items ,onClick}}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Avatar size={40} icon={<UserOutlined />} />
                        </a>
                    </Dropdown>
                </Layout>

            </div>
        );
    }
}

export default Right;