import express from 'express';
import userRoutes from './routes/registerRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1', userRoutes);
app.use('/api/v1', registerRoutes);
app.use('/api/v1', protectedRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

