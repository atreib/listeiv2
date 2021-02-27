import React from 'react';
import { LogoIcon, HistoryIcon } from './../components/utils/icons';

export interface RoutesModel {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  title: string;
  Icon: JSX.Element;
}

export const AppRoutes: Array<RoutesModel> = [
  {
    path: '/',
    component: React.lazy(() => import('./../components/pages/dashboard/DashboardPage')),
    title: 'Início',
    Icon: <LogoIcon />,
  },
  {
    path: '/history',
    component: React.lazy(() => import('./../components/pages/history/HistoryPage')),
    title: 'Histórico',
    Icon: <HistoryIcon />,
  },
];
