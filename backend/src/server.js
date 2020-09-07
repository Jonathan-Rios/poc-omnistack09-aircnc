const express = require('express'); // auxiliar de con
const routes = require('./routes'); 
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const socketio = require('socket.io');
const http = require('http');


const app = express();
const server = http.Server(app); // extraindo o server http de dentro do express
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.i5ohh.mongodb.net/omnistack9?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*  Este método não é legal para projetos em produção, deveria ser um banco bem rápido
    para armazenar os usuários conectados na aplicação
    Recomendado : Redis  = Feito para isso
    MongoDB = funciona
*/
const connectedUsers = {}; 

io.on('connection', socket => { //salvar todos usuários logados na aplicação
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;


    socket.on('hello', message => {
        console.log(message);
    })
 
    setTimeout( () => {
        socket.emit('world', {
            message: 'OmniStack'
        });
    }, 5000)
});

app.use((req, res, next) => { // adiciona uma funcionalidade em TODA rota (seja Post, Get, Put... )
    req.io = io; // assim em todas as rotas, que tiverem o req vai ser possivel chamar o IO ( Front ou Mobile )
    req.connectedUsers = connectedUsers; // Todas as rotas teram o acesso aos usuários logados na aplicação.
     
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    

// Access-Control-Allow-Origin: *
// Access-Control-Allow-Origin: <origin>
// Access-Control-Allow-Origin: null


    return next(); // sem isso a aplicação NÃO RODA! - fica parada
})

app.use(express.json()); //Adicionamos o Json no Express(Por default o express não entende o JSON).
//app.use(express.multer()); //Adicionamos o Json no Express(Por default o express não entende o JSON).
app.use('/files', express.static(path.resolve(__dirname, '..','uploads'))); // retorna arquivos estáticos, arquivos de imagem.
app.use(cors()); // cors() = qualquer acessa | cors({ origin: 'http://localhost:3333' }) Acesso limitado
app.use(routes);


server.listen(3333);// porta que estará rodando a aplicação
