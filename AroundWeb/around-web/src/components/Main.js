//rsf快速创建函数
//跳转方式：1 history 2 <link> 3 <redirect>（强制跳转）
import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {
    const { isLoggedIn, handleLoggedIn } = props;
    //case1:already logged in, show home page
    //case2: has not logged in, show Login page
    const showLogin = () => {
        return isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />
        );
    };

    const showHome = () => {
        return isLoggedIn ? <Home /> : <Redirect to="/login" />;
    };
    //一个url对应一个component
    //switch匹配取其一，exact精确匹配
    //render={showLogin},放进去回调函数的本身而不是结果
    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showLogin} />
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                {/*根据函数判断是不是显示home，如果登录了显示，否则跳转到loggin*/}
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}

export default Main;
