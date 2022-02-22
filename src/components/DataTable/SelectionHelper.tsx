import React, {useEffect, useState} from "react";
import SelectionContext from "./SelectionContext";

type SelectionHelper = {
    isEnabled?: boolean,
    children: React.ReactElement,
    onSelect?: (args: { selectedIDs: string[], excludedIDs: string[] }) => void
}

const SelectionHelper = ({ isEnabled = false, children, onSelect }: SelectionHelper) => {

    const [selectedIDs, setSelected] = useState([]);
    const [excludedIDs, setExcluded] = useState([]);

    const isAllSelected = () => !!(selectedIDs?.length === 1 && selectedIDs[0] === '-1');
    const isExcluded = (id) => excludedIDs.filter((s) => s === id).length > 0;

    const isSelected = (id) => {
        if(isAllSelected() && !isExcluded(id))
            return true;
        return selectedIDs.filter((s) => s === id)?.length > 0;
    };

    const selectItem = (id) => {
        if(isExcluded(id)) {
            const newIDs = excludedIDs.filter((s) => s !== id);
            setExcluded(newIDs?.length ? [...newIDs] : []);
        } else {
            setSelected(selectedIDs?.length ? [...selectedIDs, id] : [id]);
        }
    };

    const deselectItem = (id) => {
        if(isAllSelected())
            setExcluded(excludedIDs?.length ? [...excludedIDs, id] : [id]);
        const newIDs = selectedIDs.filter((s) => s !== id);
        setSelected(newIDs?.length ? [...newIDs] : []);
    };

    const selectAll = () => {
        if(!isAllSelected()) {
            setExcluded([]);
            setSelected(['-1']);
        }
    };

    const deselectAll = () => {
        setSelected([]);
        setExcluded([]);
    }

    useEffect(() => {
        if(isEnabled){
            onSelect({ selectedIDs, excludedIDs })
        }
    }, [selectedIDs, excludedIDs])

    return (
        <SelectionContext.Provider
            value={{
                isEnabled, selectedIDs, excludedIDs,
                isSelected, isAllSelected, selectItem, deselectItem, deselectAll, selectAll
            }}
        >
            {children}
        </SelectionContext.Provider>
    )

};

export default SelectionHelper;