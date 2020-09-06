const multer = require('multer');
const path = require('path'); // path resolve, ele auxilia na transição de pasta windows \\ outros //.

module.exports = {
    storage: multer.diskStorage({
        // __dirname é uma variavel global, que sempre pega a localização do arquivo que o usa.
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => { // cb( erro,nome do arquivo, ) //callback
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext); // pega o nome da imagem removendo a extensão.


            // ${path.extname(file.originalname)} busca a extensão do arquivo (com o ponto)= ".png"
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};