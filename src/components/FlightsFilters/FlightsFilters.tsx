import { filtersData } from '../../constants'
import useFlightStore from '../../store/store'
import styles from './FlightsFilters.module.scss'

export default function FlightsFilters() {
	const { filters, flights, setFilters } = useFlightStore()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilters(event.currentTarget.value)
	}

	return (
		<>
			{flights.length > 0 && (
				<div className={styles.container}>
					<h2>Количество пересадок</h2>
					{filtersData.map(item => (
						<div key={item.id} className={styles.checkbox}>
							<input
								type='checkbox'
								value={item.id}
								checked={filters.includes(`${item.id}`)}
								onChange={handleChange}
							></input>
							<label htmlFor={item.id}>{item.title}</label>
						</div>
					))}
				</div>
			)}
		</>
	)
}
