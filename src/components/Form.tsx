import { FormEvent } from 'react'
import useFlightStore from './store/store'

export default function Form() {
	/*const [formData, setFormData] = useState({
		origin: '',
		depart: '',
		date: '',
	})*/

	const { formData, setFormData, setFlights } = useFlightStore()

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		/*setFormData({
			...formData,
			[event.currentTarget.id]: event.currentTarget.value,
		})*/
		setFormData(event.currentTarget.id, event.currentTarget.value)
	}

	async function searchFlight(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setFlights(formData)
	}

	return (
		<>
			<div>Form</div>
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
							required
						/>
					</div>
					<div>
						<input
							type='text'
							placeholder='City or Airport'
							id='depart'
							name='depart'
							value={formData.depart}
							onChange={handleChange}
							required
						/>
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
