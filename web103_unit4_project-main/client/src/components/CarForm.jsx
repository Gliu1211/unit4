import React, { useState } from 'react'
import CarPreview from './CarPreview'
import { features, defaultCar, CONVERTIBLE_PRICE } from '../utilities/options'
import { calcPrice, formatPrice } from '../utilities/calcprice'
import { getComboErrors, isIncompatible, validateCar } from '../utilities/validation'
import '../css/Cars.css'

const CarForm = ({ initialCar = defaultCar, submitLabel, onSubmit }) => {
    const [car, setCar] = useState({ ...defaultCar, ...initialCar })
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const price = calcPrice(car)
    const comboErrors = getComboErrors(car)

    const update = (key, value) => {
        setCar(prev => ({ ...prev, [key]: value }))
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const message = validateCar(car)
        if (message) {
            setError(message)
            return
        }

        setSubmitting(true)
        try {
            await onSubmit({ ...car, name: car.name.trim(), price })
        } catch (err) {
            setError(err.message)
            setSubmitting(false)
        }
    }

    return (
        <div className='customizer'>
            <article className='preview-card'>
                <CarPreview car={car} />
                <h3>{car.name.trim() || 'Your custom car'}</h3>
                <p className='price'>{formatPrice(price)}</p>
                {comboErrors.length > 0 && (
                    <p className='warning' role='status'>⚠️ {comboErrors.join(' ')}</p>
                )}
            </article>

            <article>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>
                        Name
                        <input
                            id='name'
                            type='text'
                            placeholder='My dream car'
                            value={car.name}
                            onChange={e => update('name', e.target.value)}
                        />
                    </label>

                    {features.map(feature => (
                        <label key={feature.key} htmlFor={feature.key}>
                            {feature.label}
                            <select
                                id={feature.key}
                                value={car[feature.key]}
                                onChange={e => update(feature.key, e.target.value)}
                            >
                                {feature.options.map(option => {
                                    const blocked = isIncompatible(car, feature.key, option.name)
                                    return (
                                        <option
                                            key={option.name}
                                            value={option.name}
                                            disabled={blocked && option.name !== car[feature.key]}
                                        >
                                            {`${option.name} (+${formatPrice(option.price)})${blocked ? ' — unavailable' : ''}`}
                                        </option>
                                    )
                                })}
                            </select>
                        </label>
                    ))}

                    <label htmlFor='convertible'>
                        <input
                            id='convertible'
                            type='checkbox'
                            role='switch'
                            checked={car.convertible}
                            onChange={e => update('convertible', e.target.checked)}
                        />
                        Convertible (+{formatPrice(CONVERTIBLE_PRICE)})
                    </label>

                    {error && <p className='error' role='alert'>{error}</p>}

                    <button type='submit' disabled={submitting}>
                        {submitting ? 'Saving…' : submitLabel}
                    </button>
                </form>
            </article>
        </div>
    )
}

export default CarForm
