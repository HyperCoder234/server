const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS) for your website
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {    
    res.sendFile(__dirname + '/public/index.html');
});

// API Endpoint for Tours
const tours = [
    { id: 1, name: 'Mountain Adventure', location: 'Himalayas', price: 250 },
    { id: 2, name: 'Beach Escape', location: 'Maldives', price: 500 },
    { id: 3, name: 'Safari Tour', location: 'Kenya', price: 300 },
];

// API to get all tours
app.get('/api/tours', (req, res) => {
    res.json(tours);
});

// API to get a specific tour by ID
app.get('/api/tours/:id', (req, res) => {
    const tour = tours.find(t => t.id == req.params.id);
    if (!tour) return res.status(404).send('Tour not found');
    res.json(tour);
});

// API to create a new tour
app.post('/api/tours', (req, res) => {
    const newTour = {
        id: tours.length + 1,
        name: req.body.name,
        location: req.body.location,
        price: req.body.price
    };
    tours.push(newTour);
    res.status(201).json(newTour);
});

// API to update a tour
app.put('/api/tours/:id', (req, res) => {
    const tour = tours.find(t => t.id == req.params.id);
    if (!tour) return res.status(404).send('Tour not found');

    tour.name = req.body.name || tour.name;
    tour.location = req.body.location || tour.location;
    tour.price = req.body.price || tour.price;

    res.json(tour);
});

// API to delete a tour
app.delete('/api/tours/:id', (req, res) => {
    const tourIndex = tours.findIndex(t => t.id == req.params.id);
    if (tourIndex === -1) return res.status(404).send('Tour not found');

    tours.splice(tourIndex, 1);
    res.send('Tour deleted');
});

// Create the server using the http module
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
