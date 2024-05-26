import flights from '../data/flights.json';

export default function handler(req, res) {
    const { airportId, date } = req.query;
    const filteredFlights = flights.filter(
        (flight) => flight.airportId === parseInt(airportId) && flight.date === date
    );
    res.status(200).json(filteredFlights);
}
