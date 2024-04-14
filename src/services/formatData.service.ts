import { Flight } from '../types/types'

class FormatData {
	time = (str: string) => {
		return str.slice(str.indexOf('T') + 1, str.indexOf('T') + 6)
	}
	date = (str: string) => {
		const day = str.slice(str.indexOf('T') - 2, str.indexOf('T'))
		const month = str.slice(str.indexOf('T') - 5, str.indexOf('T') - 3)
		return `${month}.${day}`
	}
	minutes = (str: string) => {
		return Number(str.match(/(?<=H)\d+/))
	}
	hours = (str: string) => {
		return Number(str.match(/(?<=PT)\d+/))
	}

	getStops = (flight: Flight) => {
		flight.itineraries[0].segments.pop()
		console.log(flight.itineraries[0].segments)
		const stops = flight.itineraries[0].segments.reduce(function (
			res,
			segment
		) {
			return res.concat(segment.arrival.iataCode)
		},
		'')
		console.log(stops)
		return stops
	}
}

export const formatData = new FormatData()
