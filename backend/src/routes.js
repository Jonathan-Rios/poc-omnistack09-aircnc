const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store); //upload.array se fosse várias 


routes.get('/dashboard', DashboardController.show);

//Rota encadeada = Nested, "usuário quer criar uma reserva, dentro deste spot"
routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;


// GET, POST, PUT, DELETE

// req.query = acessar query params (para filtros) |O mesmo lista parametros que ficam expostos na URL.
// req.params = Acessar route params (para edição, delete)| Os route params vão direto no url => "http://localhost:3333/users/1".
// req.body = Acessar o corpo da requisição (para criação, edição)
