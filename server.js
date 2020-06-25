const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public')) //express observa a pasta public para servir ao servidor os arquivos estáticos (arquivos de estilização)

server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/57725183?s=400&u=6161e928ab97d71f8b0e97c2a6b234ddedd33409&v=4",
        name: "Marcos Vinícius",
        role: "Aluno - Rocketseat",
        description: 'Futuro programador Full-stack, focado no desenvolvimento de aplicações Web e Mobile. Estudante da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/MVinicius43/" },
            { name: "Facebook", url: "https://facebook.com" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/marcos-vin%C3%ADcius-em%C3%ADdio-silva-398b5b190/" }
        ]
    }


    return res.render("about", { about: about })
})

server.get("/portifolio", (req, res) => {
    return res.render("portifolio", { items: videos })
})

server.get("/video", (req, res) => {
    const id = req.query.id

    const video = videos.find(video => {
        return video.id == id
    })

    if (!video) {
        res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, () => {
    console.log('server is running')
})