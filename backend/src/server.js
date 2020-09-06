const express = require('express'); // auxiliar de con
const routes = require('./routes'); 
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
  
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.i5ohh.mongodb.net/omnistack9?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors()); // cors() = qualquer acessa | cors({ origin: 'http://localhost:3333' }) Acesso limitado
app.use(express.json()); //Adicionamos o Json no Express(Por default o express não entende o JSON).
//app.use(express.multer()); //Adicionamos o Json no Express(Por default o express não entende o JSON).
app.use('/files', express.static(path.resolve(__dirname, '..','uploads'))); // retorna arquivos estáticos, arquivos de imagem.
app.use(routes);


app.listen(3333);// porta que estará rodando a aplicação
