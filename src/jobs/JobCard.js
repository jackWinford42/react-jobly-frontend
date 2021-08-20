import React, { useContext, useState } from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import "./JobCard.css";
import UserContext from "../authentication/Context";

/** Renders a display of the basic information for a 
 * single job and a button with a function to apply to 
 * that job.
 */
function JobCard({id, title, salary, equity, company_handle, apply}) {

  const { appliedToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    setApplied(appliedToJob(id));
  }, [id, appliedToJob]);

  function doApply() {
    if (appliedToJob(id)) return;
    apply(id);
    setApplied(true);
  }

  return (
    <Card className="JobCard">
      <CardTitle>
        <h5>{title}</h5>
      </CardTitle>
      <CardText>
        <span>{company_handle}</span><br></br>
        <span>Salary: {salary}</span><br></br>
        <span>Equity: {equity}</span><br></br>
        <button onClick={doApply} disabled={applied} className="JobButton btn btn-danger font-weight-bold text-uppercase">
          {applied ? "APPLIED":"APPLY"}
        </button>
      </CardText>
    </Card>
  );
}

export default JobCard;