import axios from 'axios'
import { ICity, IFlightRaw, IFormData, IToken } from '../types/types'

type flightResponse = {
	data: IFlightRaw[] | []
	dictionaries?: {
		carriers: Record<string, string>
	}
}

type cityResponse = {
	data: ICity[]
}

class FlightService {
	private API_KEY = 'EK1pALIQ9dFZjIbs1cLh8IWAeBXBurTr'
	private API_SECRET = '9lH1AeuOIB2HEibV'
	private TOKEN_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token'
	private API_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers'
	private CITIES_URL =
		'https://test.api.amadeus.com/v1/reference-data/locations'

	async getFlight(formData: IFormData) {
		const token = await this.getToken()
		const response = await axios
			.get<flightResponse>(this.API_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					originLocationCode: formData.origin,
					destinationLocationCode: formData.depart,
					departureDate: formData.date,
					adults: 1,
					max: 250,
					currencyCode: 'RUB',
				},
			})
			.catch(function (error) {
				console.log(error)
			})
		if (response && response.statusText === 'OK') {
			const { data } = response
			const flights = data.data.map((item: IFlightRaw) => {
				const { id, itineraries, price } = item
				return {
					id,
					itineraries,
					price,
				}
			})
			const carriers = data.dictionaries?.carriers
			return { flights, carriers }
		}
	}

	async getCities(str: string) {
		const token = await this.getToken()
		const response = await axios
			.get<cityResponse>(this.CITIES_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					subType: 'CITY',
					keyword: str,
				},
			})
			.catch(function (error) {
				console.log(error)
			})

		if (response && response.statusText === 'OK') {
			const cities = response.data.data.map((item: ICity) => {
				return {
					id: item.id,
					name: item.name,
					iataCode: item.iataCode,
				}
			})
			return cities
		}
	}

	async getToken() {
		const params = new URLSearchParams()
		params.append('grant_type', 'client_credentials')
		params.append('client_id', this.API_KEY)
		params.append('client_secret', this.API_SECRET)

		const { data } = await axios.post<IToken>(this.TOKEN_URL, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		return data.access_token
	}
}

export const flightService = new FlightService()
