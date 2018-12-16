import React from "react";
import { Link } from "react-router-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Security from "@material-ui/icons/Security";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardMedia from '@material-ui/core/CardMedia';

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

import image1 from "assets/img/sos.jpg";
import image2 from "assets/img/incident.png";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
            <Card>
              {/* <CardMedia 
                        className={classes.media}
                        image={image1}
                        title="Sos">
              </CardMedia> */}
              <CardBody>
            <Link to={"/SOS-page"} style={{ textDecoration: 'none'}} >
              <InfoArea
                title="SOS"
                icon={Security}
                iconColor="success"
                vertical
              />
            </Link>
            </CardBody>
            </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            <Card>

              <CardBody>
            <Link to={"/incidentregistration-page"} style={{ textDecoration: 'none'}} >
              <InfoArea
                title="Report Non SOS Incident"
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </Link>
            </CardBody>
            </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
