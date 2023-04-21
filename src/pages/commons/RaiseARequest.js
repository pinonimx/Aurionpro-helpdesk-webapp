import ReactQuill from 'react-quill';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import '../dataentry.css';


function Options(props){
    return(
        <div className='dataentry--issue--type'>
            {props.label.trim() === '' ? <div>{null}</div> : <label htmlFor="id_select"> {props.label} {props.notReq ? <em>{null}</em> : <em>*</em>} </label>}
            <select id='id_select' onChange={props.onOptionChangeHandler}>
                <option value='' disabled='disabled' selected>{props.label.trim() === '' ? 'Please select a state' : 'Please choose one option'}</option>
                {props.optionTypes.map((option, index) => {
                    return <option key={index} >{option.data}</option>
                })}
            </select>
        </div>
    );
}

export function DataEntryForm(props) {
    const [value, setValue] = React.useState("");
    const [summary, setSummary] = React.useState('');
    console.log(value);
    const handleChange = event => {
        setSummary(event.target.value);
        console.log('summary is: ', event.target.value);
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
            ["link", "image"],
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
        {data: 'Resolved', stat: true},
        {data: 'On Hold', stat: true},
    ];

    const issuetype = [
        {data: 'Technical issue'},
        {data: 'Installation/Configuration'},
        {data: 'Billing inquiry'},
        {data: 'Account access'},
        {data: 'General inquiry'},
        {data: 'Feature request'},
        {data: 'Product feedback'},
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
        { data: "Ladakh" },
        { data: "Lakshadweep" },
        { data: "Madhya Pradesh" },
        { data: "Maharashtra" },
        { data: "Manipur" },
        { data: "Meghalaya" },
        { data: "Mizoram" },
        { data: "Nagaland" },
        { data: "Odisha" },
        { data: "Puducherry" },
        { data: "Punjab" },
        { data: "Rajasthan" },
        { data: "Sikkim" },
        { data: "Tamilnadu" },
        { data: "Telangana" },
        { data: "Tripura" },
        { data: "Uttar Pradesh" },
        { data: "Uttarakhand" },
        { data: "West Bengal" },
    ];
    const projectName = [
        {data: 'Project Name 1'},
        {data: 'Project Name 2'},
        {data: 'Project Name 3'},
        {data: 'Project Name 4'},
        {data: 'Project Name 5'},
    ];
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
    }
    return (
        <div className='dataentry--css'>
            <Options label={'Project Name'} optionTypes={projectName} onOptionChangeHandler={onOptionChangeHandler} />
            <Options label={'Issue type/Category'} optionTypes={issuetype} onOptionChangeHandler={onOptionChangeHandler} />
            <div className='dataentry--summary'>
                <p>Subject/Summary <em>*</em></p>
                <input
                    type="text"
                    id="summary"
                    name="summary"
                    onChange={handleChange}
                    value={summary}
                    placeholder='Write a summary of your issue here...'
                />
            </div>
            <p>Description</p>
            <ReactQuill modules={modules} onChange={setValue} theme='snow' placeholder='Describe your issue in detail here...' />
            <p>Required Details from Customer <em>*</em></p>
            <div className='card--bottom--border'>
                <div className='page--table'>
                    <div className='page--column--left'>
                        {props.stat === 'Customer' ? <h4>Your Name</h4> : <h4>Customer Name</h4>}
                        <h4>Email</h4>
                        <h4>Mob. No.</h4>
                        <h4>State</h4>
                        <h4>District</h4>
                        <h4>Tehshil</h4>
                        <h4>Khasra no.</h4>
                        <h4>Village</h4>
                    </div>
                    <div className='page--column--right'>
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder={props.stat === 'Customer' ? 'Your name here...' : 'Customer name here...'}
                        />
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder='Email here...'
                        />
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder='Mob no. here...'
                        />
                        <Options label={''} optionTypes={stateName} onOptionChangeHandler={onOptionChangeHandler} />
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder='District name here...'
                        />
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder='Tehshil name here...'
                        />
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder='Khasra number here...'
                        />
                        <input
                            type="text"
                            // id="summary"
                            // name="summary"
                            onChange={handleChange}
                            // value={summary}
                            placeholder='Village name here...'
                        />
                    </div>
                </div>
            </div>
            {props.stat === 'Manager' ?
            <div className='dataentry--summary'>
                <p>Assigned To</p>
                <input
                    type="text"
                    // id="summary"
                    // name="summary"
                    onChange={handleChange}
                    // value={summary}
                    placeholder='Assign this issue to...'
                />
                <Options label={'Priority'} optionTypes={priority} onOptionChangeHandler={onOptionChangeHandler} notReq={true}/>
                <Options label={'Status'} optionTypes={status} onOptionChangeHandler={onOptionChangeHandler} notReq={true}/>
            </div> : 
            <div>{null}</div>}
            <div className='dataentry--footer'>
                <button className="button-26" >Create</button>
                <button className="button-6" >Cancel</button>
            </div>
        </div>
    );
}

function RaiseARequest(props){

    return (
        <div className='main--home'>
            <div className='card--top--bar'>
                <h3>Raise a request</h3>
            </div>
            <DataEntryForm stat={props.stat}/>
        </div>
    );
}
export default RaiseARequest;