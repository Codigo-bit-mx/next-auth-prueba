import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb+srv://codigoBitMx:5taffSoport3@cluster0.0txm0.mongodb.net/prueba_log?retryWrites=true&w=majority'; 

const conexionDB = async () => {
    try {
        await mongoose.connect( MONGODB_URL );
    } catch( err ) {
        throw new Error('Succedio un error');
    }
}


export default conexionDB;