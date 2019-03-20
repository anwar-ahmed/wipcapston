import React from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Add from "@material-ui/icons/Add";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import { createBrowserHistory } from 'history';




import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
const history = createBrowserHistory({forceRefresh:true});
var _nonsosUrl = "http://localhost:3000/nonsosservices/";
var _sosUrl = "http://localhost:3000/sosservices/";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nonsosname: '',
      sostitle:'',
      description:'',
      img:'',
      email:'',
      number:'',
      twitter:'',
      open:false
    }
  }

  handleSnkClick = () => {
    this.setState({ open: true});
  };

  handleSnkClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillMount() {
    if(sessionStorage.getItem('username') != 'Administrator') {
      history.push('/adminlogin-page')
    }
  }


  handleSubmitnonSOS =(event) => {
    event.preventDefault();
    axios.post(_nonsosUrl, {
      name:this.state.nonsosname,
    })
    .then( response => {
      if( response.data.success === true) {
        this.handleSnkClick();
}
    })
    .catch(function (error) {
    });
  }
  handleSubmitSOS =(event) => {
    event.preventDefault();
    axios.post(_sosUrl, {
      title:this.state.sostitle,
      description:this.state.description,
      img:this.state.img,
      email:this.state.email,
      number:this.state.number,
      twitter:this.state.twitter
    })
    .then(response => {
      if( response.data.success === true) {
        this.handleSnkClick();
      }
    })
    .catch(function (error) {
    });
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="dark"
          brand="EISM"
          rightLinks={<HeaderLinks adminusermenu="true" sessionName={sessionStorage.getItem('username')}/>}
          fixed
          {...rest}
        />
        <div >
          <div>
            <div className={classes.container}>
              <div className={classes.description}>
                <p>
                    Create SOS Services and Non SOS Services
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "SOS Service",
                        tabIcon: Add,
                        tabContent: (
                          <GridContainer justify="center">

                          
                          <GridItem xs={12} sm={12} md={4}>
                            <form className={classes.form} onSubmit={this.handleSubmitSOS}>
                      <CustomInput
                        labelText="Name of SOS Service"
                        id="sostitle"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.sostitle,
                          onChange: this.handleChange('sostitle'),
                          required:"true"                        }}
                      />
                                            <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.description,
                          onChange: this.handleChange('description'),
                          required:"true"                        }}
                      />
                                                                  <CustomInput
                        labelText="Image Detail"
                        id="img"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.img,
                          onChange: this.handleChange('img'),
                          required:"true"                        }}
                      />
                                            <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.email,
                          onChange: this.handleChange('email'),
                          required:"true"                        }}
                      />
                                            <CustomInput
                        labelText="Phone Number"
                        id="number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.number,
                          onChange: this.handleChange('number'),
                          required:"true"                        }}
                      />
                                            <CustomInput
                        labelText="Twitter Id"
                        id="twitter"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.twitter,
                          onChange: this.handleChange('twitter'),
                          required:"true"                        }}
                      />

                                            <Button type="submit" simple color="primary" size="lg" value="Submit">
                        Submit
                      </Button>
                              </form>
                            </GridItem>

                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Non SOS Services",
                        tabIcon: Add,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                            <form className={classes.form} onSubmit={this.handleSubmitnonSOS}>
                      <CustomInput
                        labelText="Name of NON SOS Service"
                        id="nonsosname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.nonsosname,
                          onChange: this.handleChange('nonsosname'),
                          required:"true"                        }}
                      />
                                            <Button type="submit" simple color="primary" size="lg" value="Submit">
                        Submit
                      </Button>
                              </form>
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                  />

                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>

        <Footer  />
        <Snackbar
          open={this.state.open}
          onClose={this.handleSnkClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Sucessfully Created</span>}
        />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(AdminPage);
