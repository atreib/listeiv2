import styled from 'styled-components';

export { AppInput, AppButton } from './../../utils';

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

export const List = styled.ul`
  margin: 0;
  padding: 4px 12px;
  list-styled-type: none;
`;

export const Product = styled.li`
  padding: 8px 0px;
  font-size: 1.5rem;
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
