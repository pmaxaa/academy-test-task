export default function FlightsFilters() {
	const filters = [
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
	return (
		<>
			Flights Filters
			<div>
				<h2>Количество пересадок</h2>
			</div>
		</>
	)
}
