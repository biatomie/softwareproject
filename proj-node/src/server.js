import app from './app.js'

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}` )
})
