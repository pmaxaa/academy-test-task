import { create } from 'zustand'
import { Flight } from '../../types/types'

interface IFlightStore {
	flights: Array<Flight>
	setFlights: (newFlight: Array<Flight>) => void
}

const useFlightStore = create<IFlightStore>(set => ({
	flights: [],
	setFlights: (newFlights: Array<Flight>) => set({ flights: newFlights }),
}))
export default useFlightStore
