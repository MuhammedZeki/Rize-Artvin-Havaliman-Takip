const express = require("express")
const router = express.Router()
const db = require("../data/db")


//AİRLİNES CREATE
router.get("/admin/airlines/create",async(req,res)=>{
    try{
        res.render("admin/airlines-create",{
            title:"Airlines Create"
        })
    }
    catch(err){console.log(err)}
})
router.post("/admin/airlines/create",async(req,res)=>{
    const name = req.body.name
    const country = req.body.country
    const resim = req.body.resim
    const icao = req.body.icao
    const iata = req.body.iata

    try{
        await db.execute("INSERT INTO airlines(name,country,icao,iata,resim) VALUES(?,?,?,?,?)",[name,country,icao,iata,resim])
        res.redirect("/admin/airlines")
    }
    catch(err){console.log(err)}
})
//AİRLİNES EDİT
router.get("/admin/airlines/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const [airlines,] = await db.execute("select * from airlines where idairlines=?",[id])
        console.log(airlines)
        res.render("admin/airlines-edit",{
            title:"Airlines Edit",
            airlines:airlines[0]
        })
    }
    catch(err){console.log(err)}
})
router.post("/admin/airlines/:id",async(req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const country = req.body.country
    const resim = req.body.resim
    const icao = req.body.icao
    const iata = req.body.iata
    try{
        await db.execute("UPDATE airlines SET name=?, country=?, icao=?, iata=? ,resim=? where idairlines=? ",[name,country,icao,iata,resim,id])
        res.redirect("/admin/airlines")
    }
    catch(err){console.log(err)}
})
//AİRLİNES DELETE
router.get("/admin/airlines/delete/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const [airlines,] = await db.execute("select * from airlines where idairlines=?",[id])
        res.render("admin/airlines-delete",{
            title:"Airlines Delete",
            airlines:airlines[0]
        })
    }
    catch(err){console.log(err)}
})
router.post("/admin/airlines/delete/:id",async(req,res)=>{
    const id = req.body.id
    try{
        await db.execute("DELETE from airlines where idairlines=?",[id])
        res.redirect("/admin/airlines")
    }
    catch(err){console.log(err)}
})
//AİRLİNES ANASAYFA
router.get("/admin/airlines",async(req,res)=>{
    try{
        const [airlines,] = await  db.execute("select * from airlines")

        res.render("admin/airlines-list",{
            title:"Airlines List",
            airlines:airlines
        })
    }
    catch(err){console.log(err)}
})


//FLİGHT CREATE
router.get("/admin/flight/create",async(req,res)=>{
    try{
        const [airlines,]= await db.execute("select * from airlines")
        res.render("admin/flight-create",{
            title:"Flight Create",
            airlines:airlines
        })
    }
    catch(err){console.log(err)}
})
router.post("/admin/flight/create",async(req,res)=>{
    const idairlines = req.body.sirket
    const origin = req.body.origin
    const destination = req.body.destination
    const f_number = req.body.flight_number
    try{
        await db.execute("INSERT INTO flights(origin,destination,flight_number,idairlines) VALUES (?,?,?,?)",[origin,destination,f_number,idairlines])
        res.redirect("/admin/flight")
    }
    catch(err){console.log(err)}
})
//FLİGHTS EDİT
router.get("/admin/flight/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const [flights,] = await db.execute("select * from flights where idflights=?",[id])
        if(flights[0]){
            return res.render("admin/flight-edit",{
                title:"Flight Edit",
                flights:flights[0]
            })
            res.redirect("/admin/flight")
        }
    }
    catch(err){console.log(err)}
})
router.post("/admin/flight/:id",async(req,res)=>{
    try{
        const id = req.body.id
        const kalkis = req.body.kalkis
        const inis = req.body.inis
        const flight_number= req.body.flight_number
        await db.execute("UPDATE flights SET origin=?, destination=?, flight_number=? where idflights=?",[kalkis,inis,flight_number,id])
        res.redirect("/admin/flight")
    }
    catch(err){console.log(err)}
})
//FLİGHTS DELETE
router.get("/admin/flight/delete/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const [flights,] = await db.execute("SELECT flights.idflights, airlines.name, airlines.resim, flights.origin, flights.destination, flights.flight_number FROM flights INNER JOIN airlines ON flights.idairlines=airlines.idairlines where idflights=?",[id])
        if(flights[0]){
            return res.render("admin/flight-delete",{
                title:"Flight Delete",
                flights:flights[0]
        })
        res.redirect("/admin/flight")
    }}
    catch(err){console.log(err)}
    
})
router.post("/admin/flight/delete/:id",async(req,res)=>{
    const id = req.body.id
    try{
        await db.execute("DELETE from flights where idflights=?",[id])
        res.redirect("/admin/flight")
    }
    catch(err){console.log(err)}
})
//FLİGHT ANASAYFA
router.get("/admin/flight",async(req,res)=>{
    try{
        const [flights,] = await db.execute("SELECT flights.idflights, airlines.name, airlines.resim, flights.origin, flights.destination, airlines.country, flights.flight_number FROM flights INNER JOIN airlines ON flights.idairlines=airlines.idairlines") 
        res.render("admin/flight-list",{
            title:"Flight Listesi",
            flights:flights
        })
    }
    catch(err){console.log(err)}
})



