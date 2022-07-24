import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

const theme = createTheme();

export default function Home() {
  var [name, setName] = useState()
  var [preco, setPreco] = useState()
  var [preferencia, setPreferencia] = useState()
  var [product, setProduct] = useState([])
  var [orcamento, setOrcamento] = useState()
  var [buyList, setBuyList] = useState([])

  const handleAdd = async() => {
    await setProduct( previus => [...previus, [name, Number(preco), Number(preferencia)]] )
    setPreferencia('')
    name = null
    preco = null
    preferencia = null
    orcamento = null
  }


  function ProductList(props){
    const list = props.list;
    const listItems = list.map((product) => 

      <TableRow key={product[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">{product[0]}</TableCell>
        <TableCell align="right">{product[1]}</TableCell>
        <TableCell align="right">{product[2]}</TableCell>

      </TableRow>

    );
    return(
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Preferência</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listItems}
          </TableBody>

        </Table>
      </TableContainer>
    );
  }

  function ListOptions(){
    const list = [...Array(10).keys()].map(i => i+1)
    const listOptions = list.map((option) =>
      <option value={option}>
        {option}
      </option>
    )
    return listOptions
  }

  const greed = async() => {
    console.log('greed')
    await product.sort(function (a,b){
      return a[1]/a[2]-b[1]/b[2]
    });
    let total = orcamento;
    await setBuyList([]);
    for(var i = 0; i < product.length; i++){
      if(total - product[i][1] >= 0){
        total -= product[i][1];
        await setBuyList(previus => [...previus, product[i]])
      }
    }
  }
 

  function ShowBar(props) {
    let products = props.list;
    let total = props.orcamento;
    let parts = products.map((product) => {
      var barStyle = {
        height: 100 + '%',
        width: Math.floor(product[1] / total * 100) + '%',
        backgroundColor: product[3]
      }
      return (
        <div className="itemBar" style={barStyle}>
          <spam className="whichItem">{product[0]}</spam>
        </div>
      );
    });
    return parts;
  }

  const setDefaults = async() => {
    console.log('limpar')
    await setName(' ');
    await setPreco(' ');
    await setPreferencia(' ');
    await setProduct([]);
    await setBuyList([]);
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url()',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',}}
        >
          <ProductList list={product}/>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Compras
            </Typography>
            <Box sx={{ mt: 1 }}>
            <TextField
                margin="Orçamento"
                fullWidth
                id="Orçamento"
                label="Orçamento"
                name="Orçamento"
                autoComplete="Orçamento"
                autoFocus
                sx={{mb: 3}}
                value={orcamento}
                onChange={(event) => {setOrcamento(Number(event.target.value))}}
              />
              <TextField
                margin="Nome"
                fullWidth
                id="Nome"
                label="Nome"
                name="Nome"
                autoComplete="Nome"
                sx={{mb: 3}}
                value={name}
                onChange={(event) => {setName(event.target.value)}}
              />
              <TextField
                margin="Preço"
                fullWidth
                name="Preço"
                label="Preço"
                type="Preço"
                id="Preço"
                autoComplete="Preço"
                sx={{mb: 3}}
                value={preco}
                onChange={(event) => {setPreco(Number(event.target.value))}}
              />
              <TextField
                margin="Prioridade"
                fullWidth
                name="Prioridade"
                label="Prioridade"
                type="Prioridade"
                id="Prioridade"
                autoComplete="Prioridade"
                value={preferencia}
                onChange={(event)=>{setPreferencia(event.target.value)}}
              />
              <Button
                type="submit"
                //fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 4 }}
                onClick={ handleAdd }
              >
                Adicionar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 4 }}
                onClick={ greed }
              >
                Resultado
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ setDefaults }
              >
                Limpar tudo
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}