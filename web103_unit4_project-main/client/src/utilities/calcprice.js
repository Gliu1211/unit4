import { features, findOption, BASE_PRICE, CONVERTIBLE_PRICE } from './options'

export const getOptionPrice = (featureKey, optionName) =>
    findOption(featureKey, optionName)?.price ?? 0

export const calcPrice = (car) => {
    let total = BASE_PRICE

    for (const feature of features) {
        total += getOptionPrice(feature.key, car[feature.key])
    }

    if (car.convertible) {
        total += CONVERTIBLE_PRICE
    }

    return total
}

export const formatPrice = (amount) => `$${Number(amount).toLocaleString()}`
