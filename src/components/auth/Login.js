import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from 'recompose/compose';
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { styles } from './Link';
import { Box } from "@mui/system";
import { Avatar, Grid, Button, Paper, Typography, TextField, Container } from '@material-ui/core';
import { withStyles, styled } from "@material-ui/styles";
import AuthButtonGroup from "../../comps/AuthPages/ButtonGroup";
import FormLogin from "../../comps/AuthPages/FormLogin";
import LeftPanel from "../../comps/AuthPages/LeftPanel";
import SectionDivider from "../../comps/AuthPages/SectionDivider";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//const classes = useStyles(props);
import { Helmet } from "react-helmet";
import AuthContext from '../../context/auth/authContext';

//const authContext = useContext(AuthContext);
//const { login, error, clearErrors, isAuthenticated } = authContext;

const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `1fr`,
  },
}));

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(8),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1.5),
    },
  },

  "& .form_Container": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 500,
    },
    "& .MuiTypography-paragraph": {
      margin: "8px 0 20px 0",
    },
  },
}));





class Login extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      //context: FormLogin,
     // children: this.props.AuthContext,
      isAuthenticated: "",
      curentUser: '',
      user: [],
      errors: {}
    };
  }





  componentDidMount() {
    console.log(this.contextType);
    console.log(this.props);
    console.log(FormLogin.props)

    // console.log(s);
   // const { login, error, clearErrors, isAuthenticated } = authContext;
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if(nextProps.auth.isAuthenticated){
      console.log('here')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target)
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    
    //const { classes } = this.props;
    //const {isAuthenticated,  } = this.props
    return (



      <>
        {/* Helmet */}
        <Helmet>
          <title>Login | MUI Dash</title>
        </Helmet>

        <ContainerBoxStyle container>
          <LeftPanel
            title="Hi, Welcome Back"
            imgAlt="Login Image"
          />

          <RightPanelStyle>
            <Typography paragraph className="account_switch">
              Don't have an account?{" "}
              <Link to="/register" underline="none">
                Get started
              </Link>
            </Typography>

            <Container maxWidth="xs" className="form_Container">
              <Typography variant="h4">Sign in to MUI Dash</Typography>
              <Typography paragraph color="textSecondary">
                Enter your details below.
              </Typography>

              {/* Buttons */}
              <AuthButtonGroup />

              {/* Section Divider */}
              <SectionDivider />

              {/* The Actual Form 👇 */}
              <FormLogin props = {this.contextType} />
            </Container>
          </RightPanelStyle>
        </ContainerBoxStyle>
      </>






    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  //classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  //classes: state.classes,
  //context: state.context
});

export default compose(
  connect(
    mapStateToProps,
  ), withStyles(styles)
)(Login);
