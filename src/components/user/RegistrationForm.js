import React, { useRef, useState, useEffect, Fragment } from "react";
import { createNewUser, checkUserExists } from "../../services/api";
import { Link } from "react-router-dom";
import './RegistrationForm.css';  

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^[A-Za-z0-9]{6,24}$/;


const RegistrationForm = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        const isValidPwd = PWD_REGEX.test(pwd);
        setValidPwd(isValidPwd);
        const isMatch = pwd === matchPwd;
        setValidMatch(isMatch);
        console.log({ isValidPwd, isMatch });
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        console.log('Username valid:', USER_REGEX.test(user));
        console.log('Password valid:', PWD_REGEX.test(pwd));
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
    
        try {
            const userExistsResponse = await checkUserExists(user);
            const userExists = userExistsResponse.data; 
    
            if (userExists) {
                setErrMsg('Username Taken');
                return;
            }
    
            const newUserBody = {
                username: user,
                password: pwd,
                firstName: "First",
                lastName: "Last",
                email: "email@example.com",
                phone: "1234567890",
                address: "City, Country",
            };
    
            await createNewUser(newUserBody);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            setErrMsg('Registration Failed');
            errRef.current.focus();
        }
    };
    

    return (
        <Fragment>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                        {errMsg}
                    </p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                            4 to 24 characters.<br />
                            Must begin with a letter.
                        </p>

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            6 to 24 characters.
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            Must match the first password input field.
                        </p>

                        <button >Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </Fragment>
    );
};

export default RegistrationForm;
