import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useHistory } from 'react-router'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import authContext from "../../context/auth/authContext";
// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  // input style
  "& label.Mui-focused": {
    color: theme.palette.success.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.success.main,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.success.main,
    },
  },

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.error.light,
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: theme.palette.error.light,
  },

  // checkbox style
  "& .MuiCheckbox-root": {
    color: theme.palette.success.light,
  },
  "& .Mui-checked": {
    color: theme.palette.success.main,
  },

  // forgot link style
  "& a": {
    color: theme.palette.success.main,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.success.light,
    },
  },

  // button style
  "& .MuiButton-contained": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      boxShadow: "none",
    },
  },
}));

const FormLogin = props => {
  
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);


  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { login, error, clearErrors, isAuthenticated, history } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    
    if (isAuthenticated) {
      console.log(props);
      console.log('YES')
      props.props.history.push('/dashboard')
      //props.history.push('/dashboard');
    }

    if (error !== null) {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  
  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  // hook form
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberUser: true,
    },
  });

  // prevent Default
  const preventDefault = (e) => e.preventDefault();

  // form submit
  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password
    };
    console.table(data);
    console.log(data)

    if (userData.email === '') {
      setAlert("Please enter an email", "danger");
    } else if (userData.password === '') {
      setAlert("Please enter a password", "danger");
    } else {

      login(userData);
      console.log(props)
    }
    //alert(JSON.stringify(data));
    //this.props.loginUser(data);
    // const history = useHistory();
    //const history = useHistory();
    // history.push("./dashboard");
    // history.push('/dashboard');
  };

  // const onChange = e => {
  //   // this.setState({ [e.target.id]: e.target.value });
  //   console.log(e.target);
  // };

  // for reset
  // couldn't make it work

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <TextField
        variant="outlined"
        key="email"
        onChange={onChange}
        fullWidth
        type="email"
        label="Email address"
        error={errors.email ? true : false}
        helperText={errors.email && "Enter a valid email address"}
        {...register("email", { required: true })}
      />

      {/* Password */}
      <TextField
        variant="outlined"
        fullWidth
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        error={errors.password ? true : false}
        helperText={
          errors.password && "Enter a valid password (5-15 characters)"
        }
        {...register("password", {
          required: true,
          minLength: 5,
          maxLength: 15,
        })}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              className="ckbox"
              checked={remember}
              onChange={handleToggleRemember}
            />
          }
          label="Remember me"
          {...register("rememberUser")}
        />

        <Link href="#" onClick={preventDefault} underline="always">
          Forgot password?
        </Link>
      </Box>

      <Button type="submit" variant="contained" disableElevation>
        Login
      </Button>
    </FormStyle>
  );
};


export default FormLogin;
