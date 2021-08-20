import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card, CardBody } from 'reactstrap';
import UserContext from "./authentication/Context";

/** Render and handle the submission of a form for editing a user's
 * profile information.
 */
function Profile({edit}) {
  const history = useHistory();
  const { currUser } = useContext(UserContext);
  console.debug("Profile form");

  const [formData, setFormData] = useState({
    password:"",
    firstName:currUser.firstName,
    lastName:currUser.lastName,
    email:currUser.email
  });
  const [errors, setErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await edit(formData)
    if (res.worked) history.push("/");
    else setErrors(res.errors);
  }

  /** Update form fields */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3><strong>Profile</strong></h3>
        <Card>
          <CardBody>
            <h5><strong>Username</strong></h5>
            <p>{currUser.username}</p>
            <form className="form-inline" onSubmit={handleSubmit}>
              <label><strong>First Name:</strong></label>
              <input
                  className="form-control form-control-md"
                  name="firstName"
                  placeholder="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
              />
              <label><strong>Last Name:</strong></label>
              <input
                  className="form-control form-control-md"
                  name="lastName"
                  placeholder="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
              />
              <label><strong>Email:</strong></label>
              <input
                  className="form-control form-control-md"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
              />
              <label><strong>Confirm password to make changes:</strong></label>
              <input
                  className="form-control form-control-md"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
              />
              <button type="submit" className="btn btn-lg btn-primary">
                Save Changes
              </button>
            </form>
          </CardBody>
        </Card>
        {errors.length > 0 && 
        errors.map(error => <Alert color="danger">{error}</Alert>)}
      </div>
  );
}

export default Profile;