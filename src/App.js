import React, {useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import Context from "./authentication/Context";
import Routes from "./Routes";
import './App.css';
import JoblyApi from "./Api";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currUser, setCurrUser] = useState(null);
  const [appliedIds, setAppliedIds] = useState(new Set([]));

  let initialToken = null;
  if (localStorage.getItem("token")) initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    async function getUser() {
      try {
        let { username } = jwt.decode(token);
        JoblyApi.token = token;
        const userData = await JoblyApi.getCurrUser(username);
        setCurrUser(userData);
        setAppliedIds(new Set(userData.applications));
      } catch (err) {
        console.error("App getUser: issue loading user", err);
        setCurrUser(null);
      }
    }
    setIsLoading(true);
    if (token) getUser();
    setIsLoading(false);
  }, [token]);

  async function signup(formData) {
    try {
      const returnedToken = await JoblyApi.signup(formData)
      setToken(returnedToken);
      localStorage.setItem("token", returnedToken);
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while signing up", errors);
      return {worked: false, errors};
    }
  }

  async function login(formData) {
    try {
      const returnedToken = await JoblyApi.login(formData)
      setToken(returnedToken);
      localStorage.setItem("token", returnedToken);
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while logging in", errors);
      return {worked: false, errors};
    }
  }

  async function editProfile(formData) {
    try {
      await JoblyApi.updateCurrUser(currUser.username, formData);
      const returnedToken = await JoblyApi.login({username: currUser.username, password: formData.password})
      setToken(returnedToken);
      localStorage.setItem("token", returnedToken);
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while editing your profile", errors);
      return {worked: false, errors};
    }
  }

  async function logout() {
    setCurrUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("appliedIds");
  }

  //searches the ids of jobs that have been applied to for a job id
  function appliedToJob(id) {
    return appliedIds.has(id);
  }

  async function apply(jobId) {
    try {
      if (appliedToJob(jobId)) return;
      await JoblyApi.apply(currUser.username, jobId);
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while applying to a job", errors);
      return {worked: false, errors};
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <div className="App">
      <Context.Provider value={{ currUser, setCurrUser, appliedToJob }}>
        <Routes logout={logout} login={login} signup={signup} 
        editProfile={editProfile} apply={apply}/>
      </Context.Provider>
    </div>
  );
}

export default App;
