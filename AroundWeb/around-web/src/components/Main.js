//rsf���ٴ�������
//��ת��ʽ��1 history 2 <link> 3 <redirect>��ǿ����ת��
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
    //һ��url��Ӧһ��component
    //switchƥ��ȡ��һ��exact��ȷƥ��
    //render={showLogin},�Ž�ȥ�ص������ı�������ǽ��
    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showLogin} />
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                {/*���ݺ����ж��ǲ�����ʾhome�������¼����ʾ��������ת��loggin*/}
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}

export default Main;
