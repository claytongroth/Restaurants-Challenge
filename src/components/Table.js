import React from 'react';

const Table = ({page, array}) => {
    const displaySlice = array.slice(page, page+10);
    return (  
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Genres</th>
                    <th>Attire</th>
                </tr>
                {
                    displaySlice.map((item, i) => {
                        return (
                            <tr key={i} >
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.genre.replace(/,[s]*/g, ", ")}</td>
                                <td>{item.attire}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}
 
export default Table;