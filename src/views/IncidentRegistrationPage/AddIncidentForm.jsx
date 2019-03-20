import React from "react";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { createBrowserHistory } from 'history';




import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

var _profileUrl ='http://localhost:3000/profile/'
var _incidentUrl = 'http://localhost:3000/incident'
const history = createBrowserHistory({forceRefresh:true});

class AddIncidentForm extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      emailId:'',
      incidentType:'',
      firstName:'',
      lastName:'',
      location:'',
      opened:'',
      description:'',
      open:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSnkClick = () => {
    this.setState({ open: true});
  };

  handleSnkClose = () => {
    this.setState({ open: false });
    history.goBack();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount = () => {
    axios.get(_profileUrl + sessionStorage.getItem('username'))
    .then( response => {
        console.log(response)
        this.setState({
                emailId:response.data.data.emailId,
                firstName:response.data.data.firstName,
                lastName:response.data.data.lastName,
                location:response.data.data.location,
                mobile:response.data.data.mobile          
        })

        console.log(this.state.Users);
    }
    )
    .catch(error => { throw error});
  }

  handleSubmit =(event) => {
    event.preventDefault();
    axios.post(_incidentUrl, {
      requestedby:this.state.firstName + ' ' + this.state.lastName ,
      emailId:this.state.emailId,
      type: this.state.incidentType,
      location:this.state.location,
      opened: this.state.opened,
      description: this.state.description
    })
    .then(response =>  {
      if( response.data.success === true) {
        this.handleSnkClick();
      }
    })
    .catch(error => { throw error});
}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Enter Non SOS Incident Details</h2>
            <h4 className={classes.description}>
            Please send us details about the incident you would like to report. 
            Our Complaint Center will analyze your complaint and take the 
            appropriate measures in order that the reported situation will not 
            occur at any other time in the future.
            </h4>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.firstName + ' ' + this.state.lastName
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
                      value: this.state.emailId
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Incident Type"
                    id="incidenttype"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.incidentType,
                      onChange: this.handleChange('incidentType'),
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
                    labelText="Date"
                    id="opened"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "date",
                      value: this.state.opened,
                      onChange: this.handleChange('opened'),
                    }}
                  />
                </GridItem>
                <CustomInput
                  labelText="Incident Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 3,
                    type: "text",
                    value: this.state.description,
                    onChange: this.handleChange('description'),
                  }}
                />
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.textCenter}
                  >
                    <Button type="submit" simple color="primary" value="Submit">Register Incident</Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
            <Snackbar
          open={this.state.open}
          onClose={this.handleSnkClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Sucessfully Created</span>}
        />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(AddIncidentForm);
