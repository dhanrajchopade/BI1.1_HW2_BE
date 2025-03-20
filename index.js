const express = require("express")
const app = express()

const {initializeDatabase} = require("./db/db.connect")

const Hotel = require("./models/hotel.models")

app.use(express.json())
initializeDatabase()



const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Delete Hotel

app.delete("/hotels/:id", async(req,res)=>{
    try{
const hotelId = req.params.id
const deletedHotel = await Book.findByIdAndDelete(hotelId)
if(deletedHotel){
    res.status(200).json({message:"Hotel deleted successfully by Id."})
}else{
    res.status(404).json({error:"Hotel not found"})
}
    }catch(error){
        res.status(500).json({error:"Failed to delete hotel.", error})
    }
})




// Post details

app.post("/hotels", async(req,res)=>{
    try{
        const newHotel = new Hotel(req.body)
        if(newHotel){
            await newHotel.save()
            res.status(200).json({message:"Hotel added successfully", hotel:newHotel})
        }else{
res.status(404).json({error:"Hotel details required"})
        }

    }catch(error){
        res.status(500).json({error:"Failed to add Hotel.",error})
    }
})



//  get all Hotel data

async function readallHotels() {
  try{
const allHoteldetails = await Hotel.find()
return allHoteldetails
  }catch(error){
    console.log(error)
  }
}

app.get("/hotels", async(req,res)=>{
  try{
    const hotel = await readallHotels()
    if(hotel.length!=0){
    res.json(hotel)
    }else{
      res.status(404).json({error:"No Hotel found."})
    }
  }catch(error){
    res.status(500).json({error:"Failed to fetch restaurants."})
  }
})

async function readHotelbyName(hotelName) {
  try{
const hotelByName = await Hotel.find({name:hotelName})
return hotelByName
  }catch(error){
    console.log(error)
  }
}

app.get("/hotels/:hotelName", async(req,res)=>{
  try{
    const hotels = await readHotelbyName(req.params.hotelName)
    if(hotels.length!=0){
      res.json(hotels)
    }else{
      res.status(404).json({error:"No Hotel found."})
    }
  }catch(error){
    res.status(500).json({error:"Failed to fetch restaurants."})
  }
})


async function readHotelByphoneNumber(HotelphoneNumber) {
  try{
    const hotels = await Hotel.find({phoneNumber:HotelphoneNumber})
    return hotels
  }catch(error){
    console.log(error)
  }
}

app.get("/hotels/directory/:HotelphoneNumber", async(req,res)=>{
  try{
    const hotel = await readHotelByphoneNumber(req.params.HotelphoneNumber)
    if(hotel.length!=0){
      res.json(hotel)
    }else{
      res.status(404).json({error:"No Hotel found."})
    }
  }catch(error){
    res.status(500).json({error:"Failed to fetch restaurants."})
  }
})


async function readHotelbyRating(hotelRating) {
  try{
    const hotelByRating = await Hotel.find({rating:hotelRating})
    return hotelByRating
  }catch(error){
    console.log(error)
  }
  
}

app.get("/hotels/rating/:hotelRating", async(req,res)=>{
  try{
    const hotel = await readHotelbyRating(req.params.hotelRating)
    if(hotel.length !=0){
      res.json(hotel)
    }else{
      res.status(404).json({error:"No Hotel found."})
    }

  }catch(error){
    res.status(500).json({error:"Failed to fetch restaurants."})
  }
})

async function getHotelbyCategory(hotelCategory) {
  try{
    const hotelByCategory = await Hotel.find({category:hotelCategory})
    return hotelByCategory
  }catch(error){
    console.log(error)
  }
  }
app.get("/hotels/category/:hotelCategory", async(req,res)=>{
  try{
    const hotel = await getHotelbyCategory(req.params.hotelCategory)
    if(hotel.length!=0){
      res.json(hotel)
    }else{
      res.status(404).json({error:"No Hotel found."})
    }
  }catch(error){
    res.status(500).json({error:"Failed to fetch restaurants."})
  }
})

const PORT = 3000
app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`)
})
