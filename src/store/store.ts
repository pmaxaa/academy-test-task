import { create } from 'zustand'
import { flightService } from '../services/flight.service'
import { Flight, IFormData } from '../types/types'

type State = {
	flights: Array<Flight>
	formData: IFormData
	filters: Array<String>
}

type Action = {
	setFlights: (formData: State['formData']) => void
	setFormData: (id: string, value: string) => void
	setFilters: (value: string) => void
	sortByCost: () => void
	sortByTime: () => void
}

const getTime = (str: string) => {
	const hours = Number(str.match(/(?<=PT)\d+/))
	const minutes = Number(str.match(/(?<=H)\d+/))
	const time = hours * 60 + minutes
	return time
}

const useFlightStore = create<State & Action>(set => ({
	flights: [],
	formData: {
		origin: '',
		depart: '',
		date: '',
	},
	filters: ['all'],

	setFlights: async formData => {
		const data = await flightService.getFlight(formData)
		if (data) set({ flights: data.flights })
	},

	setFormData: (id, value) =>
		set(state => ({ formData: { ...state.formData, [id]: value } })),

	setFilters: value =>
		set(state => {
			if (state.filters.includes(value)) {
				return { filters: state.filters.filter(option => option !== value) }
			} else {
				return { filters: [...state.filters, value] }
			}
		}),

	sortByCost: () =>
		set(state => ({
			flights: state.flights.sort((a, b) =>
				parseInt(a.price.total) >= parseInt(b.price.total) ? 1 : -1
			),
		})),

	sortByTime: () =>
		set(state => ({
			flights: state.flights.sort((a, b) =>
				getTime(a.itineraries[0].duration) >= getTime(b.itineraries[0].duration)
					? 1
					: -1
			),
		})),
}))
export default useFlightStore
