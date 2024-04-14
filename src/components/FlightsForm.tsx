import { FormEvent, useEffect, useState } from 'react'
import { flightService } from '../services/flight.service'
import useFlightStore from '../store/store'
import Dropdown from './Dropdown'

export default function FlightsForm() {
	const { formData, setFormData, setFlights } = useFlightStore()
	const [options, setOptions] = useState([
		{
			name: '',
			id: '',
			iataCode: '',
		},
	])
	const [showMenu, setShowMenu] = useState({ origin: false, depart: false })
	useEffect(() => {
		const setFalse = () => setShowMenu({ origin: false, depart: false })
		window.addEventListener('click', setFalse)
		return () => {
			window.removeEventListener('click', setFalse)
		}
	}, [])

	useEffect(() => {
		setOptions([])
	}, [showMenu])

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		setFormData(event.currentTarget.id, event.currentTarget.value)
		getOptions(event.currentTarget.value)
	}

	const handleInputClick = (event: any) => {
		setShowMenu({
			...showMenu,
			depart: false,
			origin: false,
			[event.currentTarget.id]: true,
		})
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
		<>
			<div>Form</div>
			<div></div>

			<form onSubmit={searchFlight}>
				<div>
					<div>
						<input
							type='text'
							placeholder='City or Airport'
							id='origin'
							name='origin'
							value={formData.origin}
							onChange={handleChange}
							onClick={handleInputClick}
							required
						/>
						{showMenu.origin && <Dropdown id='origin' options={options} />}
					</div>
					<div>
						<input
							type='text'
							placeholder='City or Airport'
							id='depart'
							name='depart'
							value={formData.depart}
							onChange={handleChange}
							onClick={handleInputClick}
							required
						/>
						{showMenu.depart && <Dropdown id='depart' options={options} />}
					</div>
				</div>

				<div>
					<div>
						<input
							type='date'
							id='date'
							name='date'
							value={formData.date}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<button type='submit'>Search</button>
			</form>
		</>
	)
}

// 	return (
// 		<div>
// 			<h1>Count: {count}</h1>
// 			<button onClick={increment}>Increment</button>
// 		</div>
// 	)
// }
