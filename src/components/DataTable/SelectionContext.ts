import { createContext } from "react";

type SelectionContextType = {
    isEnabled: boolean,
    selectedIDs: string[],
    excludedIDs: string[],
    isAllSelected: () => boolean
    isSelected: (id: string) => boolean,
    selectItem: (id: string) => void,
    deselectItem: (id: string) => void,
    selectAll: () => void,
    deselectAll: () => void
}

const SelectionContext = createContext<Partial<SelectionContextType>>({});

export default SelectionContext;