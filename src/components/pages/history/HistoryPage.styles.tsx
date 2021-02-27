import styled from 'styled-components';
import { colors } from '../../../helpers/theme';

export { AppList, AppListItem, AppIconButton } from './../../utils';
export { HistoryIcon, LeftIcon } from './../../utils/icons';

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
