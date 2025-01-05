import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
    <ul>
        <h1 style={{fontSize:'50px',paddingBottom:'10px',paddingTop:'10px',textDecoration:'None'}}>Income & Expense Tracker</h1>
        
    </ul>
      <ul>
      <li>
          <button>
            <Link to="/">Home</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/Receipts_and_payments">Receipts & Payments</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/Ledgers">Ledger View</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}