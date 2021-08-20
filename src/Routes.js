import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Nav from "./common-misc/Nav";
import Companies from "./company/Companies";
import Company from "./company/CompanyDetail";
import Jobs from "./jobs/Jobs";
import LoginForm from "./authentication/loginForm";
import SignupForm from "./authentication/signupForm";
import Profile from "./Profile";
import UserContext from "./authentication/Context";

/** App servers as a router and parent function storing data on
 * snack and drinks. App also includes the addItem() callback function to 
 * add a snack or drink.
 */
function Routes({logout, login, signup, editProfile, apply}) {
  const { currUser } = useContext(UserContext);

  const privateRoutes = () => {
    return (
      <>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/companies">
            <Companies/>
          </Route>
          <Route path="/companies/:handle">
            <Company apply={apply}/>
          </Route>
          <Route exact path="/jobs">
            <Jobs apply={apply}/>
          </Route>
          <Route path="/profile">
            <Profile edit={editProfile}/>
          </Route>
          <Route>
            <p>Hmmm. I can't seem to find what you want.</p>
          </Route>
        </Switch>
      </>
    )
  }

  const unAuthedRoutes = () => {
    return (
      <>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <LoginForm login={login}/>
          </Route>
          <Route path="/sign-up">
            <SignupForm signup={signup}/>
          </Route>
          <Route>
            <p>Hmmm. I can't seem to find what you want. You may need to be authorized before visiting this page.</p>
          </Route>
        </Switch>
      </>
    )
  }
  return (
    <>
      <BrowserRouter>
        <Nav logout={logout}/>
        <main>
          {currUser ? privateRoutes():unAuthedRoutes()}
        </main>
      </BrowserRouter>
    </>
  );
}

export default Routes;