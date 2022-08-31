export interface ISearchBarProduct {
  id: number;
  title: string;
  category: string;
}

export const defaultSearchBarProduct: ISearchBarProduct = {
  id: -1,
  title: '',
  category: '',
};
