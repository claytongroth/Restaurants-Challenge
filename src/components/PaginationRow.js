import React from 'react';

const PaginationRow = ({page, numPages, handlePageDown, handlePageUp}) => {
    return (  
        <div className="pagination-row">
            <button disabled={page === 0} onClick={()=> handlePageDown()}>Prev Page</button>
            <h3>{`Page: ${page+1} of ${numPages+1}`}</h3>
            <button disabled={page === numPages}  onClick={()=> handlePageUp()}>Next Page</button>
        </div>
    );
}
 
export default PaginationRow;