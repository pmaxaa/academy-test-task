import useFlightStore from '../store/store'
import { ICity } from '../types/types'

export default function Dropdown({
	id,
	options,
}: {
	id: string
	options: Array<ICity>
}) {
	const { setFormData } = useFlightStore()

	const onItemClick = (option: ICity) => {
		setFormData(id, option.iataCode)
	}

	return (
		<div className='dropdown-container'>
			{options.map((option: ICity) => (
				<div
					onClick={() => onItemClick(option)}
					key={option.id}
					className='dropdown-item'
				>
					{option.name}({option.iataCode})
				</div>
			))}
		</div>
	)
}
