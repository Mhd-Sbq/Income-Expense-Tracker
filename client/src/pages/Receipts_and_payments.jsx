
import { React, useEffect, useState } from 'react'

import {getAllEntries , getOneEntry , createOneEntry , UpdateOneEntry , DeleteOneEntry} from '../api'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import './rp.css'


export default function Receipts_and_payments() {

    
    const [Data,setData] = useState([])
    const[Ledgers,setLedgers] = useState([])


    ///////////////////// FETCHING ALL THE ENTRIES DATA
    useEffect(() =>{
    const gettingdata  = async () => {
        let datacheck = await getAllEntries()
        
        if (datacheck){
        setData(datacheck)}
    } 
    gettingdata()
    },[Data])

    /////////////// Now the Ledgers State has all the Ledger names from the Entries Data
    useEffect(() => {
        const ledgers = Data.map((entry) => entry.Ledger);
        setLedgers(ledgers);
    },[Data])



    const[datevalue,setDateValue] = useState(new Date().toISOString().split('T')[0])
    const[ledgervalue,setledgervalue] = useState('')
    const[receiptvalue,setreceiptvalue] = useState(0)
    const[paymentvalue,setpaymentvalue] = useState(0)
    const[notesvalue,setnotesvalue] = useState('')

    const[editMode,seteditMode] = useState(false)
    const[editId,seteditId] = useState('')


    const add_edit = (checkstate) => {

        if (checkstate === "ADD"){
            const newentry = {
                Date : new Date(datevalue),
                Ledger : ledgervalue,
                Receipt : receiptvalue,
                Payment : paymentvalue,
                Notes : notesvalue
            }
            createOneEntry(newentry)

            setledgervalue('')
            setreceiptvalue(0)
            setpaymentvalue(0)
            setnotesvalue('')



        }

        if(checkstate === "EDIT"){
            const EditEntry = {
                Date : new Date(datevalue),
                Ledger : ledgervalue,
                Receipt : receiptvalue,
                Payment : paymentvalue,
                Notes : notesvalue
            }
            UpdateOneEntry(editId,EditEntry)
            seteditMode(false)

            setDateValue('')
            setledgervalue('')
            setreceiptvalue(0)
            setpaymentvalue(0)
            setnotesvalue('')


        }
    
    
    
    
    }

    const deleteentry = (id) => {
        console.log(id)
        DeleteOneEntry(id)
    }

    const editentry = (entry) => {
        console.log(entry)
        setDateValue(new Date(entry.Date).toISOString().split('T')[0])
        setledgervalue(entry.Ledger)
        setreceiptvalue(entry.Receipt)
        setpaymentvalue(entry.Payment)
        setnotesvalue(entry.Notes)
        seteditMode(true)
        seteditId(entry._id)

    }

    return (
        <div id="maincontainer">
            <h1>Receipts & Payments</h1>
            <table>
                <h2>Add Entry</h2>
                <tr>
                    <th id = "entryinputdate">Date</th>
                    <th id = "entryinputledger"  >Ledger</th>
                    <th id = "entryinputreceipt">Receipt</th>
                    <th id = "entryinputpayment">Payment</th>
                    <th id = "entryinputnotes" >Notes</th>
                    <th id = "entryinputaddoredit" >Action</th>
                </tr>

                <tr>
                    <th><input value = {datevalue} onChange={(value) => setDateValue(value.target.value)} className='entryinput' type="date" /></th>
                    <th><input value = {ledgervalue} onChange={(value) => setledgervalue(value.target.value)}  className='entryinput'  type="text" /></th>
                    <th><input value = {receiptvalue} onChange={(value) => setreceiptvalue(value.target.value)}   className='entryinput'  type="number" /></th>
                    <th><input value = {paymentvalue} onChange={(value) => setpaymentvalue(value.target.value)}    className='entryinput'  type="number" /></th>
                    <th><input value = {notesvalue} onChange={(value) => setnotesvalue(value.target.value)}    className='entryinput'  type="text" /></th>
                    <th><button onClick={(checkstate) => add_edit(checkstate.target.innerText)} className='entryaddbutton' style = {editMode? {backgroundColor : 'red'}:{}} > {editMode?"EDIT":"ADD"} </button></th>

                </tr>
            </table>


            <h2 id="tableheading" >Day Book</h2>
            <table>
                
                <tr>
                    <th>Date</th>
                    <th>Ledger</th>
                    <th>Receipt</th>
                    <th>Payment</th>
                    <th>Notes</th>
                </tr>
            {Data.map((entry) =>{
                return(
                    
                        <tr>
                            <td id="datecol">{(new Date(entry.Date)).toLocaleDateString('en-GB').replace(/\//g, ' - ')}</td>
                            <td id="ledcol">{entry.Ledger}</td>
                            <td id="reccol">{entry.Receipt}</td>
                            <td id="paycol">{entry.Payment}</td>
                            <td id="notcol">{entry.Notes}</td>
                            <td id="editcol"><FaEdit onClick={() => editentry(entry)}/></td>
                            
                            <td id="delcol"><MdDelete onClick={() => deleteentry(entry._id)}/></td>
                        </tr>
                    

                )
            })}
            </table>


        </div>
    )

      
    }
