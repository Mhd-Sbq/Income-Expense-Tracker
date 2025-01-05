import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import {getAllEntries , getOneEntry , createOneEntry , UpdateOneEntry , DeleteOneEntry} from '../api'



export default function Viewledger() {

    ////// Fetch the state value form ledgers.jsx to know which ledger is seleted to view

    const [viewled,setviewled] = useState('')
    const location = useLocation()
 


    const [Data,setData] = useState([])

    const [LedDebitTotal,setLedDebitTotal] = useState(0)
    const [LedCreditTotal,setLedCreditTotal] = useState(0)


    useEffect(() =>{
    const gettingdata  = async () => {
        let datacheck = await getAllEntries()
        
        if (datacheck){
        setData(datacheck)}
    }
    gettingdata()
    },[])

    useEffect(()=>{
        setviewled(location.state.viewledger.Ledger)
    },[location])

    useEffect(() => {
        const filteredData = Data.filter(entry => entry.Ledger === viewled);
        const creditTotal = filteredData.reduce((total, entry) => total +parseInt(entry.Receipt), 0);
        const debitTotal = filteredData.reduce((total, entry) => total + parseInt(entry.Payment), 0);
        setLedCreditTotal(creditTotal);
        setLedDebitTotal(debitTotal);
    }, [Data, viewled]);


    return (
        
        <div>
            <table style={{marginTop:'50px'}}>
                <tr>
                    <th colSpan={4}>{viewled}</th>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            {Data.filter(entry => entry.Ledger === viewled).map((entry,index) => {

                
                
                return(
                    <tr key={index}>
                        <td>{new Date (entry.Date).toLocaleDateString('en-GB').replace(/\//g, ' - ')}</td>
                        <td>{entry.Notes}</td>
                        <td>{entry.Payment}</td>
                        <td>{entry.Receipt}</td>
                    </tr>
                )
            }) }

            <tr>
                <td style = {{textAlign:'right',fontSize:'20px',fontWeight:'bold',border:'2px solid'}}colSpan={2}>Total</td>
                <td style = {{fontSize:'20px',fontWeight:'bold',border:'2px solid'}}>{LedDebitTotal}</td>
                <td style = {{fontSize:'20px',fontWeight:'bold',border:'2px solid'}}>{LedCreditTotal}</td> 
            </tr>
            <tr>
            <td style = {{textAlign:'right',fontSize:'25px'}}colSpan={2}>Closing Balance</td>
            <td style = {{fontSize:'25px',fontWeight:'bold',border:'None'}}>{LedDebitTotal>LedCreditTotal ? LedDebitTotal-LedCreditTotal + " Db": '' }</td>
            <td style = {{fontSize:'25px',fontWeight:'bold',border:'None'}}>{LedDebitTotal<LedCreditTotal ? LedCreditTotal-LedDebitTotal + " Cr" : '' }</td>

            </tr>
            </table>
        </div>
      )
}
