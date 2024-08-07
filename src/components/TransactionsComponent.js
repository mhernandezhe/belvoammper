import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './components/api.js';
import EnhancedCharts from './components/EnhancedCharts';
import { Button, Container, Grid, Box, Typography, CircularProgress } from '@mui/material';

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('transactions'); // Estado para gestionar la vista actual

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data.transactions || data.results || data);
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
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" onClick={() => setView('transactions')}>
              Transaction List
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => setView('scatter')}>
              Scatter Plot
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => setView('histogram')}>
              Histogram
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => setView('lineChart')}>
              Line Chart
            </Button>
          </Grid>
        </Grid>
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
    </Container>
  );
};

export default TransactionsComponent;
