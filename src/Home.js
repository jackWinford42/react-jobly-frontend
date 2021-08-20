import React, { useContext } from "react";
import UserContext from "./authentication/Context";
import "./Home.css";

/** Render the home page with either a greeting message for the current
 * user or a login and signup button.
 */
function Jobs() {
  const { currUser } = useContext(UserContext);
  return (
    <div className="greeting">
      <h1>Jobly</h1>
      <h5>All the jobs in one, convenient place.</h5>
      {(currUser) ? <h2>Welcome Back, {currUser.firstName} {currUser.lastName}!</h2> : 
      <p id="authButtons">
        <a className="btn btn-primary font-weight-bold mr-3" href="/login">Log in</a>
        <a className="btn btn-primary font-weight-bold" href="/sign-up">Sign up</a>
      </p>}
    </div>
  );
}

export default Jobs;