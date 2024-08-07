import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './components/api.js'; // Actualiza la importación
import EnhancedCharts from './components/EnhancedCharts'; // Asegúrate de que la ruta sea correcta
import { Button, Container, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const App = () => {
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
          <Button variant="contained" onClick={() => setView('line')} sx={{ mr: 1 }}>
            Line Chart
          </Button>
        </Box>

        {view === 'transactions' && (
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              Transactions
            </Typography>
            <TableContainer component={Paper}>
              <Table style={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('id')}>ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('account.name')}>Account Name {sortField === 'account.name' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('account.institution.name')}>Institution {sortField === 'account.institution.name' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('type')}>Type {sortField === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('amount')}>Amount {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('currency')}>Currency {sortField === 'currency' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('description')}>Description {sortField === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
                    <TableCell onClick={() => handleSort('value_date')}>Value Date {sortField === 'value_date' && (sortOrder === 'asc' ? '↑' : '↓')}</TableCell>
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
      </Box>
    </Container>
  );
};

export default App;
