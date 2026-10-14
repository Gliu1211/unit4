import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { createCar } from '../services/carsAPI'
import '../App.css'

const CreateCar = ({ title }) => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
    }, [title])

    const handleCreate = async (car) => {
        await createCar(car)
        navigate('/customcars')
    }

    return (
        <div className='page'>
            <h2>Customize your car</h2>
            <CarForm submitLabel='Create Car' onSubmit={handleCreate} />
        </div>
    )
}

export default CreateCar
