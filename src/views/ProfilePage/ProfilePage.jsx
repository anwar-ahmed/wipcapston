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


import ProfileForm from "./ProfileForm"

 import incidentRegistrationPageStyle from "assets/jss/material-kit-react/views/incidentRegistrationPageStyle.jsx";
import image from "assets/img/bg8.jpg";

var _userUrl = "http://localhost:3000/users/";
var _notificationUrl = 'http://localhost:3000/notification'

class IncidentRegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      emailId:'',
      password:'',
      notificationList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {

    axios.get(_notificationUrl)
    .then( response => {
        this.setState({
                notificationList:response.data.data      
        })
      }
      )
      .catch(error => { throw error}); 

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

    const alertCount =  this.state.notificationList.filter(value => value.type === 'alert').length;
    const updateCount = this.state.notificationList.filter(value => value.emailId === sessionStorage.getItem('username')).length;
    return (
      <div>
        <Header
          absolute
          color="dark"
          brand="ESIM"
          rightLinks={<HeaderLinks endusermenu="true" alertCount={alertCount} updateCount={updateCount} sessionName={sessionStorage.getItem('username')}/>}
          {...rest}
        />
        <div
          className={classes.pageHeader}
        >
          <div className={classes.container}>
              <Paper className={classes.root} elevation={1}>
              <ProfileForm/>
             </Paper>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(incidentRegistrationPageStyle)(IncidentRegistrationPage);
