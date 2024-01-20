import React from 'react';
import Driver from 'components/Driver'

export default function driversList(props) {
    const drivers = props.drivers;
    return (
        <div>
            <ul>
                {drivers && drivers.map((driver) => (
                    <Driver key={driver._id} driver={driver} />
                ))}
            </ul>
        </div>
    )
}