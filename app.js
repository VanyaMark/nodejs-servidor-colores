const colors = ['#2E191B', '#0B6623', '#000080'] // Vermillion, Forest, Navy
const http = require('http')
const url = require('url');

const app = http.createServer((req, res) => {
    
    // Sin esta configuración, no podríamos acceptar peticiones desde otro servidor y/o puerto. Esta configuración dice: "Acepta peticiones de otro script; venga de donde venga"

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.url.includes('/color')) {
        // hay parámetros de QueryString
        const adr = req.host + req.url;
        const q = url.parse(adr, true)

        let resultColor = colors[0];

        if (q.query.variant) {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            switch (q.query.variant) {
                case 'red':
                    resultColor = colors[0]
                    break;
                case 'green':
                    resultColor = colors[1];
                    break;
                case 'blue':
                    resultColor = colors[2];
                    break;
            }

        }

        res.write(resultColor)
        res.end()

    }

    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`
            <h1>Bienvenidos a la base de datos de colores de NetMind!</h1>
            <p>Para obtener un color aleatório; tan solo debes hacer una petición GET al endpoint <strong>/color'</strong> </p>
        `)
        res.end()
    }
})

app.listen(3000)