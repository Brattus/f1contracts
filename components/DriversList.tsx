import React from 'react';

export default function driversList(props) {
    const drivers = props.drivers;
    return (
        <div>
            <h1>Drivers</h1>
            <ul>
                {drivers && drivers.map((driver) => (
                    <li key={driver._id}>
                        <h2>{driver.name}</h2>
                        <p>{driver.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}