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
	origin: string | number | readonly string[] | undefined
	depart: string | number | readonly string[] | undefined
	date: string | number | readonly string[] | undefined
}

export type Flight = Pick<IFlightRaw, 'id' | 'itineraries' | 'price'>

export interface IFlightRaw {
	type: string
	id: string
	source: string
	instantTicketingRequired: boolean
	nonHomogeneous: boolean
	oneWay: boolean
	lastTicketingDate: string
	lastTicketingDateTime: string
	numberOfBookableSeats: number
	itineraries: [
		{
			duration: string
			segments: [
				{
					departure: {
						iataCode: string
						terminal: string
						at: string
					}
					arrival: {
						iataCode: string
						at: string
					}
					carrierCode: string
					number: string
					aircraft: {
						code: string
					}
					operating: {
						carrierCode: string
					}
					duration: string
					id: string
					numberOfStops: number
					blacklistedInEU: false
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
