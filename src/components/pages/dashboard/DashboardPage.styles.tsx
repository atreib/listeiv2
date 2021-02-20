import { fade } from '@material-ui/core/styles/colorManipulator';
import styled from 'styled-components';
import { colors } from '../../../helpers/theme';

export { AppInput, AppButton, AppList } from './../../utils';
export { NewListIcon } from './../../utils/icons';
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
  color: ${colors.contrastPrimary};
  background-color: ${colors.primary};
  display: flex;
  flex-orientation: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListWrapper = styled.div`
  padding: 4px 0px 4px 0px;
`;

export const TotalPriceLabel = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-end;
  padding: 0px 16px;
  color: ${colors.contrastBackgroundLighter};
`;

export const NewProduct = styled.div`
  padding: 12px;
  font-size: 1.5rem;
  display: flex;
  align-items: stretch;
  align-content: space-between;

  & input {
    background-color: ${fade(colors.contrastPrimary, 0.5)};
  }

  & > div {
    flex: 1 1 80%;
  }

  & > button {
    flex: 1 1;
  }
`;

export const ProductLabelWrapper = styled.div`
  flex: 1;
  max-width: 75%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

export const ProductNameLabel = styled.div`
  flex: 1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-right: 0px;
`;

export const ProductPriceLabel = styled.div`
  font-size: 0.8rem;
  color: ${colors.contrastBackgroundLighter};
`;
