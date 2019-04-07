import React from "react";
import axios from "axios";
import envVar from "../../config.js"
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
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { createBrowserHistory } from 'history';
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";

var _incidentUrl = envVar.API_URL +  '/incident/detail/'

var _notificationUrl = envVar.API_URL +  '/notification'

const history = createBrowserHistory({forceRefresh:true});
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class IncidentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      open: true,
      emailId:'',
      type:'',
      requestedby:'',
      location:'',
      opened:'',
      description:'',
      status:''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleOpen() {
    this.setState({
        open:true
    });
  }
  handleClose() {
    this.setState({
        open:false
    });
    history.push('/actionitems-page')
  }
  handleSubmit() {
    axios.post(_incidentUrl + this.props.match.params.id , {
      status:this.state.status
    })
    .then(response =>  {console.log(response);
    })
    .catch(error => { throw error});

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;

    axios.post(_notificationUrl , {
      type:"update",
      emailId:this.state.emailId,
      incidentId:this.props.match.params.id,
      opened:today,
      message: "status changed to :" + this.state.status


    })
    .then(response =>  {
      history.push('/actionitems-page')
    })
    .catch(error => { throw error});


    this.setState({
        open:false
    });
  }
  componentDidMount = () => {
    axios.get(_incidentUrl + this.props.match.params.id)
    .then( response => {
        this.setState({
                id:response.data.data._id,
                emailId:response.data.data.emailId,
                requestedby:response.data.data.requestedby,
                location:response.data.data.location,
                mobile:response.data.data.mobile,
                type:response.data.data.type,
                opened:response.data.data.opened,
                description:response.data.data.description,
                status:response.data.data.status
        })
    }
    )
    .catch(error => { throw error});
  }

  render() {

    const status = [
      {
        value: 'Closed',
        label: 'Closed',
      },
      {
        value: 'Not Valid Incident',
        label: 'Not Valid Incident',
      },
      {
        value: 'Delegated',
        label: 'Delegated',
      },
      {
        value: 'Open',
        label: 'Open',
      },
    ];

    const { classes } = this.props;
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
                      <h4 className={classes.modalTitle}>Incident Number : {this.state.id}</h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <form className={classes.form} >
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    disabled
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.requestedby,
                      readOnly: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Email"
                    id="emailid"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      value: this.state.emailId,
                      readOnly: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Incident Type"
                    id="type"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.type,
                      readOnly: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="location"
                    id="location"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.location
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Incident Description"
                  id="description"
                  variant="outlined"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rowsMax: 3,
                    type: "text",
                    value: this.state.description,
                    readOnly: true                 
                  }}
                />
                </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.status}
          onChange={this.handleChange('status')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select status"
        >
          {status.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          
        </TextField>


        </GridItem>

              </GridContainer>
            </form>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      <Button color="transparent" simple onClick={() => this.handleSubmit()}>
                        UPDATE STATUS
                      </Button>
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

export default withStyles(javascriptStyles)(IncidentDetail);
