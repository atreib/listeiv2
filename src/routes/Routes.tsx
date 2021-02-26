import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { LogoIcon } from './../components/utils/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface RoutesModel {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  title: string;
  icon: React.ComponentType<SvgIconProps>;
}

export const AppRoutes: Array<RoutesModel> = [
  {
    path: '/',
    component: React.lazy(() => import('./../components/pages/dashboard/DashboardPage')),
    title: 'Início',
    icon: HomeIcon,
  },
  {
    path: '/history',
    component: React.lazy(() => import('./../components/pages/history/HistoryPage')),
    title: 'Histórico',
    icon: LogoIcon,
  },
];
