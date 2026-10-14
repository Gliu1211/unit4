import React from 'react'
import { findOption } from '../utilities/options'

const GLASS = 'rgba(160, 205, 235, 0.55)'

const Wheel = ({ cx, rim, accent }) => (
    <g>
        <circle cx={cx} cy='138' r='25' fill='#0d0d0d' />
        <circle cx={cx} cy='138' r='15' fill={rim} stroke={accent} strokeWidth='2' />
        {[0, 72, 144, 216, 288].map(angle => (
            <line
                key={angle}
                x1={cx} y1='138' x2={cx} y2='125'
                stroke={accent} strokeWidth='3' strokeLinecap='round'
                transform={`rotate(${angle} ${cx} 138)`}
            />
        ))}
        <circle cx={cx} cy='138' r='4' fill={accent} />
    </g>
)

const CarPreview = ({ car }) => {
    const body = findOption('exterior', car.exterior)?.color ?? '#888'
    const interior = findOption('interior', car.interior)?.color ?? '#555'
    const wheels = findOption('wheels', car.wheels) ?? { rim: '#aaa', accent: '#666' }

    return (
        <svg className='car-preview' viewBox='0 0 400 180' role='img' aria-label={`${car.exterior} car preview`}>
            <ellipse cx='200' cy='165' rx='175' ry='9' fill='rgba(0, 0, 0, 0.45)' />

            {car.convertible ? (
                <g>
                    {/* open cabin: seats, windshield and (optionally) a folded soft top */}
                    <rect x='178' y='66' width='20' height='26' rx='5' fill={interior} />
                    <rect x='236' y='66' width='20' height='26' rx='5' fill={interior} />
                    <line x1='132' y1='90' x2='160' y2='60' stroke={GLASS} strokeWidth='5' strokeLinecap='round' />
                    {car.roof === 'Soft Top' && (
                        <rect x='268' y='78' width='52' height='13' rx='6' fill='#262626' />
                    )}
                </g>
            ) : (
                <g>
                    {/* closed cabin: roof, pillars and windows */}
                    <path d='M130,90 L165,55 Q172,47 186,47 L264,47 Q280,47 292,58 L326,90 Z' fill={body} />
                    <path d='M146,88 L172,61 Q177,56 187,56 L261,56 Q272,56 280,64 L303,88 Z' fill={interior} />
                    <path d='M146,88 L172,61 Q177,56 187,56 L261,56 Q272,56 280,64 L303,88 Z' fill={GLASS} />
                    <line x1='222' y1='56' x2='222' y2='88' stroke={body} strokeWidth='5' />
                    {car.roof === 'Sunroof' && (
                        <rect x='196' y='44' width='52' height='6' rx='3' fill='#1b2a33' stroke={GLASS} />
                    )}
                    {car.roof === 'Panoramic Glass' && (
                        <path d='M168,52 Q174,45 186,45 L264,45 Q278,45 289,55' fill='none' stroke='#8fd3ff' strokeWidth='6' strokeLinecap='round' />
                    )}
                </g>
            )}

            {/* lower body */}
            <path
                d='M28,138 L28,112 Q30,96 58,93 L130,88 L326,88 L356,93 Q372,96 374,114 L374,138 Z'
                fill={body}
                stroke='rgba(0, 0, 0, 0.35)'
                strokeWidth='1.5'
            />
            <line x1='222' y1='92' x2='222' y2='132' stroke='rgba(0, 0, 0, 0.3)' strokeWidth='1.5' />
            <rect x='196' y='102' width='16' height='4' rx='2' fill='rgba(0, 0, 0, 0.4)' />
            <rect x='240' y='102' width='16' height='4' rx='2' fill='rgba(0, 0, 0, 0.4)' />
            <rect x='356' y='102' width='16' height='9' rx='3' fill='#fff6c2' />
            <rect x='30' y='102' width='12' height='9' rx='3' fill='#ff3b3b' />

            <Wheel cx={98} rim={wheels.rim} accent={wheels.accent} />
            <Wheel cx={304} rim={wheels.rim} accent={wheels.accent} />
        </svg>
    )
}

export default CarPreview
