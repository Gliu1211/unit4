import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { getAllCars, deleteCar } from '../services/carsAPI'
import { formatPrice } from '../utilities/calcprice'
import '../App.css'
import '../css/Cars.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        getAllCars()
            .then(setCars)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = async (car) => {
        if (!window.confirm(`Delete "${car.name}"?`)) return

        try {
            await deleteCar(car.id)
            setCars(prev => prev.filter(c => c.id !== car.id))
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) {
        return <div className='page'><p aria-busy='true'>Loading cars…</p></div>
    }

    return (
        <div className='page'>
            <h2>Custom cars</h2>

            {error && <p className='error' role='alert'>{error}</p>}

            {cars.length === 0 ? (
                <article className='empty'>
                    <p>No custom cars yet.</p>
                    <Link to='/' role='button'>Build one</Link>
                </article>
            ) : (
                <div className='car-grid'>
                    {cars.map(car => (
                        <article key={car.id} className='car-card'>
                            <header>
                                <h3>{car.name}</h3>
                            </header>
                            <CarPreview car={car} />
                            <dl>
                                <dt>Exterior</dt><dd>{car.exterior}</dd>
                                <dt>Roof</dt><dd>{car.roof}</dd>
                                <dt>Wheels</dt><dd>{car.wheels}</dd>
                                <dt>Interior</dt><dd>{car.interior}</dd>
                                <dt>Convertible</dt><dd>{car.convertible ? 'Yes' : 'No'}</dd>
                                <dt>Price</dt><dd>{formatPrice(car.price)}</dd>
                            </dl>
                            <div className='actions'>
                                <Link to={`/customcars/${car.id}`} role='button' className='secondary'>Details</Link>
                                <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                                <button className='contrast' onClick={() => handleDelete(car)}>Delete</button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
