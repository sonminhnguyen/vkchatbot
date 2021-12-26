import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Profile from '../components/profile'
import MessageForm from '../components/messageForm';
import User from '../components/users'
import Upload from '../components/upload'
import Header from '../components/header'

export let history = createBrowserHistory();

const AppRouter = ({ user, handeLogOut  }) => {
    return (
        <Router history={history}>
            <Header user={user} handeLogOut={handeLogOut} history={history}/>

            <Switch>
                <Route exact path="/" >
                    <MessageForm user={user.user}/>
                </Route>
                <Route exact path="/profile">
                    <Profile user={user.user} />
                </Route>
                <Route exact path="/upload">
                    <Upload  />
                </Route>
                {user.user.admin? 
                    <Route exact path="/users" >
                        <User />
                    </Route>
                : ""
                }

            </Switch>
        </Router>
    )
}

export default AppRouter;