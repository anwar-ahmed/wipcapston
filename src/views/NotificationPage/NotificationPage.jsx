import React from "react";
import axios from "axios";
// react plugin for creating date-time-picker

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import NotificationCard from "./NotificationCard"
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";

var _notificationUrl = 'http://localhost:3000/notification'



function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NotificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open:true,
      paramtype: this.props.match.params.id,
      notificationList:[]
    };
  }


  handleOpen() {
    this.setState({
        open:true
    });
  }
  handleClose() {
    this.setState({
        open:false
    });
  }

  componentDidMount = () => {
    axios.get(_notificationUrl)
    .then( response => {
        this.setState({
                notificationList:response.data.data      
        })

        console.log(this.state.Users);
    }
    )
    .catch(error => { throw error});
  }

  render() {

   const { classes } = this.props;

    let renderAllNotification = this.state.notificationList.filter(value => value.type === this.props.match.params.type).map((_notification, index) => {
      return < NotificationCard key={index} notification={_notification} />;
    })
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={4}>
                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose()}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => this.handleClose()}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                {renderAllNotification}
                </GridItem>
              </GridContainer>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button
                        onClick={() => this.handleClose()}
                        color="danger"
                        simple
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </GridItem>
              </GridContainer>
              </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(javascriptStyles)(NotificationPage);
