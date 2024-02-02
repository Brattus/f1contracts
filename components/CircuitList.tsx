import React from 'react';

export default function circuitList(props) {
    let circuits = props.circuits;

    //remove all non-active
    const activeCircuits = circuits.filter(circuit => circuit.active);

    console.log('activeCircuits: ', activeCircuits);

    let maxEndYearContract = null;
    activeCircuits.forEach(circuit => {
        if (!maxEndYearContract || circuit.contractEnd > maxEndYearContract.contractEnd) {
            maxEndYearContract = circuit;
        }
    });
    const maxEndYear = maxEndYearContract.contractEnd;
    const years = [];
    const thisYear = new Date().getFullYear();
    for (let i = thisYear; i <= maxEndYear; i++) {
        years.push(i);
    }
    console.log('years: ', years);
    const percentageForEachyear = 100 / years.length;

    //Find width for each circuit
    circuits = activeCircuits.map((circuit) => {
        let width = 100;

        const startYear = thisYear;
        const numberOfYears = circuit.contractEnd >= thisYear ? circuit.contractEnd - startYear + 1 : 0;
        width = (numberOfYears / (maxEndYear - thisYear + 1)) * 100;

        return {
            ...circuit,
            width: width,
        };
    });

    //orderBy contractEnd
    circuits.sort((a, b) => a.contractEnd - b.contractEnd).reverse();
    console.log('circuits: ', circuits);

    return (
        <div className='space-y-12'>
            <h2 className="text-2xl font-bold">Circuits</h2>

            <div className="flex space-x-2 divide-x">
                {years.map(year => (
                    <div key={year} className="text-center " style={{ width: percentageForEachyear + '%' }}>{year}</div>
                ))}
            </div>

            <ul className='space-y-5'>
                {circuits.map(circuit => (
                    <li key={circuit._id}>
                        <h3 className="text-xl font-bold">{circuit.name}</h3>
                        <div className="bg-blue-700 h-6 rounded-r-full flex justify-end items-center" style={{ width: circuit.width + '%' }}>
                            <div className="pr-4 text-white">{circuit.contractEnd}</div>
                        </div>
                        <div className="">Racedate in {thisYear}: {circuit.racedate}</div>
                        <div className="text-gray-500">{circuit.comment}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}