import React from "react";
import { Link } from "react-router-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Security from "@material-ui/icons/Security";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class SOSPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        {/* <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Let's talk product</h2>
            <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5>
          </GridItem>
        </GridContainer> */}
        <div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
            <Link to={"/login-page"} style={{ textDecoration: 'none'}} >
              <InfoArea
                title="SOS Services"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Security}
                iconColor="info"
                vertical
              />
            </Link>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            <Link to={"/incidentregistration-page"} style={{ textDecoration: 'none'}} >
              <InfoArea
                title="Register Non SOS Incident"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </Link>
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Log Incident"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem> */}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(SOSPage);
