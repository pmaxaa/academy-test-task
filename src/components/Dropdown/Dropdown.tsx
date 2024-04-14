import useFlightStore from '../../store/store'
import { ICity } from '../../types/types'
import styles from './Dropdown.module.scss'

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
		<div className={styles.container}>
			{options.map((option: ICity) => (
				<div
					onClick={() => onItemClick(option)}
					key={option.id}
					className={styles.item}
				>
					{option.name} {''}({option.iataCode})
				</div>
			))}
		</div>
	)
}
