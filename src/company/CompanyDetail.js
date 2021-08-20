import React, {useEffect, useState} from "react";
import {useParams } from "react-router-dom";
import JoblyApi from "../Api";
import JobCard from "../jobs/JobCard";
import { v4 as uuidv4 } from 'uuid';

/** Renders a display of the complete information for a 
 * single company along with the corresponding jobs for 
 * that company.
 */
function Company({ apply }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const {handle} = useParams();

  useEffect(() => {
    async function getComp() {
      const compData = await JoblyApi.getCompany(handle)
      setData(compData)
      setIsLoading(false);
    }
    getComp();
  }, [handle]);
  
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <>
      <h4>{data.name}</h4>
      <p>{data.description}</p>
      {data.jobs.map(job => <JobCard 
        key={uuidv4()}
        id={job.id}
        title={job.title}
        salary={job.salary}
        equity={job.equity}
        company_handle={handle}
        apply={apply}
      />)}
    </>
  );
}

export default Company;