import React, { useState } from "react";
import SearchForm from "../common-misc/SearchForm";
import JobList from "./JobList";

/** Render the search bar and the list of jobs
 */
function Jobs({apply}) {
  const [searchTerm, setSearchTerm] = useState("");

  const search = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  return (
    <>
      <div>
        <SearchForm searchFor={search}/>
      </div>
      <div>
        <JobList searchTerm={searchTerm} apply={apply}/>
      </div>
    </>
  );
}

export default Jobs;