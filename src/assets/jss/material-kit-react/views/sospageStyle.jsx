import { title } from "assets/jss/material-kit-react.jsx";

const sospageStyle = {
  section: {
    padding: "80px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#999"
  },
  description: {
    color: "#999"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.57)',
  },
  gridList: {
    width: 800,
    height: 700,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
  
};

export default sospageStyle;

