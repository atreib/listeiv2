import styled from 'styled-components';
import { colors } from '../../../helpers/theme';

export {
  AppInput,
  AppButton,
  AppList,
  AppConfirmDialog,
  AppPromptDialog,
  AppListItem,
  AppIconButton,
  AppCheckbox,
} from './../../utils';
export {
  NewListIcon,
  DeleteIcon,
  PlusIcon,
  MinusIcon,
  HistoryIcon,
  AddProductIcon,
  LeftIcon,
} from './../../utils/icons';

export const ShoppingListHistory = styled.div`
  margin: 0;
  padding: 0;
  wisth: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PageTitle = styled.div`
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
  padding: 0px 0px 4px 0px;
`;

export const ProductLabelWrapper = styled.div`
  flex: 1;
  max-width: 85%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

export const ProductNameLabel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0px;
`;
