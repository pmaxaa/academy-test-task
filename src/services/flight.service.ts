import axios from 'axios'
import { IFlightRaw, IFormData, IToken } from '../types/types'

class FlightService {
	private API_KEY = 'EK1pALIQ9dFZjIbs1cLh8IWAeBXBurTr'
	private API_SECRET = '9lH1AeuOIB2HEibV'
	private TOKEN_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token'
	private API_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers'

	async getFlight(formData: IFormData) {
		const token = await this.getToken()
		const { data } = await axios.get(this.API_URL, {
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
		const flights = data.data.map((item: IFlightRaw) => {
			return {
				id: item.id,
				itineraries: item.itineraries,
				price: item.price,
			}
		})
		return flights
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
