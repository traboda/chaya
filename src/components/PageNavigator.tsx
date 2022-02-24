import React from 'react';
import styled from '@emotion/styled';

import Button from './Button';

const StyledSelect = styled.select`
  padding: 3.5px 5px;
  border-radius: 5px;
  font-weight: 600;
  margin-right: 7px;
  text-align: center;
  &:focus {
      outline: none;
  }
`;

type PageNavigator = {
    totalCount: number,
    itemsPerPage: number,
    setItemsPerPage: (count: number) => void,
    hideItemsPerPage?: boolean
    page: number,
    setPage: (no: number) => void,
    className?: string,
}

const PageNavigator = ({
    totalCount, itemsPerPage, setItemsPerPage, className = '', hideItemsPerPage = false, page, setPage
}: PageNavigator) => {

    const length = Math.floor(((totalCount + itemsPerPage-1) / itemsPerPage));

    const setItems = (e) => {
        setPage(1);
        setItemsPerPage(e.target.value);
    };

    const getPageNo = () => {
        let list = [];
        if(length > 1) {
            if(length < 6)
                Array.from({ length }, (_item, i) => {
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
        <div className={`flex items-center justify-center text-center pt-4 ${className}`}>
            <div style={{ userSelect: 'none' }}>
                {page > 2 && (
                    <Button className="w-12 mx-1" onClick={() => setPage(1)}>
                        {`❮❮`}
                    </Button>
                )}
                {page > 1 && (
                    <Button className="w-16 mx-1" onClick={() => setPage(page - 1)}>
                        {`❮`}
                    </Button>)}
                {length > 1 && (
                    <React.Fragment>
                        {getPageNo().map((item, index) =>
                            <Button
                                variant={page === item ? "solid" : "outline"}
                                color={page === item ? "contrast" : "secondary"}
                                disabled={page === item}
                                key={`page_${item}_${index}`}
                                className={`w-12 mx-1 ${page === item ? 'active' : ''}`}
                                onClick={() => setPage(item)}
                            >
                                {item}
                            </Button>
                        )}
                    </React.Fragment>
                )}
                {!(page + 1 >= length) && (
                    <Button className="w-16 mx-1" onClick={() => setPage(page + 1)}>
                        {`❯`}
                    </Button>
                )}
                {(page + 1 < length) && (
                    <Button className="w-12 mx-1" onClick={() => setPage(length)}>
                        {`❯❯`}
                    </Button>
                )}
                {!hideItemsPerPage &&
                <div className="mt-3">
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

export default PageNavigator;
