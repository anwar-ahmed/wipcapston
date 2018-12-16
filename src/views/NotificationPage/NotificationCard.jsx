import React from "react";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import notificationCardStyle from "assets/jss/material-kit-react/views/notificationPage/notificationCardStyle.jsx";


class NotificationCard extends React.Component {
  render() {

    const { classes } = this.props;
    return (

                 <Card className={classes.card}>
                     <CardHeader>
                       <p className={classes.description}>Notification Date: {this.props.notification.opened}</p>
                     </CardHeader>
                    <CardBody>
                      <p className={classes.description}>Update: {this.props.notification.message}</p>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        // onClick={() => this.handleClose()}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>

                    </CardFooter>
                </Card>              

    );
  }
}
export default withStyles(notificationCardStyle)(NotificationCard);
