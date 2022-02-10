import React from 'react';
import styled from '@emotion/styled';

import Button from './Button';

const StyledSelect = styled.select`
  padding: 2.5px 3px;
  border-radius: 5px;
  font-weight: 600;
  margin-right: 5px;
  font-size: 15px;
  text-align: center;
  color: black;
  &:focus {
      outline: none;
  }
`;

type Pagination = {
    totalCount: number,
    itemsPerPage: number,
    setItemsPerPage: (count: number) => void,
    hideItemsPerPage?: boolean
    page: number,
    setPage: (no: number) => void,
    btnClassName?: string,
    activeBtnClassName?: string
}

const Pagination = ({ totalCount, itemsPerPage, setItemsPerPage, btnClassName, activeBtnClassName, hideItemsPerPage = false, page, setPage }: Pagination) => {

    const length = Math.floor(((totalCount + itemsPerPage-1) / itemsPerPage));

    const setItems = (e) => {
        setPage(1);
        setItemsPerPage(e.target.value);
    };

    const getPageNo = () => {
        let list = [];
        if(length > 1) {
            if(length < 6)
                Array.from({ length }, (item, i) => {
                    list.push(i+1);
                });
            else if(page > 2 && page + 2 < length)
                for(let i = page-2; i <= (page+2); i++)
                    list.push(i);
            else if(page + 2 >= length)
                for(let i = length-4; i <= length; i++)
                    list.push(i);
            else {
                for(let i = 1; i <= 5; i++)
                    list.push(i);
            }
        } else list = [1];
        return list;
    };

    return (
        <div className="flex items-center justify-center text-center pt-4">
            <div style={{ userSelect: 'none' }}>
                {page > 2 && (
                    <Button variant="warning" className={btnClassName} inverseColors onClick={() => setPage(1)} m={1}>
                        <i className="fas fa-chevron-double-left" />
                    </Button>
                )}
                {page > 1 && (
                    <Button variant="warning" className={btnClassName} inverseColors onClick={() => setPage(page - 1)} m={1}>
                        <i className="fas fa-chevron-left" />
                    </Button>)}
                {length > 1 && (
                    <React.Fragment>
                        {getPageNo().map((item) =>
                            <Button
                                key={item}
                                variant={page === item ? 'primary' : 'warning'}
                                inverseColors
                                m={1}
                                className={page === item ? activeBtnClassName : btnClassName }
                                onClick={() => setPage(item)}
                            >
                                {item}
                            </Button>
                        )}
                    </React.Fragment>
                )}
                {!(page + 1 >= length) && (
                    <Button variant="warning" className={btnClassName} inverseColors onClick={() => setPage(page + 1)} m={1}>
                        <i className="fas fa-chevron-right" />
                    </Button>
                )}
                {(page + 1 < length) && (
                    <Button variant="warning" className={btnClassName} inverseColors onClick={() => setPage(length)} m={1}>
                        <i className="fas fa-chevron-double-right" />
                    </Button>
                )}
                {!hideItemsPerPage &&
                <div className="pt-6">
                    <StyledSelect
                        value={itemsPerPage}
                        onChange={(e) => {setItems(e); itemsPerPage = Number(e.target.value);}}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </StyledSelect>
                    items per page
                </div>}
            </div>
        </div>
    );
};

export default Pagination;
