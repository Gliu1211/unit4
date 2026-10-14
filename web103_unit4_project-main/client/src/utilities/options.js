export const BASE_PRICE = 25000
export const CONVERTIBLE_PRICE = 5000

// Each customizable feature and the options the user can pick from.
// `color`, `rim` and `accent` are used by CarPreview to draw the car.
export const features = [
    {
        key: 'exterior',
        label: 'Exterior',
        options: [
            { name: 'Racing Red', price: 0, color: '#b3001b' },
            { name: 'Midnight Blue', price: 500, color: '#1f3a93' },
            { name: 'Onyx Black', price: 750, color: '#151515' },
            { name: 'Pearl White', price: 1000, color: '#f1f1ee' },
            { name: 'Lime Green', price: 1200, color: '#6fbf2a' }
        ]
    },
    {
        key: 'roof',
        label: 'Roof',
        options: [
            { name: 'Hardtop', price: 0 },
            { name: 'Sunroof', price: 1500 },
            { name: 'Panoramic Glass', price: 2500 },
            { name: 'Soft Top', price: 1800 }
        ]
    },
    {
        key: 'wheels',
        label: 'Wheels',
        options: [
            { name: 'Standard Alloy', price: 0, rim: '#a7adb3', accent: '#6d737a' },
            { name: 'Sport', price: 2000, rim: '#2a2a2a', accent: '#e0182d' },
            { name: 'Chrome', price: 3000, rim: '#f4f4f4', accent: '#b9bec4' },
            { name: 'Gold', price: 3500, rim: '#d4af37', accent: '#8f7320' }
        ]
    },
    {
        key: 'interior',
        label: 'Interior',
        options: [
            { name: 'Cloth', price: 0, color: '#5a606b' },
            { name: 'Leather', price: 2500, color: '#a0522d' },
            { name: 'Racing Suede', price: 3500, color: '#c4161c' }
        ]
    }
]

export const defaultCar = {
    name: '',
    exterior: 'Racing Red',
    roof: 'Hardtop',
    wheels: 'Standard Alloy',
    interior: 'Cloth',
    convertible: false
}

export const findOption = (featureKey, optionName) => {
    const feature = features.find(f => f.key === featureKey)
    return feature?.options.find(option => option.name === optionName)
}
