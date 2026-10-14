const API_URL = '/api/cars'

const request = async (url, options = {}) => {
    const response = await fetch(url, options)
    if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || `Request failed: ${response.status}`)
    }
    return response.json()
}

const getAllCars = () => request(API_URL)

const getCar = (id) => request(`${API_URL}/${id}`)

const createCar = (car) => request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
})

const updateCar = (id, car) => request(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
})

const deleteCar = (id) => request(`${API_URL}/${id}`, {
    method: 'DELETE'
})

export { getAllCars, getCar, createCar, updateCar, deleteCar }