import { promises as fsc } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fsc.readFile(jsonDirectory + '/airports.json', 'utf8');
    const airports = JSON.parse(fileContents);
    res.status(200).json(airports);
}