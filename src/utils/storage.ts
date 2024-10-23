const ITEMS = 'items';
const FILTERS = 'filters';

export const saveItemsToLocalStorage = (items: any[]) => {
  localStorage.setItem(ITEMS, JSON.stringify(items));
};

export const saveFiltersToLocalStorage = (filters: {
  currentSort: string;
  currentMaterial: string;
}) => {
  localStorage.setItem(FILTERS, JSON.stringify(filters));
};

export const getItemsFromLocalStorage = (): any[] | null => {
  const data = localStorage.getItem(ITEMS);
  return data ? JSON.parse(data) : null;
};

export const getFiltersFromLocalStorage = (): {
  currentSort: string;
  currentMaterial: string;
} | null => {
  const data = localStorage.getItem(FILTERS);
  return data ? JSON.parse(data) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem(ITEMS);
  localStorage.removeItem(FILTERS);
};
