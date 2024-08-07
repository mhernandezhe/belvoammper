import React, { useState, useEffect } from 'react';
import { getTransactions } from './components/api.js';
import TransactionsTable from './components/TransactionsTable';
import Charts from './components/Charts.js';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
        setError('Error fetching transactions. Please try again later.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transactions.length > 0 ? (
        <>
          <TransactionsTable data={transactions} />
          <Charts data={transactions} />
        </>
      ) : (
        !error && <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;