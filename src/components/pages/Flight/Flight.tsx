import { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FormatData } from '../../../services/formatData.service'
import useFlightStore from '../../../store/store'
import styles from './Flight.module.scss'

export default function Flight() {
	const { id } = useParams()
	const { flights } = useFlightStore()
	const currentFlight = flights.find(item => item.id === id)

	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.currentTarget.reset()
		alert('Успешное бронирование')
	}

	if (currentFlight) {
		const dataHelper = new FormatData(currentFlight)
		const transfers = dataHelper.getAllTransfers()

		return (
			<div className={styles.container}>
				<Link to='/'>К списку перелетов ←</Link>
				<div className={styles.card}>
					<div className={styles.info}>
						<div className={styles['main-info']}>
							<div className={styles.price}>{dataHelper.cost()}</div>
							<div>
								<div className={styles.title}>{dataHelper.route}</div>
								<div className={styles.data}>{dataHelper.routeTime}</div>
								<div className={styles.title}>Время в пути </div>
								<div className={styles.data}>{dataHelper.duration()}</div>
							</div>
						</div>

						<div className={styles.transfers}>
							{transfers.map((transfer, index) => {
								return (
									<div className={styles['transfer-item']}>
										<div>{index + 1}</div>
										<div className={styles['transfer-data']}>
											<div className={styles.title}>{transfer.route}</div>
											<div className={styles.data}>{transfer.routeTime}</div>

											<div className={styles.title}>Время в пути </div>
											<div className={styles.data}>{transfer.duration}</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>

					<img
						src={`https://content.airhex.com/content/logos/airlines_${dataHelper.carrierCode}_400_80_r.png?proportions=keep`}
					></img>
				</div>
				<div className={styles.form}>
					<form onSubmit={submitForm}>
						<div className={styles['dropdown-input']}>
							<input
								type='text'
								placeholder='Имя'
								id='firstName'
								name='firstName'
								autoComplete='off'
								required
							/>
						</div>
						<div className={styles['dropdown-input']}>
							<input
								type='text'
								placeholder='Фамилия'
								id='secondName'
								name='secondName'
								autoComplete='off'
								required
							/>
						</div>
						<button type='submit'>Забронировать</button>
					</form>
				</div>
			</div>
		)
	} else return <Link to='/'>К списку перелетов ←</Link>
}
