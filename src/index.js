
import dotenv from 'dotenv'
import connectDB from './Db/db.js'
import app from './app.js'
dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 5000
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    }
    )
})
.catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`)
})


