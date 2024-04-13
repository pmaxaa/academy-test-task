import { create } from 'zustand'
import { Flight } from '../../types/types'

type State = {
	flights: Array<Flight>
}

type Action = {
	setFlights: (flights: State['flights']) => void
	sortByCost: () => void
	sortByTime: () => void
}

const getTime = (str: string) => {
	const hours = Number(str.match(/(?<=PT)\d+/))
	const minutes = Number(str.match(/(?<=M)\d+/))
	const time = hours * 60 + minutes
	return time
}

const useFlightStore = create<State & Action>(set => ({
	flights: [],
	setFlights: flights => set({ flights: flights }),
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
