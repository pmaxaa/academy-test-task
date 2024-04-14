export interface IToken {
	access_token: string
	application_name: string
	client_id: string
	expires_in: number
	scope: string
	state: string
	token_type: string
	type: string
	username: string
}

export interface IFormData {
	origin: string
	depart: string
	date: string
}

export type Flight = Pick<IFlightRaw, 'id' | 'itineraries' | 'price'>

export interface IFlightRaw {
	id: string
	itineraries: [
		{
			duration: string
			segments: [
				{
					departure: {
						iataCode: string
						at: string
					}
					arrival: {
						iataCode: string
						at: string
					}
					carrierCode: string
					aircraft: {
						code: string
					}
					duration: string
				}
			]
		}
	]
	price: {
		currency: string
		total: string
		base: string
		fees: [
			{
				amount: string
				type: string
			}
		]
		grandTotal: string
	}
	pricingOptions: {
		fareType: Array<String>
		includedCheckedBagsOnly: boolean
	}
	validatingAirlineCodes: Array<String>
	travelerPricings: [
		{
			travelerId: string
			fareOption: string
			travelerType: string
			price: {
				currency: string
				total: string
				base: string
			}
			fareDetailsBySegment: [
				{
					segmentId: string
					cabin: string
					fareBasis: string
					brandedFare: string
					brandedFareLabel: string
					class: string
					includedCheckedBags: {
						weight: string
						weightUnit: string
					}
					amenities: [
						{
							description: string
							isChargeable: boolean
							amenityType: string
							amenityProvider: {
								name: string
							}
						}
					]
				}
			]
		}
	]
}

export interface ICity {
	name: string
	id: string
	iataCode: string
}
