import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import logo from './logo.svg'

function App() {
	const [flights, setFlights] = useState()
	useEffect(() => {
		const apiURL = 'https://test.api.amadeus.com/v2/shopping/flight-offers'
		axios
			.get(apiURL, {
				headers: {
					Authorization: 'Bearer ifT740ASihjKkkj1YYTkbMKpKWAv',
				},
				params: {
					originLocationCode: 'SYD',
					destinationLocationCode: 'BKK',
					departureDate: '2024-05-05',
					adults: 1,
					nonStop: false,
					max: 5,
				},
			})
			.then(resp => {
				console.log(resp.data.data)
			})
	}, [])

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	)
}

export default App