//PASSENGER CREATE
router.get("/admin/passenger/create",async(req,res)=>{
    try{
        const [flights,] = await db.execute("select flight_number,idflights from flights ")
        res.render("admin/passenger-create",{
            title:"Passenger Create",
            flights:flights
        })
    }
    catch(err){console.log(err)}
})
router.post("/admin/passenger/create",async(req,res)=>{
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const nationality = req.body.nationality
    const idflights = req.body.flight_number
    try{
        await db.execute("INSERT INTO passenger(first_name,last_name,nationality,idflights) VALUES (?,?,?,?)",[first_name,last_name,nationality,idflights])
        res.redirect("/admin/passenger")
    }
    catch(err){console.log(err)}
})
//PASSENGER EDİT
router.get("/admin/passenger/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const [passenger,] = await db.execute("select * from passenger where idpassenger=?",[id])
        const [flights,]  = await db.execute("select * from flights")
        if(passenger[0]){
            return res.render("admin/passenger-edit",{
                title:"Passenger Edit",
                passenger:passenger[0],
                flights:flights
            })
        }
        res.redirect("/admin/passenger")
    }
    catch(err){console.log(err)}
})
router.post("/admin/passenger/:id",async(req,res)=>{
    const id = req.body.id
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const nationality = req.body.nationality
    const idflights = req.body.flight_number
    try{
        await db.execute("UPDATE passenger SET first_name=?, last_name=?, nationality=?, idflights=? where idpassenger=? ",[first_name,last_name,nationality,idflights,id])
        res.redirect("/admin/passenger")
    }
    catch(err){console.log(err)}
})
//PASSENGER DELETE
router.get("/admin/passenger/delete/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const [passenger,] = await db.execute("SELECT passenger.idpassenger, flights.flight_number, passenger.first_name, passenger.last_name FROM passenger INNER JOIN flights ON passenger.idflights=flights.idflights where idpassenger=?",[id])
        if(passenger[0]){
            return res.render("admin/passenger-delete",{
                title:"Passenger Delete",
                passenger:passenger[0]
            })
        }
        res.redirect("/admin/passenger")
    }
    catch(err){console.log(err)}
})
router.post("/admin/passenger/delete/:id",async(req,res)=>{
    const id = req.body.id
    try{
        await db.execute("DELETE from passenger where idpassenger=?",[id])
        res.redirect("/admin/passenger")
    }
    catch(err){console.log(err)}
})
//PASSENGER ANASAYFA
router.get("/admin/passenger",async(req,res)=>{
    const [passengers,] = await db.execute("SELECT passenger.idpassenger, flights.flight_number, passenger.first_name, passenger.last_name, passenger.nationality FROM passenger INNER JOIN flights ON passenger.idflights=flights.idflights")
    try{
        res.render("admin/passenger-list",{
            title:"Passenger Listesi",
            passengers:passengers
        })
    }
    catch(err){console.log(err)}
})
module.exports=router
