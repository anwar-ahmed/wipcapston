import React from "react";
import axios from 'axios';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from '@material-ui/core/Snackbar';
import { createBrowserHistory } from 'history';

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import { CssBaseline } from "@material-ui/core";

let _userUrl ='http://localhost:3000/profile/'
const history = createBrowserHistory({forceRefresh:true});

class ProfileForm extends React.Component {
   constructor (props) {
       super(props);
       this.state = {
        emailId:'',
        firstName:'',
        lastName:'',
        location:'',
        mobile:'',
        dob:'',
        open:false
       }
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleSnkClick = () => {
    this.setState({ open: true});
  };

  handleSnkClose = () => {
    this.setState({ open: false });
    //history.goBack();
  };

   handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit =(event) => {
    event.preventDefault();
    axios.put(_userUrl + sessionStorage.getItem('username'), {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      location:this.state.location,
      mobile:this.state.mobile,
      dob: this.state.dob
    })
    .then(response =>  {
      console.log(response);
      if( response.data.success === true) {
        this.handleSnkClick();
        console.log("inside");

      }
    })
    .catch(error => { throw error});
}


  componentDidMount = () => {
        axios.get(_userUrl + sessionStorage.getItem('username'))
        .then( response => {
            console.log(response)
            this.setState({
                    emailId:response.data.data.emailId,
                    firstName:response.data.data.firstName,
                    lastName:response.data.data.lastName,
                    location:response.data.data.location,
                    mobile:response.data.data.mobile,
                    dob:response.data.data.dob
                
            })

            console.log(this.state.Users);
        }
        )
        .catch(error => { throw error});


  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Update User Details</h2>
            <h4 className={classes.description}>
                    User can update his or her registered personal details here. Emailid cannot be changed once it 
                    registered.
            </h4>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="firstName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.firstName,
                      onChange: this.handleChange('firstName'),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="lastName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.lastName,
                      onChange: this.handleChange('lastName'),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    disabled
                    labelText="Email Id"
                    id="emailId"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                    
                      type: "email",
                    value: this.state.emailId,


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
                      value: this.state.location,
                      onChange: this.handleChange('location')
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mobile Number"
                    id="mobile"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.mobile,
                      onChange: this.handleChange('mobile'),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Date of Birth"
                    id="dob"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "date",
                      value: this.state.dob,
                      onChange: this.handleChange('dob'),
                    }}
                  />
                </GridItem>
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.textCenter}
                  >
                    <Button type="submit" simple color="primary" value="Submit">Update Profile</Button>
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
          message={<span id="message-id">Sucessfully Updated</span>}
        />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(ProfileForm);
