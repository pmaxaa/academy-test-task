import { Flight } from '../types/types'

export class FormatData {
	constructor(private flight: Flight) {}

	segments = this.flight.itineraries[0].segments
	firstSegment = this.segments[0]
	numberOfStops = this.segments.length - 1
	lastSegment = this.segments[this.numberOfStops]
	flightDuration = this.flight.itineraries[0].duration
	carrierCode = this.firstSegment.carrierCode

	time = (str: string) => {
		return str.slice(str.indexOf('T') + 1, str.indexOf('T') + 6)
	}
	date = (str: string) => {
		const day = str.slice(str.indexOf('T') - 2, str.indexOf('T'))
		const month = str.slice(str.indexOf('T') - 5, str.indexOf('T') - 3)
		return `${day}.${month}`
	}

	route = `${this.firstSegment.departure.iataCode} - ${this.lastSegment.arrival.iataCode}`
	routeTime = `${this.time(this.firstSegment.departure.at)} - ${this.time(
		this.lastSegment.arrival.at
	)}`

	duration = () => {
		return `${this.hours()}ч ${this.minutes()}мин`
	}
	minutes = () => {
		return Number(this.flightDuration.match(/(?<=H)\d+/))
	}
	hours = () => {
		return Number(this.flightDuration.match(/(?<=PT)\d+/))
	}

	cost = () => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			maximumFractionDigits: 0,
		}).format(parseInt(this.flight.price.total))
	}

	getStops = () => {
		const stops = this.segments.map(segment => {
			return segment.arrival.iataCode
		})
		if (stops.length > 1) {
			stops.pop()
			return stops.join(', ')
		} else return ''
	}

	getAllTransfers = () => {
		const allTransfers = this.segments.map(segment => {
			return {
				route: `${segment.departure.iataCode} - ${segment.arrival.iataCode}`,
				routeTime: `${this.time(segment.departure.at)} - ${this.time(
					segment.arrival.at
				)}`,
				duration: `${Number(segment.duration.match(/(?<=PT)\d+/))}ч ${Number(
					segment.duration.match(/(?<=H)\d+/)
				)}мин`,
			}
		})
		return allTransfers
	}
}
