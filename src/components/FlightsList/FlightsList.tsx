import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { filtersData } from '../../constants'
import { formatData } from '../../services/formatData.service'
import useFlightStore from '../../store/store'
import styles from './FlightsList.module.scss'

export default function FlightsList() {
	const { flights, filters, sortByCost, sortByTime } = useFlightStore()
	const [activeButton, setActiveButton] = useState<string | null>(null)

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
		<div className={styles.container}>
			{flights.length > 0 && (
				<div className={styles.buttons}>
					<button
						className={activeButton === 'byCost' ? styles.active : ''}
						onClick={() => {
							sortByCost()
							setActiveButton('byCost')
						}}
					>
						Самый дешевый
					</button>
					<button
						className={activeButton === 'byTime' ? styles.active : ''}
						onClick={() => {
							sortByTime()
							setActiveButton('byTime')
						}}
					>
						Самый быстрый
					</button>
				</div>
			)}
			<ul className={styles.list}>
				{filteredFlights.map(flight => {
					const segments = flight.itineraries[0].segments
					const firstSegment = segments[0]
					const lastSegment = segments[segments.length - 1]
					const duration = flight.itineraries[0].duration

					return (
						<li
							key={flight.id}
							onClick={() => navigate(`/flight/${flight.id}`)}
						>
							<div className={styles['main-info']}>
								<div className={styles.price}>
									{new Intl.NumberFormat('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										maximumFractionDigits: 0,
									}).format(parseInt(flight.price.total))}
								</div>
								<img
									src={`https://content.airhex.com/content/logos/airlines_${firstSegment.carrierCode}_400_80_r.png?proportions=keep`}
								/>
							</div>
							<div className={styles.details}>
								<div>
									<div className={styles.title}>
										{firstSegment.departure.iataCode} -{' '}
										{lastSegment.arrival.iataCode}
									</div>
									<div className={styles.data}>
										{formatData.time(firstSegment.departure.at)} -{' '}
										{formatData.time(lastSegment.arrival.at)}
									</div>
								</div>
								<div>
									<div className={styles.title}>В пути</div>
									<div className={styles.data}>
										<time dateTime={duration}>
											{`${formatData.hours(duration)}ч 
												${formatData.minutes(duration)}мин`}
										</time>
									</div>
								</div>
								<div>
									<div className={styles.title}>
										{
											filtersData.find(item => {
												return parseInt(item.id) === segments.length - 1
											})?.title
										}
									</div>
									<div className={styles.data}>
										{formatData.getStops(flight)}
									</div>
								</div>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
