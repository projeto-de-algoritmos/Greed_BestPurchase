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
import Background from './shopping-cart.png';

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
    setName('')
    setPreco('')
  }

  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    }
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function ProductList(props){
    const list = props.list;
    const listItems = list.map((product) => 

      <StyledTableRow key={product[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell align="center" component="th" scope="row">{product[0]}</StyledTableCell>
        <StyledTableCell align="center">{product[1]}</StyledTableCell>
        <StyledTableCell align="center">{product[2]}</StyledTableCell>

      </StyledTableRow>

    );
    return(
      <TableContainer sx={{mt: 3, ml:3}} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nome</StyledTableCell>
              <StyledTableCell align="center">Preço</StyledTableCell>
              <StyledTableCell align="center">Preferência</StyledTableCell>
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
        width: 100 + '%',
        marginRight: 50 + '%',
        marginLeft: 50 + '%',
        alignItems: 'center'
      }
      return (
        <div className="itemBar" style={barStyle}>
          {product[0]}
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
            pr:10,
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/09/16/19/19/online-store-1674907_960_720.png)',
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
              my: 4,
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
              <Box
                sx={{
                  marginTop: 32 + 'px',
                  marginBottom: 0,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Carrinho priorizado
                </Typography>

                
              </Box>

              <Box
                sx={{
                  backgroundImage: "url(" + "https://i.ibb.co/NZ0j292/shopping-cart.png" + ")",
                  backgroundPosition: 'center top',
                  width: 545 + 'px',
                  height: 350 + 'px',
                  backgroundSize: 545 + 'px' + ' ' + 470 + 'px',
                  backgroundRepeat: 'no-repeat',
                  marginTop: -40 + 'px'
                }}
              >
                <div className="show-bar" style={{paddingTop: 23 + '%'}}>          
                  <ShowBar list={buyList} orcamento={orcamento}/>        
                </div>
              </Box>
          
                
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}