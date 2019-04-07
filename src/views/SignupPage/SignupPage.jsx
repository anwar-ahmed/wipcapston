import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import envVar from "../../config.js"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Snackbar from '@material-ui/core/Snackbar';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Phone from "@material-ui/icons/Phone";
import Location from "@material-ui/icons/LocationOn";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";


// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";



import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

const history = createBrowserHistory({forceRefresh:true});

// var _userUrl = "http://localhost:3000/users/";

var _userUrl = envVar.API_URL + "/users/"

console.log(_userUrl)
// var _userUrl = "https://backendeim.herokuapp.com/users/";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      location:'',
      mobile:'',
      open: false,
      textMessage:''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }
  componentDidMount() {
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit =(event) => {
    event.preventDefault();
    axios.post(_userUrl + "signup", {
      username:this.state.emailId,
      password:this.state.password,
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      location:this.state.location,
      mobile:this.state.mobile
    })
    .then( (res)  => {
      console.log(res);

      this.setState({
        open: true,
        textMessage: res.data.status
      })

      if(res.data.status == 'signup success') {
        history.push('/login-page')
      }

    })
    .catch((error) => {
      console.log(error);
    });


    // handleClick = state => () => {
    //   this.setState({ open: true});
    // };
  
    // handleClose =  () => {
    //   this.setState({ open: false });
    // };

    
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="dark"
          brand="ESIM"
          rightLinks={<HeaderLinks loginasadminpage="true"/>}
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <p className={classes.divider}>SIGN UP</p>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="emailId"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          value: this.state.emailId,
                          onChange: this.handleChange('emailId'),
                          required:"true",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          value: this.state.password,
                          onChange: this.handleChange('password'),
                          required:"true",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="First Name..."
                        id="firstName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.firstName,
                          onChange: this.handleChange('firstName'),
                          required:"true",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Last Name..."
                        id="lastName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.lastName,
                          onChange: this.handleChange('lastName'),
                          required:"true",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Location..."
                        id="location"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.location,
                          onChange: this.handleChange('location'),
                          required:"true",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Location className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }} 
                      />
                      <CustomInput
                        labelText="Mobile Number..."
                        id="mobile"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: this.state.mobile,
                          onChange: this.handleChange('mobile'),
                          required:"true",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="primary" size="lg" value="Submit">
                        Submit
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.open}
            autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"><b>ALERT:</b> {this.state.textMessage} !</span>}
        />
              </GridItem>
            </GridContainer>

          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(loginPageStyle)(SignupPage));

