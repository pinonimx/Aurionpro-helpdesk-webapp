import ReactQuill from 'react-quill';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import '../dataentry.css';

function Options(props){
    return(
        <div className='dataentry--issue--type'>
            <label htmlFor="id_select"> {props.label} <em>*</em> </label><br/>
            <select id='id_select' onChange={props.onOptionChangeHandler}>
                <option value='' disabled='disabled' selected>Please choose one option</option>
                {props.optionTypes.map((option, index) => {
                    return <option key={index} >
                        {option.data}
                    </option>
                })}
            </select>
        </div>
    );
}

function RaiseARequest(){
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
    
    const issuetype = [
        {data: 'Technical issue'},
        {data: 'Installation/Configuration'},
        {data: 'Billing inquiry'},
        {data: 'Account access'},
        {data: 'General inquiry'},
        {data: 'Feature request'},
        {data: 'Product feedback'},
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
        <div className='main--home'>
            <div className='card--top--bar'>
                <h3>Raise a request</h3>
            </div>
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
                            <h4>State</h4>
                            <h4>District</h4>
                            <h4>Tehshil</h4>
                            <h4>Khasra no.</h4>
                            <h4>Village</h4>
                        </div>
                        <div className='page--column--right'>
                            <input
                                type="text"
                                id="summary"
                                name="summary"
                                onChange={handleChange}
                                value={summary}
                                placeholder='Customer State Name here...'
                            />
                            <input
                                type="text"
                                id="summary"
                                name="summary"
                                onChange={handleChange}
                                value={summary}
                                placeholder='Customer District here...'
                            />
                            <input
                                type="text"
                                id="summary"
                                name="summary"
                                onChange={handleChange}
                                value={summary}
                                placeholder='Customer Tehshil here...'
                            />
                            <input
                                type="text"
                                id="summary"
                                name="summary"
                                onChange={handleChange}
                                value={summary}
                                placeholder='Customer Khasra number here...'
                            />
                            <input
                                type="text"
                                id="summary"
                                name="summary"
                                onChange={handleChange}
                                value={summary}
                                placeholder='Customer village here...'
                            />
                        </div>
                    </div>
                </div>
                <div className='dataentry--summary'>
                    <p>Assigned To</p>
                    <input
                        type="text"
                        id="summary"
                        name="summary"
                        onChange={handleChange}
                        value={summary}
                        placeholder='Assign this issue to...'
                    />
                </div>
                <div className='dataentry--footer'>
                    <button className="button-26" >Create</button>
                    <button className="button-6" >Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default RaiseARequest;