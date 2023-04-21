import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import image from '../assets/computer.svg';
import cimg from '../assets/aurionpro-Logo_Color-1-01_Aurionpro-Logo-2022-color-.svg';

function FormInputerror(props){
    return (
        <div className="form--input--error--message">{props.message}</div>
    );
}
function FormInput(props) {
    const [msg, setMsg] = React.useState('');
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regexPattern = /^[a-zA-Z0-9]+$/;
    const blur = (e) => {
        if(e.target.id === 'signupUsername' && e.target.value.trim().length > 0 && !regexPattern.test(e.target.value.trim())){
            setMsg("Invalid user name");
        }
        if(e.target.id === 'signupEmail' && e.target.value.trim().length > 0 && !mailformat.test(e.target.value)){
            setMsg("Invalid email format");
        }
    };
    const focus = () => {
        setMsg('');
    }
        return (
            <div className="form--input--group">
                <input type={props.type} id={props.id ? props.id : ''} className="form--input" autoFocus placeholder={props.pholder} onFocus={() => focus()} onBlur={(e) => blur(e)} ></input>
                {msg.trim() === '' ? <div>{null}</div> : <FormInputerror message={msg}/>}
            </div>
        );
}
function FormError(props){
    return(
        <div className="form--message form--message--error">{props.message}</div>
    );
}
function FormLogin(props)  {
    const _onClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/manager');
        setFormError("Invalid Login Id/Password");
    }
    const [formError, setFormError] = React.useState('');

    return (
        <form className={props.classadd} onSubmit={e => handleSubmit(e)} >
            <h1 className="form--title">Login</h1>
            {formError.trim() === '' ? <div>{null}</div> : <FormError message={formError}/>}
            <FormInput type="text" pholder="Username or email"/>
            <FormInput type="password" pholder="Password" />
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
    const _onClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }
    const _onSubmit = (e) => {
        e.preventDefault();
        var regexPattern = /^[a-zA-Z0-9]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regexPattern.test(e.target[0].value)){
            setFormError('Invalid User Name');
            return false;
        }
        else if(!mailformat.test(e.target[1].value)){
            setFormError('Invalid Email ID');
            return false;
        }
        console.log(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value);
        return true;
    }
        return (
            <form className={props.classadd} onSubmit={e => _onSubmit(e)}>
                <h1 className="form--title">Create Account</h1>
                {formError.trim() === '' ? <div>{null}</div> : <FormError message={formError}/>}
                <FormInput type="text" id="signupUsername" pholder="Username" />
                <FormInput type="text" id='signupEmail' pholder="Email address" />
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
                                <FormLogin classadd={this.state.loginclassadd} handleClick={this.handleClick} />
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
