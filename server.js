import app from './src/app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server rodando no endereço http://localhost:3000/`));