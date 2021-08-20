import { Link } from "react-router-dom";
import { Card, CardTitle, CardText } from "reactstrap";

import "./CompanyCard.css";

/** Renders a displays of the complete information for a 
 * single company.
 */
function CompanyCard({handle, logoUrl, name, description}) {
  return (
    <Link className="CompanyCard" to={`/companies/${handle}`}>
      <Card>
        <CardTitle>
          {name}
          {logoUrl && 
          <img class="CardImg" src={`${logoUrl}`} alt={name}/>}
        </CardTitle>
        <CardText>{description}</CardText>
      </Card>
    </Link>
  );
}

export default CompanyCard;