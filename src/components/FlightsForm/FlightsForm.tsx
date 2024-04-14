import { FormEvent, useEffect, useState } from 'react'
import { flightService } from '../../services/flight.service'
import useFlightStore from '../../store/store'
import { ICity } from '../../types/types'
import Dropdown from '../Dropdown/Dropdown'
import styles from './FlightsForm.module.scss'

export default function FlightsForm() {
	const { formData, setFormData, setFlights } = useFlightStore()
	const [options, setOptions] = useState<ICity[] | null>()
	const [showDropdown, setShowDropdown] = useState({
		origin: false,
		depart: false,
	})
	const [delayDebounce, setDelayDebounce] = useState<NodeJS.Timeout>()

	const hideDropdown = () => {
		setShowDropdown({ origin: false, depart: false })
		window.removeEventListener('click', hideDropdown)
	}

	useEffect(() => {
		return () => {
			window.removeEventListener('click', hideDropdown)
		}
	}, [])

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		clearTimeout(delayDebounce)
		setFormData(event.currentTarget.id, event.currentTarget.value)
		setDelayDebounce(
			setTimeout(
				(value: string) => {
					getOptions(value)
				},
				1000,
				event.currentTarget.value
			)
		)
	}

	const handleInputClick = (event: any) => {
		setOptions(null)
		setShowDropdown({
			...showDropdown,
			depart: false,
			origin: false,
			[event.currentTarget.id]: true,
		})
		window.addEventListener('click', hideDropdown)
		event.stopPropagation()
	}

	async function getOptions(str: string) {
		const options = await flightService.getCities(str)
		setOptions(options)
	}

	async function searchFlight(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setFlights(formData)
	}

	return (
		<div className={styles.container}>
			<form onSubmit={searchFlight}>
				<div className={styles.form}>
					<div className={styles['dropdown-input']}>
						<input
							type='text'
							placeholder='City or Airport'
							id='origin'
							name='origin'
							value={formData.origin}
							onChange={handleChange}
							onClick={handleInputClick}
							autoComplete='off'
							required
						/>
						<div>
							{showDropdown.origin && options && options?.length > 0 && (
								<Dropdown id='origin' options={options} />
							)}
						</div>
					</div>
					<div className={styles['dropdown-input']}>
						<input
							type='text'
							placeholder='City or Airport'
							id='depart'
							name='depart'
							value={formData.depart}
							onChange={handleChange}
							onClick={handleInputClick}
							autoComplete='off'
							required
						/>
						<div>
							{showDropdown.depart && options && options?.length > 0 && (
								<Dropdown id='depart' options={options} />
							)}
						</div>
					</div>

					<div className={styles['date-input']}>
						<input
							type='date'
							id='date'
							name='date'
							value={formData.date}
							onChange={handleChange}
							required
						/>
					</div>
					<button type='submit'>Search</button>
				</div>
			</form>
		</div>
	)
}
