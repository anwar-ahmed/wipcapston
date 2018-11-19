import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Button from "components/CustomButtons/Button.jsx";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

class Incident extends React.Component {

  render() {
   return (
              <TableRow key={this.props.Incident._id}>
                <TableCell component="th" scope="row">
                 <Link to={"/incidentdetail-page/" + this.props.Incident._id}>{this.props.Incident._id}</Link> 
                </TableCell>
                <TableCell >{this.props.Incident.requestedby}</TableCell>
                <TableCell >{this.props.Incident.opened}</TableCell>
                <TableCell >{this.props.Incident.type}</TableCell>
                <TableCell >{this.props.Incident.description}</TableCell>
                <TableCell >{this.props.Incident.priority}</TableCell>
                <TableCell >{this.props.Incident.status}</TableCell>
              </TableRow>
               );
  }
}
export default withStyles(workStyle)(Incident);
