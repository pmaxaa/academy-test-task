import { Link, useParams } from 'react-router-dom'
import useFlightStore from '../../../store/store'

export default function Flight() {
	const { id } = useParams()
	const { flights } = useFlightStore()
	const currentFlight = flights.find(item => item.id === id)

	return (
		<>
			<div>Flight page {id}</div>
			<Link to='/'>Back</Link>
			<div> Info about the flight</div>
			<div>{currentFlight?.itineraries[0].duration}</div>
		</>
	)
}
