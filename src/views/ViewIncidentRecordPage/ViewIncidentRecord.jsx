import React from "react";
import axios from "axios";
// @material-ui/core components
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";



// @material-ui/icons

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
import CardFooter from "components/Card/CardFooter.jsx"

import CustomInput from "components/CustomInput/CustomInput.jsx";

import IncidentRecordForm from "./IncidentRecordForm"

 import incidentRegistrationPageStyle from "assets/jss/material-kit-react/views/incidentRegistrationPageStyle.jsx";
import image from "assets/img/bg8.jpg";

var _userUrl = "http://localhost:3000/users/";

class IncidentRegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      emailId:'',
      password:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit =(event) => {
    event.preventDefault();
   console.log("i am here");
    axios.post(_userUrl + "login", {
      username:this.state.emailId,
      password:this.state.password
    })
    .then(function (response) {
      console.log(response);
      //this.props.history.push('/');
      // createHashHistory.push('/')
    })
    .catch(function (error) {
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
          rightLinks={<HeaderLinks modules="true"/>}
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
              <IncidentRecordForm/>
             </Paper>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(incidentRegistrationPageStyle)(IncidentRegistrationPage);
