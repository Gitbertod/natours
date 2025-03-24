const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkID = (req,res,next,val) =>{//middleware para comprobar si el id es valido en la ruta de tour
    if (req.params.id * 1 > tours.length) {
        console.log("Entrando")
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}

exports.checkBodyMiddleware = (req,res, next ) =>{
    if(!req.body.name ||!req.body.price){
        return res.status(400)
        .json({message:'faltan propiedades'})
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

exports.getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id);

    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }
    })
}
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({// este status code (201) significa que el objeto fue creado
            status: 'success',
            data: {
                tour: newTour
            }

        })
    })
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...'
        }
    })
}

exports.deleteTour = (req, res) => { 
    res.status(204).json({
        status: 'success',
        data: null
    });
}



