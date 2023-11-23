import React, { useEffect } from 'react';

import SelectionContext from './SelectionContext';


export type SelectionType = {
  selectedIDs?: string[],
  excludedIDs?: string[],
};

type SelectionHelperProps = {
  selections?: SelectionType,
  isEnabled?: boolean,
  children: React.ReactNode,
  onSelect?: (args: SelectionType) => void
};
 
const SelectionHelper = ({ selections = { selectedIDs: [], excludedIDs: [] }, isEnabled = false, children, onSelect }: SelectionHelperProps) => {

  const selectedIDs = selections?.selectedIDs || [];
  const excludedIDs = selections?.excludedIDs || [];

  const setExcluded = (val: string[]) => {
    if (onSelect) onSelect({ selectedIDs, excludedIDs: val });
  };

  const setSelected = (val: string[]) => {
    if (onSelect) onSelect({ selectedIDs: val, excludedIDs });
  };

  const isAllSelected = () => selectedIDs?.length === 1 && selectedIDs[0] === '-1';
  const isExcluded = (id: string) => excludedIDs.filter((s) => s === id).length > 0;

  const isSelected = (id: string) => {
    if (isAllSelected() && !isExcluded(id)) return true;
    return selectedIDs.filter((s) => s === id)?.length > 0;
  };

  const selectItem = (id: string) => {
    if (isExcluded(id)) {
      const newIDs = excludedIDs.filter((s) => s !== id);
      setExcluded(newIDs?.length ? [...newIDs] : []);
    } else {
      setSelected(selectedIDs?.length ? [...selectedIDs, id] : [id]);
    }
  };

  const deselectItem = (id: string) => {
    if (isAllSelected())
      setExcluded(excludedIDs?.length ? [...excludedIDs, id] : [id]);
    const newIDs = selectedIDs.filter((s) => s !== id);
    setSelected(newIDs?.length ? [...newIDs] : []);
  };

  const selectAll = () => {
    if (!isAllSelected()) {
      setExcluded([]);
      setSelected(['-1']);
    }
  };

  const deselectAll = () => {
    setSelected([]);
    setExcluded([]);
  };

  useEffect(() => {
    if (isEnabled && onSelect) onSelect({ selectedIDs, excludedIDs });
  }, [selectedIDs, excludedIDs]);

  return (
    <SelectionContext.Provider
      value={{
        isEnabled, selectedIDs, excludedIDs,
        isSelected, isAllSelected, selectItem, deselectItem, deselectAll, selectAll,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );

};

export default SelectionHelper;