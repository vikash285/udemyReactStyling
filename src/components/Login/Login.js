import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER-INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT-BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD-BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT-RUNNING");

    return () => {
      console.log("EFFECT-CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        emailIsValid && passwordIsValid && enteredCollege.trim().length > 0
      );
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER-INPUT", val: event.target.value });

    // setFormIsValid(
    //   passwordState.isValid &&
    //     event.target.value.includes("@") &&
    //     enteredCollege.trim().length > 0
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 &&
    //     emailState.isValid &&
    //     enteredCollege.trim().length > 0
    // );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);

    setFormIsValid(
      passwordState.isValid &&
        emailState.isValid &&
        event.target.value.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT-BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD-BLUR" });
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value, enteredCollege);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!formIsValid) {
      passwordInputRef.current.focus();
    } else {
      collegeInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          label="E-mail"
          id="email"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          label="Password"
          id="password"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          ref={collegeInputRef}
          type="college"
          label="College"
          id="college"
          value={enteredCollege}
          isValid={collegeIsValid}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
