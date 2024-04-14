import { filtersData } from '../constants'
import useFlightStore from '../store/store'

export default function FlightsFilters() {
	const { filters, setFilters } = useFlightStore()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilters(event.currentTarget.value)
	}

	return (
		<>
			Flights Filters
			<div>
				<h2>Количество пересадок</h2>
				{filtersData.map(item => (
					<div key={item.id}>
						<input
							type='checkbox'
							value={item.id}
							checked={filters.includes(`${item.id}`)}
							onChange={handleChange}
						></input>
						{item.title}
					</div>
				))}
			</div>
		</>
	)
}
