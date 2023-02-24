const express = require('express'); 
const app = express(); 
const PORT = 6000; 
app.use(express.json());


app.get('/', (req, res) => {
    console.log(`Hello from Home Page`);
    res.send('Hello from Homepage.'); 
})


app.post('/rating', (req, res) => {

    console.log('POST request succeeded')
    const results = []
    const keywords = ['crash', 'collide', 'scratch', 'bump', "smash"]
    const usertext = req.body.claim_history;  
    keywords.forEach(keyword => {
        const count = (usertext.match(new RegExp(keyword, `gi`)) || []).length; 
        results.push({count})
    })
    
    if(!usertext) {
        return res.status(400).json({ error: 'Invalid input. A non-empty string is required in claim_history field'});
    }
    // error handling still needs to be fixed. We get a 200 response if numbers are entered even though it should return an error
    if (typeof usertext !=='string') {
        return res.status(400).json({ error: 'Invalid input. A non-empty string is required in claim_history field'});
    }

    // .reduce() method sums up the count for each keyword counted in the string
    const rating = results.reduce((acc, cur) => {
            return acc + cur.count;}, 0)
            
    // This makes sure the rating stays between 1 and 5 
    const limitedRating = Math.min(Math.max(rating, 1), 5); 
    res.json({risk_rating: limitedRating})
    
   
})

const server = app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))

// Exports server object into other modules to be used 
module.exports = server; 