import express from 'express';
import './db/mongoose.js';
import { userRouter } from './routers/user.js';
import { trackRouter } from './routers/track.js';
import { groupRouter } from './routers/group.js';
import { challengeRouter } from './routers/challenge.js';
import { defaultRouter } from './routers/default.js';

export const app = express();
const port = process.env.PORT || 3000;

app.use('/tracks', trackRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/challenges', challengeRouter);
app.use(defaultRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});