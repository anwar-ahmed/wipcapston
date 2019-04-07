import React from "react";
import envVar from "../../config.js"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import Button from "components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";


import Incident from "./Incident"
import Axios from "axios";

var _incidentUrl = envVar.API_URL + '/incident/'



class ListIncidents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      IncidentList:[],
      dataSource:[],
      searchText:'',
    }
  }

  getIncidentList = (searchText, queryType) => {
    Axios.get(_incidentUrl + searchText)
    .then( response => {

      this.setState({
        IncidentList: response.data.data,
        dataSource: response.data.data

      });

    })
    .catch(error => { throw error});
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    this.getIncidentList(event.target.value,'SearchLoad');
  };
  componentDidMount = () => {
    this.getIncidentList('','InitialLoad');
  }


  styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });


  render() {

    const { classes, ...rest } = this.props;

  let  renderAllIncident = this.state.IncidentList.map((_incident, index) => {
    return <Incident key={index} Incident={_incident}  />;
});
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
           <h4 className={classes.title}>List of Non SOS Incident Reported</h4>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Search field"
                    id="standard-search"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "search",
                      value: this.state.searchText,
                      onChange: this.handleChange('searchText'),
                      margin:"normal"
                    }}
                  />
            </GridItem>
            </GridContainer>
                <GridContainer justify="center">

                        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell >Requested By</TableCell>    
            <TableCell >Opened</TableCell>
            <TableCell >Type</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Priority</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {renderAllIncident}  
        </TableBody>
      </Table>

              </GridContainer>
          </GridItem>
        </GridContainer>


              
      </div>
    );
  }
}

export default withStyles(workStyle)(ListIncidents);
