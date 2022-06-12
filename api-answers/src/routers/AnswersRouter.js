var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const {actionOne, actionTwo, actionThree, actionFour} = require('../applicationLayer/answersActions');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// middleware para hacer algo, por ejemplo usar el helper de prometheus
// contar cuantas veces hacen llamadas a esta api de answers
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
})

//end request middleware
router.use(( err, req, res, next ) => {
    res.on('finish', function() {
        console.log("RESPONSE: ", res);
        trace("RESPONSE");
        trace(res);
    });
})

/** 
 * @openapi
 * /api/answers:
 *   get:
*      description: response if answers api is available
*      responses:
*        200:
*          description: Success
*/
router.get('/', (req, res) => {
    res.status(200).json({
        available:true,
        msg:"welcome to answers api"});
})

/** 
 * @openapi
 * /api/answers/one:
 *   get:
*      description: Obtener el número de respuestas contestadas y no contestadas
*      responses:
*        200:
*          description: Success
*/
router.get('/one', async (req, res) => {
    try {
        const {error, message, data} = await actionOne();
        res.status(200).json(data);
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: ex,
            type:"Exception",
            message:"Exception in server"
        })
    }
})

/** 
 * @openapi
 * /api/answers/two:
 *   get:
*      description: Obtener la respuesta con mayor reputación
*      responses:
*        200:
*          description: Success
*/
router.get('/two', async (req, res) => {
    try {
        const {error, message, data} = await actionTwo();
        res.status(200).json(data);
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error:ex,
            type:"Exception",
            message:"Exception in server"
        })
    }
})

/** 
 * @openapi
 * /api/answers/three:
 *   get:
*      description: Obtener la respuesta con menor número de vistas
*      responses:
*        200:
*          description: Success
*/
router.get('/three', async (req, res) => {
    try {
        const {error, message, data} = await actionThree();
        res.status(200).json(data);
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error:ex,
            type:"Exception",
            message:"Exception in server"
        })
    }
})

/** 
 * @openapi
 * /api/answers/four:
 *   get:
*      description: Obtener la respuesta más vieja y más actual
*      responses:
*        200:
*          description: Success
*/
router.get('/four', async (req, res) => {
    try {
        const {error, message, data} = await actionFour();
        res.status(200).json(data);
    }
    catch(ex){
        console.error("four:ex: ", ex);
        console.error("four:ex:data: ", ex.data);
        
        res.status(500).json({
            error:ex,
            type:"Exception",
            message:"Exception in server"
        })
    }
})

module.exports.AnswersRouter = router;