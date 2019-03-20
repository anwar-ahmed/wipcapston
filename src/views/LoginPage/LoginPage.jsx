import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";


var _userUrl = "http://localhost:3000/users/";

const history = createBrowserHistory({forceRefresh:true});


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      emailId:'',
      password:'',
      textMessage:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit =(event) => {
    event.preventDefault();
    axios.post(_userUrl + "login", {
      username:this.state.emailId,
      password:this.state.password
    })
    .then( (res) => {

      if(res.data.message == 'Valid User') {
      sessionStorage.setItem('username', res.data.user.emailId);
      if (sessionStorage.getItem('username') == 'securitycontrol@esim.com') {
      history.push('/actionitems-page')
      } else {
      history.push('/landing-page')
      }
    }
      this.setState({
        textMessage:res.data.message
      })
      
        
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="dark"    
          brand="ESIM"
          rightLinks={<HeaderLinks loginpage="true"/>}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login ESIM with</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="http://localhost:3000/users/auth/facebook"
                          target="_self"
                          color="transparent"   
                          // onClick={this.handleOauth}
                        >
                          <i className={"fab fa-facebook"} />
                          
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Or with personal email id</p>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="email"
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
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
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
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="primary" size="lg" value="Submit">
                        Login
                      </Button>
                      <Link to={"/signup-page"}  className={classes.link}>
                      <Button simple color="primary" size="lg" >
                        New User Signup
                      </Button>
                      </Link>
                      <p>{this.state.textMessage}</p>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
