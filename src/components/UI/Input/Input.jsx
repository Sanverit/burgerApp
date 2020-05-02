import React from 'react'
import classes from './Input.module.css';

export const Input = (props) => {
    let inputEl = null
    switch (props.elementType) {
        case 'input':
            inputEl = <input className={classes.InputEl} {...props.elementConfig} value={props.value} onChange={(v)=>console.log('v', v)}/>
            break;
        case 'textarea':
            inputEl = <textarea className={classes.InputEl} {...props.elementConfig} value={props.value} onChange={(v)=>console.log('v', v)}/>
            break;
        case 'select':
            inputEl = (
                <select className={classes.InputEl} value={props.value} onChange={(v)=>console.log('v', v)}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl = <input className={classes.InputEl} {...props.elementConfig} value={props.value} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { inputEl }
        </div>
    )
}
