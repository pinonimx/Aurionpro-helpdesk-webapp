import React from 'react';
import './index.css';
import image from '../assets/computer.svg';
import cimg from '../assets/aurionpro-Logo_Color-1-01_Aurionpro-Logo-2022-color-.svg';
import { authenticationService } from '../_services/authentication.service';
import { Role } from '../_helpers';
import { userService } from '../_services/user.service';

function FormInputerror(props){
    return (
        <div className="form--input--error--message">{props.message}</div>
    );
}
function FormInput({pholder, ...props}) {
    const [msg, setMsg] = React.useState('');
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^([0-9]{3}[- ]?){2}[0-9]{4}$/;
    const blur = (e) => {
        if(e.target.id === 'signupUsername' && e.target.value.trim().length > 0 && e.target.value.trim().length < 5){
            setMsg("Invalid user name");
        }
        if(e.target.id === 'signupEmail' && e.target.value.trim().length > 0 && !mailformat.test(e.target.value)){
            setMsg("Invalid email format");
        }
        if(e.target.id === 'signupMob' && e.target.value.trim().length > 0 && !phoneFormat.test(e.target.value)){
            setMsg("Invalid Mobile Number");
        }
    };
    const focus = () => {
        setMsg('');
    }
        return (
            <div className="form--input--group">
                <input {...props} className="form--input" autoFocus placeholder={pholder} onFocus={() => focus()} onBlur={(e) => blur(e)} ></input>
                {msg.trim() === '' ? <div>{null}</div> : <FormInputerror message={msg}/>}
            </div>
        );
}
function FormError(props){
    return(
        <div className="form--message form--message--error">{props.message}</div>
    );
}
function FormSuccess(props){
    return(
        <div className="form--message form--message-success">{props.message}</div>
    );
}
function FormLogin(props)  {
    const [formError, setFormError] = React.useState('');
    const [formSuccess, setFormSucess] = React.useState('');
    const _onClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let location = '/';
        const useremail = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!mailformat.test(useremail)){
            setFormError('Invalid Email ID');
            return false;
        }
        setFormError('');
        setFormSucess('');
        authenticationService.login(useremail, password)
            .then(
                user => {
                    if(user.role  === Role.User){
                        location = '/user';
                    }
                    else if(user.role === Role.Employee){
                        location = '/employee';
                    }
                    else if(user.role === Role.Manager){
                        location = '/manager';
                    }
                    const { from } = {from : {pathname: location} } ;
                    setFormSucess('Logged in successfully, please wait while form reloads');
                    props.history.push(from);
                    window.location.reload(true);
                },
                error => {
                    setFormError("Invalid Login Id/Password");
                }
            );
    };

    return (
        <form className={props.classadd} onSubmit={e => handleSubmit(e)} >
            <h1 className="form--title">Login</h1>
            {formError.trim() === '' ? <div>{null}</div> : <FormError message={formError}/>}
            {formSuccess.trim() === '' ? <div>{null}</div> : <FormSuccess message={formSuccess}/>}
            <FormInput name='username' type="text" pholder="Username or email"/>
            <FormInput name='password' type="password" pholder="Password" />
            <button className="form--button" type="submit">Continue</button>
            <p className="form--text">
                <a className="form--link" href="#" >Forgot your password?</a>
            </p>
            <p className="form--text">
                <a className="form--link" href="./" id="linkcreateaccount" onClick={e => _onClick(e)} >Don't have an account? Create account</a>
            </p>
        </form>
    );
}
function FormCreateAccount(props) {
    const [formError, setFormError] = React.useState('');
    const [formSuccess, setFormSucess] = React.useState('');
    const _onClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }
    const _onSubmit = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const phone = e.target[2].value;
        const password = e.target[3].value;
        const confirmPassword = e.target[4].value;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneFormat = /^([0-9]{3}[- ]?){2}[0-9]{4}$/;
        if(name.length > 0 && name.length < 5){
            setFormError('Invalid Name');
            return false;
        }
        else if(!mailformat.test(email)){
            setFormError('Invalid Email ID');
            return false;
        }
        else if(phone.trim().length > 0 && phone.trim().length <14 && !phoneFormat.test(phone)){
            setFormError("Invalid Mobile Number");
            return false;
        }
        else if(password !== confirmPassword){
            setFormError("Passwords do not match");
            return false;
        }
        setFormError('');
        setFormSucess('');
        userService.createUser(name, email, phone, password)
            .then(
                response => {
                    setFormError('');
                    setFormSucess('Your account has been created successfully \n go back to sign-in page and login.')
                },
                error => {
                    setFormSucess('');
                    setFormError('Error in creating your account please try again later');
                }
            );
        return true;
    }
        return (
            <form className={props.classadd} onSubmit={e => _onSubmit(e)}>
                <h1 className="form--title">Create Account</h1>
                {formError.trim() === '' ? <div>{null}</div> : <FormError message={formError}/>}
                {formSuccess.trim() === '' ? <div>{null}</div> : <FormSuccess message={formSuccess} />}
                <FormInput type="text" id="signupUsername" pholder="Your full name" />
                <FormInput type="text" id='signupEmail' pholder="Email address" />
                <FormInput type='text' id='signupMob' pholder='Mobile number' />
                <FormInput type="password" pholder="Password" />
                <FormInput type="password" pholder="Confirm password" />
                <button className="form--button" type="submit" >Continue</button>
                <p className="form--text">
                    <a className="form--link" href="./" id="linklogin" onClick={e => _onClick(e)} >Already have an account? Sign in</a>
                </p>
            </form>
        );

}
class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginclassadd: "form",
            loginisActive: true,
            signupclassadd: "form form--hidden",
            signupIsActive: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        const loginclassadd = this.state.loginclassadd;
        const signupclassadd = this.state.signupclassadd;
        if(this.state.loginisActive && !this.state.signupIsActive){
            this.setState({
                loginclassadd: loginclassadd.concat(" ", "form--hidden"),
                loginisActive: !this.state.loginisActive,
                signupclassadd: signupclassadd.replace(" form--hidden", ""),
                signupIsActive: !this.state.signupIsActive,                
            });
        }
        else if(this.state.signupIsActive && !this.state.loginisActive){
            this.setState({
                loginclassadd: loginclassadd.replace(" form--hidden", ""),
                loginisActive: !this.state.loginisActive,
                signupclassadd: signupclassadd.concat(" ", "form--hidden"),
                signupIsActive: !this.state.signupIsActive,                
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="container--img">
                    <img className="cimg" src={cimg} alt="Aurionpro svg"></img>
                </div>
                <div className="page">
                    <div className="page--table">
                        <div className="page--table--column">
                            <img className="wimg" src={image} alt="women on computer" />
                        </div>
                        <div className="page--table--column form--container">
                            <div className="page--table content-center">
                                <FormLogin classadd={this.state.loginclassadd} handleClick={this.handleClick} history={this.props.history} />
                                <FormCreateAccount classadd={this.state.signupclassadd} handleClick={this.handleClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

export default Page;
