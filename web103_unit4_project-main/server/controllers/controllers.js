import { pool } from '../config/database.js'

const createCar = async (req, res) => {
    try {
        const {name, exterior, roof, wheels, interior, convertible, price} = req.body

        const results = await pool.query(
            `INSERT INTO cars (name, exterior, roof, wheels, interior, convertible, price)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, exterior, roof, wheels, interior, convertible, price]
        )

        res.status(201).json(results.rows[0])


    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create car' })

    }
}

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id')
        res.status(200).json(results.rows)


    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to retrieve cars' })
    }
}

const editCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, exterior, roof, wheels, interior, convertible, price } = req.body

        const results = await pool.query(
            `UPDATE cars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, convertible = $6, price = $7 WHERE id = $8 RETURNING *`,
            [name, exterior, roof, wheels, interior, convertible, price, id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to update car' })

    }

}

const deleteCar = async (req, res) => {

    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to delete car' })

    }
}

const getCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
        if (results.rows.length === 0) {
            res.status(404).json({ error: 'Car not found' })
        } else {
            res.status(200).json(results.rows[0])
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to retrieve car' })
    }
}

export { createCar, getCars, editCar, deleteCar, getCarById }