import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './components/api.js';
import EnhancedCharts from './components/EnhancedCharts';
import { Button, Container, Grid, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('transactions'); // Estado para gestionar la vista actual
  const [sortField, setSortField] = useState('id'); // Campo de ordenamiento
  const [sortOrder, setSortOrder] = useState('asc'); // Orden: 'asc' o 'desc'

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

  const sortTransactions = (field) => {
    return [...transactions].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedTransactions = sortTransactions(sortField);

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
          <Box mb={2}>
            <Button variant="outlined" onClick={() => handleSort('id')}>Sort by ID</Button>
            <Button variant="outlined" onClick={() => handleSort('account.name')}>Sort by Account Name</Button>
            <Button variant="outlined" onClick={() => handleSort('account.institution.name')}>Sort by Institution</Button>
            <Button variant="outlined" onClick={() => handleSort('type')}>Sort by Type</Button>
            <Button variant="outlined" onClick={() => handleSort('amount')}>Sort by Amount</Button>
            <Button variant="outlined" onClick={() => handleSort('currency')}>Sort by Currency</Button>
            <Button variant="outlined" onClick={() => handleSort('description')}>Sort by Description</Button>
            <Button variant="outlined" onClick={() => handleSort('value_date')}>Sort by Value Date</Button>
          </Box>
          <TableContainer component={Paper}>
            <Table style={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Institution</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Value Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.account.name}</TableCell>
                      <TableCell>{transaction.account.institution.name}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.currency}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.value_date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No transactions available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {view !== 'transactions' && transactions.length > 0 && (
        <EnhancedCharts data={transactions} view={view} />
      )}
    </Container>
  );
};

export default TransactionsComponent;
