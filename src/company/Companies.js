import React, {useEffect, useState} from "react";
import JoblyApi from "../Api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../common-misc/SearchForm";
import { v4 as uuidv4 } from 'uuid';

/** Returns the list of all companies as basic cards as well as a
 * search bar to search for companies.
 */
function Companies() {
  console.debug("CHECKPOINT COMPANY LIST")
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState({});

  useEffect(() => {
    async function getComps() {
      const compsData = await JoblyApi.getCompanies()
      setCompanies(compsData)
      setIsLoading(false);
    }
    getComps();
  }, []);
  
  //When the search button is clicked new companies are set and displayed
  async function search(searchTerm) {
    let companies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(companies);
  }

  let companyList = [];
  companyList = companies.map(comp => <CompanyCard
    key={uuidv4()}
    handle={comp.handle}
    logoUrl={comp.logoUrl}
    name={comp.name}
    description={comp.description}  
  />)

  if (isLoading) {
    companyList = <p>Loading &hellip;</p>;
  }
  return (
    <div className="Companies">
      <div>
        <SearchForm searchFor={search}/>
      </div>
      <div>
        {companyList}
      </div>
    </div>
  );
}

export default Companies;