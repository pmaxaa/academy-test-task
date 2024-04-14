import { useNavigate } from 'react-router-dom'
import { filtersData } from '../../constants'
import { formatData } from '../../services/formatData.service'
import useFlightStore from '../../store/store'

export default function FlightsList() {
	const { flights, filters, sortByCost, sortByTime } = useFlightStore()

	const filteredFlights = flights.filter(item => {
		if (filters.includes('all')) {
			return true
		} else {
			return filters.includes(
				(item.itineraries[0].segments.length - 1).toString()
			)
		}
	})

	const navigate = useNavigate()

	return (
		<>
			<div className='buttons'>
				<button onClick={sortByCost}>Самый дешевый</button>
				<button onClick={sortByTime}>Самый быстрый</button>
			</div>
			<ul>
				{filteredFlights.map(flight => {
					const segments = flight.itineraries[0].segments

					return (
						<li key={flight.id}>
							<div onClick={() => navigate(`/flight/${flight.id}`)}>
								<div className='price'>
									{new Intl.NumberFormat('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										maximumFractionDigits: 0,
									}).format(parseInt(flight.price.total))}
								</div>
								<div className='image'>
									<img
										src={`https://content.airhex.com/content/logos/airlines_${segments[0].carrierCode}_100_30_r.png`}
									/>
								</div>
								<div className='info'>
									<div className='datetime'>
										<div className='title'>
											{segments[0].departure.iataCode} -{' '}
											{segments[segments.length - 1].arrival.iataCode}
										</div>
										<div className='data'>
											<div className='time'>
												{formatData.time(segments[0].departure.at)} -{' '}
												{formatData.time(
													segments[segments.length - 1].arrival.at
												)}
											</div>
											<div className='date'>
												{formatData.date(segments[0].departure.at)} -{' '}
												{formatData.date(
													segments[segments.length - 1].arrival.at
												)}
											</div>
										</div>
									</div>
									<div className='tiime'>
										<div className='title'>В пути</div>
										<div className='data'>
											{formatData.hours(flight.itineraries[0].duration)}ч{' '}
											{formatData.minutes(flight.itineraries[0].duration)}мин
										</div>
									</div>
									<div className='stops'>
										<div className='title'>
											{
												filtersData.find(item => {
													return parseInt(item.id) === segments.length - 1
												})?.title
											}
										</div>
										{/* <div className='data'>{formatData.getStops(flight)}</div> */}
									</div>
								</div>
							</div>
						</li>
					)
				})}
			</ul>
		</>
	)
}
