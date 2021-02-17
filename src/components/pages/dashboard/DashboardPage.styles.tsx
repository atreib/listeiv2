import styled from 'styled-components';

export { AppInput, AppButton, AppList } from './../../utils';
export { Product } from './Product';

export const ShoppingList = styled.div`
  margin: 0;
  padding: 0;
  wisth: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ListTitle = styled.div`
  padding: 12px;
  font-size: 1.5rem;
`;

export const ListWrapper = styled.div`
  padding: 4px 12px;
`;

export const NewProduct = styled.div`
  padding: 12px;
  font-size: 1.5rem;
  display: flex;
  align-items: stretch;
  align-content: space-between;

  & > div {
    flex: 1 1 80%;
  }

  & > button {
    flex: 1 1;
  }
`;
