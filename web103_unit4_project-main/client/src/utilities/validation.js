// Feature combinations that can't be built. `features` lists which
// fields a rule depends on, so the form can tell which options to block.
const rules = [
    {
        features: ['convertible', 'roof'],
        test: car => car.convertible && (car.roof === 'Sunroof' || car.roof === 'Panoramic Glass'),
        message: "A convertible can't have a glass roof. Choose Soft Top or Hardtop."
    },
    {
        features: ['convertible', 'roof'],
        test: car => !car.convertible && car.roof === 'Soft Top',
        message: 'A Soft Top is only available on convertibles.'
    },
    {
        features: ['wheels', 'interior'],
        test: car => car.wheels === 'Standard Alloy' && car.interior === 'Racing Suede',
        message: 'Racing Suede interior requires Sport, Chrome or Gold wheels.'
    }
]

// Returns the messages for every rule the car breaks (empty if valid).
export const getComboErrors = (car) =>
    rules.filter(rule => rule.test(car)).map(rule => rule.message)

// True if picking this option would break a rule, given the other current choices.
export const isIncompatible = (car, featureKey, value) => {
    const candidate = { ...car, [featureKey]: value }
    return rules.some(rule => rule.features.includes(featureKey) && rule.test(candidate))
}

// Returns an error message for the whole car, or null if it can be saved.
export const validateCar = (car) => {
    if (!car.name || !car.name.trim()) {
        return 'Please give your car a name.'
    }

    const errors = getComboErrors(car)
    if (errors.length > 0) {
        return `This combination isn't possible: ${errors.join(' ')}`
    }

    return null
}
