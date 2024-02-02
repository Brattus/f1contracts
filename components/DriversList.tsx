import React from 'react';
import Driver from 'components/Driver'

export default function driversList(props) {
    const drivers = props.drivers;


    //Last updated
    const lastUpdatedDriver = drivers.reduce((prev, current) => (prev._updatedAt > current._updatedAt) ? prev : current);
    const lastUpdatedPrettify = new Date(lastUpdatedDriver._updatedAt).toLocaleString();

    const driversSortedByEndYear = drivers.sort((a, b) => {
        const aEndYear = a.contracts[a.contracts.length - 1].endYear;
        const bEndYear = b.contracts[b.contracts.length - 1].endYear;

        return aEndYear - bEndYear;
    }).reverse();

    // Find max end year for all contracts
    let maxEndYearContract = null;
    driversSortedByEndYear.forEach(driver => {
        driver.contracts.forEach(contract => {
            if (!maxEndYearContract || contract.endYear > maxEndYearContract.endYear) {
                maxEndYearContract = contract;
            }
        });
    });
    const maxEndYear = maxEndYearContract.endYear;

    // array of years between this year and maxEndYear
    const years = [];
    const thisYear = new Date().getFullYear();
    const calculateYear = thisYear;
    for (let i = calculateYear; i <= maxEndYear; i++) {
        years.push(i);
    }
    const percentageForEachyear = 100 / years.length;

    return (
        <div className='space-y-12'>

            {/* Last updated */}
            <div className="flex flex-col prose">
                <h2 className="text-2xl font-bold">Driver contracts for {thisYear} and beyond</h2>
                <div className="">This information was last updated on: {lastUpdatedPrettify}</div>
                {/* <div className="">{lastUpdatedPrettify}</div> */}
            </div>

            {/* Drivers */}
            <div className="space-y-10">

                {/* Years */}
                <div className="flex space-x-2 divide-x">
                    {years.map(year => (
                        <div key={year} className="text-center " style={{width:percentageForEachyear + '%'}}>{year}</div>
                    ))}
                </div>

                <ul className='space-y-3'>
                    {driversSortedByEndYear && driversSortedByEndYear.map((driver) => (
                        <Driver key={driver._id} driver={driver} maxEndYear={maxEndYear} />
                    ))}
                </ul>
            </div>
        </div>
    )
}