import React from 'react';
import api from '../api';

export default function InsertionResult(props) {
    if (!props.isResultSuccess) {
        return (
            <div style={{color: "gray"}}>
                <p>Insert location to blockchain and see the result here.</p>
            </div>
        );
    }
    if (props.isResultSuccess) {
        var trxUrl = api.ropstenUrl + props.trxHash
        return (
            <div style={{color: "green"}}>
                <p>Check status of transaction <a href={trxUrl}>{props.trxHash}</a></p> 
            </div>
        );
    } else {
        return (
            <div style={{color: "red"}}>
                <p>Failed to insert location {props.locationName}.</p> 
            </div>
        );
    }
  }