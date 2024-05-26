import airports from '../data/airports.json';

export default function handler(req, res) {
    res.status(200).json(airports);
}
