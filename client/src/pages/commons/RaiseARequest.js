import ReactQuill from 'react-quill';
import React, {useEffect, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import '../dataentry.css';
import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import { Role } from '../../_helpers';


function Options(props){
    return(
        <div className='dataentry--issue--type'>
            {props.label.trim() === 'stateName' ? <div>{null}</div> : <label htmlFor={props.label}> {props.label !== 'projectName' ? props.label : 'Project Name'} {props.notReq ? <em>{null}</em> : <em>*</em>} </label>}
            <select id={props.label} onChange={props.onOptionChangeHandler} value={props.value}>
                <option value='' disabled='disabled' selected>{props.label.trim() === 'stateName' ? 'Please select a state' : 'Please choose one option'}</option>
                {props.optionTypes.map((option, index) => {
                    return <option key={index} >{option.data}</option>
                })}
            </select>
        </div>
    );
}

export function DataEntryForm(props) {
    const [ticketno, setTicketno] = useState(props.ticketno ? props.ticketno : null);
    const [value, setValue] = useState(props.value ? props.value : "");
    const [summary, setSummary] = useState(props.summary ? props.summary : '');
    const [name, setName] = useState(props.name ? props.name : '');
    const [email, setEmail] = useState(props.email ? props.email : '');
    const [mobNo, setMobNo] = useState(props.mobNo ? props.mobNo : '');
    const [district, setDistrict] = useState(props.district ? props.district : '');
    const [tehshil, setTehshil] = useState(props.tehshil ? props.tehshil : '');
    const [khasraNo, setKhasraNo] = useState(props.khasraNo ? props.khasraNo : '');
    const [village, setVillage] = useState(props.village ? props.village : '');
    const [assigntoemail, setAssigntoemail] = useState(props.assigntoemail ? props.assigntoemail : '');
    const [category, setCategory] = useState([]);
    const [projectName, setProjectName] = useState([]);
    const [projectNameOption, setProjectNameOption] = useState(props.projectName ? props.projectName : '');
    const [categoryOption, setCategoryOptions] = useState(props.category ? props.category : '');
    const [stateNameOption, setStateNameOption] = useState(props.stateName ? props.stateName : '');
    const [priorityOption, setPriorityOption] = useState(props.priority ? props.priority : '');
    const [statusOption, setStatusOption] = useState(props.status ? props.status : '');
    const [bankName, setBankName] = useState(props.bankName ? props.bankName : '');
    const [link, setLink] = useState(props.link?.trim() ? props.link?.includes(props.id) ? props.link.concat(props.id, ',') : null : null);
    const handleChange = e => {
        if(e.target.id === 'summary') {
            setSummary(e.target.value)
        }
        else if(e.target.id === 'name'){
            setName(e.target.value);
        }
        else if(e.target.id === 'email'){
            setEmail(e.target.value);
        }
        else if(e.target.id === 'mobno'){
            setMobNo(e.target.value);
        }
        else if(e.target.id === 'district'){
            setDistrict(e.target.value);
        }
        else if(e.target.id === 'tehshil'){
            setTehshil(e.target.value);
        }
        else if(e.target.id === 'khasra'){
            setKhasraNo(e.target.value);
        }
        else if(e.target.id === 'village'){
            setVillage(e.target.value);
        }
        else if(e.target.id === 'assigntoemail'){
            setAssigntoemail(e.target.value);
        }
        else if(e.target.id === 'bankname'){
            setBankName(e.target.value);
        }
        // console.log(e.target);
        // console.log('summary is: ', e.target.value);
    }
    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link"],
            ["clean"],
        ],
    };
    
    const priority = [
        {data: 'Normal', prio: true},
        {data: 'Important', prio: true},
        {data: 'Urgent', prio: true},
    ];

    const status = [
        {data: 'Waiting for support', stat: true},
        {data: 'In Progress', stat: true},
        {data: 'On Hold', stat: true},
    ];

    const stateName = [
        { data: "Andhra Pradesh" },
        { data: "Andaman & Nicobar Islands" },
        { data: "Arunachal Pradesh" },
        { data: "Assam" },
        { data: "Bihar" },
        { data: "Chandigarh" },
        { data: "Chhattisgarh" },
        { data: "Delhi NCT" },
        { data: "Dadra and Nagar Haveli and Daman and Diu" },
        { data: "Goa" },
        { data: "Gujrat" },
        { data: "Haryana" },
        { data: "Himachal Pradesh" },
        { data: "Jammu & Kashmir" },
        { data: "Jharkhand" },
        { data: "Karnataka" },
        { data: "Kerala" },
        { data: "Lakshadweep" },
        { data: "Madhya Pradesh" },
        { data: "Maharashtra" },
        { data: "Manipur" },
        { data: "Meghalaya" },
        { data: "Mizoram" },
        { data: "Nagaland" },
        { data: "Odisha" },
        { data: "Pondicherry" },
        { data: "Punjab" },
        { data: "Rajasthan" },
        { data: "Sikkim" },
        { data: "Tamil Nadu" },
        { data: "Telangana" },
        { data: "Tripura" },
        { data: "Uttar Pradesh" },
        { data: "Uttarakhand" },
        { data: "West Bengal" },
    ];
    const onOptionChangeHandler = (e) => {
        if(e.target.id === 'projectName'){
            setProjectNameOption(e.target.value);
        }
        else if(e.target.id === 'category'){
            setCategoryOptions(e.target.value);
        }
        else if(e.target.id === 'stateName'){
            setStateNameOption(e.target.value);
        }
        else if(e.target.id === 'Priority'){
            setPriorityOption(e.target.value);
        }
        else if(e.target.id === 'Status'){
            setStatusOption(e.target.value);
        }
        // console.log("User Selected Value - ", e.target.value)
    }
    const _onSubmit = (e) => {
        e.preventDefault();
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneFormat = /^([0-9]{3}[- ]?){2}[0-9]{4}$/;
        if (!props.createIncident) {
            if (name.length >= 0 && name.length < 5) {
                alert('Invalid Name');
                return false;
            }
            else if (mobNo === '' && !mailformat.test(email)) {
                alert('Invalid User Email ID');
                return false;
            }
            else if (assigntoemail !== '' && !mailformat.test(assigntoemail)) {
                alert('Invalid assignee email id');
                return false;
            }
            else if (mailformat === '' && mobNo.trim().length > 0 && mobNo.trim().length < 10 && !phoneFormat.test(mobNo)) {
                alert("Invalid Mobile Number");
                return false;
            }
            else if (projectNameOption === '' || categoryOption === '' || summary === '' || name === '' || stateName === '') {
                alert("Fill all the mandatory (*) fields");
                return false;
            }
            else if (value?.trim().length > 5000) {
                alert("Description of the problem is too long!!");
                return false;
            }
            else if (summary?.trim().length > 500) {
                alert("Summary of the problem is too long!!");
                return false;
            }
        } else {
            if (projectNameOption === '' || categoryOption === '' || summary === '') {
                alert("Fill all the mandatory (*) fields");
                return false;
            }
        }
        const ticketData = {
            ticketno: ticketno,
            value: value,
            summary: summary,
            name: name,
            email: email,
            mobNo: mobNo,
            district: district,
            tehshil: tehshil,
            khasraNo: khasraNo,
            village: village,
            assigntoemail: assigntoemail,
            projectNameOption: projectNameOption,
            categoryOption: categoryOption,
            stateNameOption: stateNameOption,
            bankName: bankName,
            priorityOption: priorityOption,
            statusOption: statusOption,
            link: link,
            creator: props.creator
        };
        userService.createorupdateticket(ticketData)
            .then(msg => {
                if(props.stat === Role.Manager){
                    userService.getAll()
                        .then(data => {
                            props.data(data);
                            if(props.filteredData){
                                props.filteredData(data);
                                for(let e in data){
                                    if(data[e].id === ticketno){
                                        props.detailView(data[e]);
                                        break;
                                    }
                                }
                            }
                        })
                        .catch(e => {
                            const alertmsg = 'Error creating/updating the ticket database: '.concat(e);
                            console.log(e);
                            alert(alertmsg);
                        });
                } else {
                    userService.getById(props.cuid)
                        .then(data => {
                            props.data(data);
                        })
                        .catch(e => {
                            const alertmsg = 'Error creating/updating the ticket database: '.concat(e);
                            console.log(e);
                            alert(alertmsg);
                        });
                }
                const alertmsg = msg.message.concat(' ticket id: ', msg.ticketId);
                alert(alertmsg);
                if(props.close){
                    props.close();
                }
            })
            .catch(err => {
                console.log(err);
                const alertmsg = 'Error creating/updating the ticket database: '.concat(err);
                alert(alertmsg);
            });
    }
    useEffect(() => {
        userService.formData().then(data => {
            setCategory(data.reduce(function (val, key) {
                if (key.category) {
                    val.push({ 'data': key.category });
                }
                return val;
            }, [])
            );
            setProjectName(data.reduce(function (val, key) {
                if(key.type){
                    val.push({'data': key.type });
                }
                return val;
            }, []));
        })
    }, []);
    if(!category && !projectName){
        return <div>Loading...</div>;
    }
    return (
        <form className='dataentry--css' onSubmit={e => _onSubmit(e)}>
            <Options label={'projectName'} optionTypes={projectName} onOptionChangeHandler={onOptionChangeHandler} value={projectNameOption} />
            <Options label={'category'} optionTypes={category} onOptionChangeHandler={onOptionChangeHandler} value={categoryOption} />
            <div className='dataentry--summary'>
                <p>Subject/Summary <em>*</em></p>
                <input
                    type="text"
                    id="summary"
                    name="summary"
                    onChange={handleChange}
                    value={summary}
                    placeholder={props.createIncident ? 'Write the summary of this incident' : 'Write a summary of your issue here...'}
                />
            </div>
            <p>Description</p>
            <ReactQuill modules={modules} onChange={setValue} theme='snow' placeholder={props.createIncident ? 'Describe your major incident here...' : 'Describe your issue in detail here...'} value={value} />
            {props.createIncident ? <p>{null}</p> : <p>Required Details from Customer <em>*</em></p>}
            {props.createIncident ? <div>{null}</div> : <div className='card--bottom--border'>
                <div className='page--table'>
                    <div className='page--column--left'>
                        {props.stat === Role.User ? <h4>Your Name</h4> : <h4>Customer Name</h4>}
                        <h4>Email</h4>
                        <h4>Mob. No.</h4>
                        <h4>State</h4>
                        <h4>Bank</h4>
                        <h4>District</h4>
                        <h4>Tehshil</h4>
                        <h4>Khasra no.</h4>
                        <h4>Village</h4>
                    </div>
                    <div className='page--column--right'>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={name}
                            placeholder={props.stat === 'User' ? 'Your name here...' : 'Customer name here...'}
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            placeholder={props.stat === 'User' ? 'Your email here...' : 'Client Email here...'}
                        />
                        <input
                            type="text"
                            id="mobno"
                            name="mobno"
                            onChange={handleChange}
                            value={mobNo}
                            placeholder='Mob no. here...'
                        />
                        <Options label={'stateName'} optionTypes={stateName} onOptionChangeHandler={onOptionChangeHandler} value={stateNameOption} />
                        <input
                            type="text"
                            id="bankname"
                            name="bankname"
                            onChange={handleChange}
                            value={bankName}
                            placeholder='Bank name here...'
                        />
                        <input
                            type="text"
                            id="district"
                            name="district"
                            onChange={handleChange}
                            value={district}
                            placeholder='District name here...'
                        />
                        <input
                            type="text"
                            id="tehshil"
                            name="tehshil"
                            onChange={handleChange}
                            value={tehshil}
                            placeholder='Tehshil name here...'
                        />
                        <input
                            type="text"
                            id="khasra"
                            name="khasra"
                            onChange={handleChange}
                            value={khasraNo}
                            placeholder='Khasra number here...'
                        />
                        <input
                            type="text"
                            id="village"
                            name="village"
                            onChange={handleChange}
                            value={village}
                            placeholder='Village name here...'
                        />
                    </div>
                </div>
            </div>}
            {props.stat === 'Manager' ?
            <div className='dataentry--summary'>
                <p>Assigned To</p>
                <input
                    type="email"
                    id="assigntoemail"
                    name="assigntoemail"
                    onChange={handleChange}
                    value={assigntoemail}
                    placeholder={props.createIncident ? 'Email ID of person/team this incident has to be assigned to...' : 'Email ID of the person this issue is assigned to...'}
                />
                <Options label={'Priority'} optionTypes={priority} onOptionChangeHandler={onOptionChangeHandler} notReq={true} value={priorityOption}/>
                <Options label={'Status'} optionTypes={status} onOptionChangeHandler={onOptionChangeHandler} notReq={true} value={statusOption} />
            </div> : 
            <div>{null}</div>}
            <div className='dataentry--footer'>
                <button className="button-26" type='submit'>{!ticketno ? 'Create' : 'Update'}</button>
                {ticketno ? <button className="button-6" type='button' onClick={() => props.close()} >Cancel</button> : <div>{null}</div>}
            </div>
        </form>
    );
}

function RaiseARequest(props){
    const currentUser = authenticationService.getCurrentUser();
    const status = currentUser.role;
    const [name, setName] = useState(status === Role.User ? currentUser.username : null);
    const [mobNo, setMobNo] = useState(status === Role.User ? currentUser.mobilenum : null);
    const [email, setEmail] = useState(status === Role.User ? currentUser.useremail : null);
    const [assigntoemail, setAssigntoemail] = useState(status !== Role.User ? currentUser.useremail : null);
    return (
        <div className='main--home'>
            <div className='card--top--bar'>
                <h3>Raise a request</h3>
            </div>
            <DataEntryForm cuid={currentUser.id} data={props.data} stat={status} name={name} mobNo={mobNo} email={email} assigntoemail={assigntoemail} priority={'Normal'} status={status !== Role.User ? 'In Progress' : 'Waiting for support'} />
        </div>
    );
}
export default RaiseARequest;