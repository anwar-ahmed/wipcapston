import React from "react";
// @material-ui/core components
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";



// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";

import ListIncidents from "./ListIncidents"

import incidentRegistrationPageStyle from "assets/jss/material-kit-react/views/incidentRegistrationPageStyle.jsx";


class ActionItemsPage extends React.Component {

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="dark"
          brand="ESIM"
          rightLinks={<HeaderLinks controlusermenu="true" sessionName={sessionStorage.getItem('username')} />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            // backgroundImage: "url(" + image + ")",
            // backgroundSize: "cover",
            // backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
              <Paper className={classes.root} elevation={1}>
              <ListIncidents/>
             </Paper>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(incidentRegistrationPageStyle)(ActionItemsPage);
