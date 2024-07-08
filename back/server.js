const express = require('express');
const cors = require('cors'); 
const app = express();
app.use(cors());
app.use(express.json())

const propriedadesRoutes = require('./router/usersroute.js');
const auth = require('./router/auth.js');
// const authRoutes = require('./router/auth.js');

// //define pra que arquivo as rotas vão
// app.use('/auth', authRoutes);   
app.use('/usersroute', propriedadesRoutes);
app.use('/auth', auth);

app.listen(8080, ()=>{
    console.log('Servidor Ouvindo');
});