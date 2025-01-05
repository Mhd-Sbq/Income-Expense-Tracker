
import { React, useEffect, useState } from 'react'

import './led.css'

import {getAllEntries , getOneEntry , createOneEntry , UpdateOneEntry , DeleteOneEntry} from '../api'

import { useNavigate } from 'react-router-dom'



export default function Ledgers() {

    const navigate = useNavigate()

    const [Data,setData] = useState([])
    const[Ledgers,setLedgers] = useState([{}])
    const[sumOFreceipt,setsumOFreceipt] =useState([])
    const[sumOFpayment,setsumOFpayment] =useState([])

    const[selectedLedger,setSelectedLedger] = useState(null)

    const[viewledger,setviewledger] = useState(null)


    ///////////////////// FETCHING ALL THE ENTRIES DATA
    useEffect(() =>{
    const gettingdata  = async () => {
        let datacheck = await getAllEntries()
        
        if (datacheck){
        setData(datacheck)}
    } 
    gettingdata()
    },[])

    /////////////// Now the Ledgers State has all the Ledger names & Receupts & payments from the Entries Data
    useEffect(() => {
        const ledgers = Data.map((entry) => ({
            Ledger : entry.Ledger,
            Receipt : entry.Receipt,
            Payment : entry.Payment,
        }));
        setLedgers(ledgers);
    },[Data])



    const ledgerclicked = (index,ledger) =>{
        console.log("Cliked");
        setSelectedLedger(index)
        setviewledger(ledger)
        
    }


    const viewbuttonledger = () =>{
        navigate('/Viewledger',{ state: { viewledger } })

    }


  return (
    <div>
    <h1>Ledgers</h1>

        <table id = "ledgertable">
            <tr>
                <th>Ledgers</th>

                <th>Net Amount</th>
            </tr>

            {Ledgers.map((Ledger,index) =>{
                return(
                    <tr onClick={() => ledgerclicked(index,Ledger)} key = {index} style={selectedLedger === index ? {backgroundColor : "yellow"} : {}}>
                        <td >{Ledger.Ledger}</td>
                        <td >{Math.abs(Ledger.Receipt-Ledger.Payment)} {(Ledger.Receipt > Ledger.Payment) ? "Cr" : "Db" }</td>
                    </tr>
                )
            })}


        </table>
        <button id = "viewbuttonledger" onClick={viewbuttonledger}>View</button>

    </div>
  )
}








