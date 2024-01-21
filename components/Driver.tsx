import React from 'react';

const Driver = (props) => {
    const thisYear = new Date().getFullYear();
    const calculateYear = thisYear - 1;
    const maxEndYear = props.maxEndYear;

    console.log('maxendyear', maxEndYear);

    const driver = props.driver;
    const currentContract = driver.contracts.find(contract => contract.startYear <= thisYear && contract.endYear >= thisYear);
    //latest contract  
    const thisDriversMaxEndYear = driver.contracts[0].endYear;
    const percentOfMaxEndYear = Math.round(((thisDriversMaxEndYear - calculateYear) / (maxEndYear - calculateYear)) * 100);

    // add width to each contract
    const contracts = driver.contracts.map((contract) => {
        let width = 100;

        const startYear = contract.startYear < thisYear ? thisYear : contract.startYear;
        const numberOfYears = contract.endYear >= thisYear ? contract.endYear - startYear + 1 : 0;
        width = (numberOfYears / (maxEndYear - thisYear + 1)) * 100;

        return {
            ...contract,
            width: width,
        };
    });

    // filter contracts and remove the ones that are not active
    const activeContracts = contracts.filter(contract => contract.startYear <= thisYear && contract.endYear >= thisYear);

    return (
        <div>
            <h2>{driver.name} {'(' + driver.number + ')'} - {currentContract.team.name}</h2>

            <div className="">
                <ul className='flex'>
                    {activeContracts.map((contract) => (
                        <li key={contract._key} className="flex space-x-2" style={{ width: contract.width + '%', backgroundColor: '#' + contract.team.color }}>
                            <div className="">{contract.startYear}</div>
                            <div className="">{contract.endYear}</div>
                            <div className="">{contract.team.name}</div>
                            <div className="">{contract.percentOfMaxEndYear}</div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <div style={{ width: percentOfMaxEndYear + '%' }}>
                <div className="h-3">{percentOfMaxEndYear}</div>
            </div> */}



        </div>
    );
};

export default Driver;
