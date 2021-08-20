import React, {useEffect, useState} from "react";
import JoblyApi from "../Api";
import JobCard from "./JobCard";
import { v4 as uuidv4 } from 'uuid';

/** Returns the list of all jobs as basic cards.
 */
function JobList({searchTerm, apply}) {
  console.debug("CHECKPOINT COMPANY LIST")
  const [isLoading, setIsLoading] = useState(true);
  const [JobsList, setJobsList] = useState({});

  useEffect(() => {
    async function getJobs() {
      const jobsData = (searchTerm) ? 
      await JoblyApi.getJobs(searchTerm) : await JoblyApi.getJobs();
      setJobsList(jobsData);
      setIsLoading(false);
    }
    getJobs();
  }, [searchTerm]);
  
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  let jobList = [];
  jobList = JobsList.map(job => <JobCard 
    key={uuidv4()}
    id={job.id}
    title={job.title}
    salary={job.salary}
    equity={job.equity}
    company_handle={job.companyName}
    apply={apply}
  />)
  return (
    <div className="JobList">
      {jobList}
    </div>
  );
}

export default JobList;