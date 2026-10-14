import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/carsAPI'
import '../App.css'

const EditCar = ({ title }) => {
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

    const handleUpdate = async (updated) => {
        await updateCar(id, updated)
        navigate(`/customcars/${id}`)
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
            <h2>Edit {car.name}</h2>
            <CarForm initialCar={car} submitLabel='Save Changes' onSubmit={handleUpdate} />
        </div>
    )
}

export default EditCar
