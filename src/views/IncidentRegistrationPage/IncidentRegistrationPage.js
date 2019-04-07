import React from "react";
import axios from "axios";
import envVar from "../../config.js"
// @material-ui/core components
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";



// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";


import AddIncidentForm from "./AddIncidentForm"

import incidentRegistrationPageStyle from "assets/jss/material-kit-react/views/incidentRegistrationPageStyle.jsx";

var _notificationUrl = envVar.API_URL + '/notification'


class IncidentRegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList:[],
    };
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
          rightLinks={
          <HeaderLinks endusermenu="true" alertCount={alertCount} updateCount={updateCount} sessionName={sessionStorage.getItem('username')}/>}
          {...rest}
        />
        <div
          className={classes.pageHeader}
        >
          <div className={classes.container}>
              <Paper className={classes.root} elevation={1}>
              <AddIncidentForm/>
             </Paper>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(incidentRegistrationPageStyle)(IncidentRegistrationPage);
