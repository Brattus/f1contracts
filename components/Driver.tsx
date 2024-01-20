import React from 'react';

const Driver = (props) => {
    const driver = props.driver;
    return (
        <div>
            <h1>{driver.name}</h1>
            <p>{driver.number}</p>
        </div>
    );
};

export default Driver;
