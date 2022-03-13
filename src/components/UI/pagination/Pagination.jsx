import React from "react";
import { getPagesArry } from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArry = getPagesArry(totalPages);
    return(
        <div className="page__wrapper">
          { pagesArry.map(p => 
              <span
                key={p}
                onClick={() => changePage(p)} 
                className={ page === p ? 'page page__current' : 'page'}
              >
                  {p}
              </span>)}
        </div>
    )
}
export default Pagination