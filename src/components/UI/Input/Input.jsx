import React from 'react'
import classes from './Input.module.css';

export const Input = (props) => {
    let inputEl = null

    const inputClasses = [classes.InputEl]
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter valid {props.elementConfig.placeholder}</p>;
    }
    switch (props.elementType) {
        case 'input':
            inputEl = (
                <input 
                    {...props.elementConfig} 
                    className={inputClasses.join(' ')} 
                    value={props.value} 
                    onChange={props.changed}
                />
            ) 
            break;
        case 'textarea':
            inputEl = (
                <textarea
                    {...props.elementConfig}
                    className={inputClasses.join(' ')} 
                    value={props.value} 
                    onChange={props.changed}
                />
            ) 
            break;
        case 'select':
            inputEl = (
                <select 
                    className={inputClasses.join(' ')} 
                    value={props.value} 
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value} 
                            value={option.value}
                        >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl = (
                <input
                    {...props.elementConfig} 
                    className={inputClasses.join(' ')} 
                    value={props.value} 
                    onChange={props.changed}
                />
            )
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { inputEl }
            {validationError}
        </div>
    )
}
