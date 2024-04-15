import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { filtersData } from '../../constants'
import { FormatData } from '../../services/formatData.service'
import useFlightStore from '../../store/store'
import styles from './FlightsList.module.scss'

export default function FlightsList() {
	const { flights, filters, sortByCost, sortByTime } = useFlightStore()
	const [activeButton, setActiveButton] = useState<string>('byCost')

	useEffect(() => {
		sortByCost()
	}, [])
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
			{flights.length > 0 && (
				<div className={styles.container}>
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

					<ul className={styles.list}>
						{filteredFlights.map(flight => {
							const dataHelper = new FormatData(flight)
							return (
								<li
									key={flight.id}
									onClick={() => navigate(`/flight/${flight.id}`)}
								>
									<div className={styles['main-info']}>
										<div className={styles.price}>{dataHelper.cost()}</div>
										<div>
											<img
												src={`https://content.airhex.com/content/logos/airlines_${dataHelper.carrierCode}_400_80_r.png?proportions=keep`}
											/>
										</div>
									</div>
									<div className={styles.details}>
										<div>
											<div className={styles.title}>{dataHelper.route}</div>
											<div className={styles.data}>{dataHelper.routeTime}</div>
										</div>
										<div>
											<div className={styles.title}>В пути</div>
											<div className={styles.data}>
												<time dateTime={dataHelper.flightDuration}>
													{dataHelper.duration()}
												</time>
											</div>
										</div>
										<div>
											<div className={styles.title}>
												{
													filtersData.find(item => {
														return (
															parseInt(item.id) === dataHelper.numberOfStops
														)
													})?.title
												}
											</div>
											<div className={styles.data}>{dataHelper.getStops()}</div>
										</div>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			)}
		</>
	)
}
