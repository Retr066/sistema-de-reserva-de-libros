import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import connectMongoose from '@config/mongoose';
dotenv.config();

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const bookRoutes = require('./routes/books');
// const reservationRoutes = require('./routes/reservations');

const app = express();

app.use(cors());
app.use(express.json());

console.log('Connecting to MongoDB');

connectMongoose();

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api', router);



// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


