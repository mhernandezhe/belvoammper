import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './components/api.js'; // Actualiza la importación
import EnhancedCharts from './components/EnhancedCharts'; // Asegúrate de que la ruta sea correcta
import { Button, Container, Box, Typography, CircularProgress } from '@mui/material';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('transactions'); // Estado para gestionar la vista actual

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data.transactions || data.results || data); // Ajusta según la estructura de datos
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err);
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading transactions: {error.message}</Typography>;

  return (
    <Container>
      <Box my={4}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="contained" onClick={() => setView('transactions')} sx={{ mr: 1 }}>
            Transaction List
          </Button>
          <Button variant="contained" onClick={() => setView('scatter')} sx={{ mr: 1 }}>
            Scatter Plot
          </Button>
          <Button variant="contained" onClick={() => setView('histogram')} sx={{ mr: 1 }}>
            Histogram
          </Button>
          <Button variant="contained" onClick={() => setView('lineChart')} sx={{ mr: 1 }}>
            Line Chart
          </Button>
        </Box>

        {view === 'transactions' && (
          <Box>
            <Typography variant="h4" gutterBottom>
              Transactions
            </Typography>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
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
          </Box>
        )}

        {view !== 'transactions' && transactions.length > 0 && (
          <EnhancedCharts data={transactions} view={view} />
        )}
      </Box>
    </Container>
  );
};

export default App;
