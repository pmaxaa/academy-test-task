import { Flight } from '../types/types'

class FormatData {
	time = (str: string) => {
		return str.slice(str.indexOf('T') + 1, str.indexOf('T') + 6)
	}
	date = (str: string) => {
		const day = str.slice(str.indexOf('T') - 2, str.indexOf('T'))
		const month = str.slice(str.indexOf('T') - 5, str.indexOf('T') - 3)
		return `${day}.${month}`
	}
	minutes = (str: string) => {
		return Number(str.match(/(?<=H)\d+/))
	}
	hours = (str: string) => {
		return Number(str.match(/(?<=PT)\d+/))
	}

	getStops = (flight: Flight) => {
		const segments = flight.itineraries[0].segments
		const stops = segments.map(segment => {
			return segment.arrival.iataCode
		})
		if (stops.length > 1) {
			stops.pop()
			return stops.join(', ')
		} else return ''
	}
}

export const formatData = new FormatData()
