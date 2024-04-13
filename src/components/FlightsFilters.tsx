import useFlightStore from './store/store'

export default function FlightsFilters() {
	const filtersData = [
		{
			id: 'all',
			title: 'Все',
		},
		{
			id: '0',
			title: 'Без пересадок',
		},
		{
			id: '1',
			title: '1 пересадка',
		},
		{
			id: '2',
			title: '2 пересадки',
		},
		{
			id: '3',
			title: '3 пересадки',
		},
	]

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
