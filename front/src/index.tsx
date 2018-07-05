import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import {Spin} from "antd";
import BoardComponent from "./components/BoardComponent";
import {Route, Router, Switch} from "react-router";
import browserHistory from './browserHistory'
import LoginComponent from "./components/LoginComponent";
class IndexComponent extends React.Component<any, {preLoading: boolean}> {

    state = {
        preLoading: true
    }

    componentWillMount() {
        this.setState({
            preLoading: false
        })
    }

    render() {
        if (this.state.preLoading) {
            return (
                <div>
                    <Spin />
                </div>
            )
        }
        return (
            <Router history={browserHistory}>
                <Switch>'/p/frequency/rule/list'
                    <Route path="/p/login" component={LoginComponent} />
                    <Route path="/" component={BoardComponent} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<IndexComponent />, document.getElementById("app"))