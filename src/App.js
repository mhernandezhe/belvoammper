import React, { useEffect, useState } from 'react';


// Suponiendo que fetchTransactions está en el archivo api.js
import { fetchTransactions } from './components/api.js'; // Actualiza la importación

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
       // console.log('Data from API:', data); // Verifica la estructura de los datos aquí
        setTransactions(data.transactions || data); // Ajusta según la estructura de datos
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err);
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading transactions: {error.message}</p>;

  return (
    <div>
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Name</th>
            <th>Institution</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Description</th>
            <th>Value Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.results && transactions.results.length > 0 ? (
            transactions.results.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.account.name}</td>
                <td>{transaction.account.institution.name}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.description}</td>
                <td>{transaction.value_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsComponent;