import React from 'react';

const Driver = (props) => {
    const thisYear = new Date().getFullYear();
    const calculateYear = thisYear - 1;
    const maxEndYear = props.maxEndYear;

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
    const activeContracts = contracts.filter(contract => thisYear <= contract.endYear);

    // function to choose white or black text color based on backgroundcolor
    // bgcolor is a hex without the "#"
    const getTextColor = (bgcolor) => {
        const r = parseInt(bgcolor.substr(0, 2), 16);
        const g = parseInt(bgcolor.substr(2, 2), 16);
        const b = parseInt(bgcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };

    return (
        <div>
            <h2>{driver.name} {'(' + driver.number + ')'} - {currentContract.team.name}</h2>

            <div className="">
                <ul className='flex'>
                    {activeContracts.map((contract, index, self) => (
                        <li key={contract._key} className={`flex justify-end items-center space-x-2 ${contract._key === self[self.length - 1]._key ? 'rounded-r-full' : ''}`} style={{ width: contract.width + '%', backgroundColor: '#' + contract.team.color, color: getTextColor(contract.team.color) }}>
                            <div className="pr-4">{contract.endYear}</div>
                        </li>
                    ))}
                </ul>
                <div className="text-sm opacity-50">{driver.comment}</div>
            </div>

            {/* <div style={{ width: percentOfMaxEndYear + '%' }}>
                <div className="h-3">{percentOfMaxEndYear}</div>
            </div> */}



        </div>
    );
};

export default Driver;
