import React from "react";
import {Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

class sideLayout extends React.Component{

    constructor(props){
        super(props);

        this.handleClick= this.handleClick.bind(this);
    }

    handleClick= (e)=>{
        this.props.onSelectChange(e.key);
    }

    render(){
        return(
            <Sider>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
                    {
                        this.props.value.data.map((data)=>{
                            return(
                                <Menu.Item key={data.id}>
                                <Icon type={data.icon} />
                                <span>{data.name}</span>
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            </Sider>
        );
    }
}

export default sideLayout;