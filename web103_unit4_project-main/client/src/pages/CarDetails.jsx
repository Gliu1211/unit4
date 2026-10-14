import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { getCar, deleteCar } from '../services/carsAPI'
import { features, BASE_PRICE, CONVERTIBLE_PRICE } from '../utilities/options'
import { getOptionPrice, formatPrice } from '../utilities/calcprice'
import '../App.css'
import '../css/Cars.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        getCar(id)
            .then(setCar)
            .catch(err => setError(err.message))
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${car.name}"?`)) return

        try {
            await deleteCar(car.id)
            navigate('/customcars')
        } catch (err) {
            setError(err.message)
        }
    }

    if (error) {
        return (
            <div className='page'>
                <p className='error' role='alert'>{error}</p>
                <Link to='/customcars' role='button'>Back to cars</Link>
            </div>
        )
    }

    if (!car) {
        return <div className='page'><p aria-busy='true'>Loading car…</p></div>
    }

    return (
        <div className='page'>
            <article className='car-details'>
                <header>
                    <h2>{car.name}</h2>
                </header>
                <CarPreview car={car} />
                <dl>
                    <dt>Base price</dt><dd>{formatPrice(BASE_PRICE)}</dd>
                    {features.map(feature => (
                        <React.Fragment key={feature.key}>
                            <dt>{feature.label}</dt>
                            <dd>{car[feature.key]} (+{formatPrice(getOptionPrice(feature.key, car[feature.key]))})</dd>
                        </React.Fragment>
                    ))}
                    <dt>Convertible</dt>
                    <dd>{car.convertible ? `Yes (+${formatPrice(CONVERTIBLE_PRICE)})` : 'No'}</dd>
                </dl>
                <p className='price'>Total: {formatPrice(car.price)}</p>
                <div className='actions'>
                    <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                    <button className='contrast' onClick={handleDelete}>Delete</button>
                    <Link to='/customcars' role='button' className='secondary'>Back</Link>
                </div>
            </article>
        </div>
    )
}

export default CarDetails
