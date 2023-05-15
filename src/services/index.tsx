import React, {FC} from 'react';

export * from './AppodealAds';

export const StandaloneService = {};

const initStandaloneService = async () => {
  for (const key in StandaloneService) {
    if (Object.prototype.hasOwnProperty.call(StandaloneService, key)) {
      const s = (StandaloneService as Services)[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};
//auto install standalone service
initStandaloneService();

export const Services = {};

type ContextServices = typeof Services;

const servicesContext = React.createContext<ContextServices>(Services);

export const withServices = (C: FC) => {
  return (props: any): React.ReactElement => {
    return (
      <servicesContext.Provider value={Services}>
        <C {...props} />
      </servicesContext.Provider>
    );
  };
};

export const userServices = (): ContextServices =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useContext(servicesContext);

export const initServices = async (): PVoid => {
  for (const key in Services) {
    if (Object.prototype.hasOwnProperty.call(Services, key)) {
      const s = (Services as Services)[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};

export const disposeServices = (): void => {
  for (const key in Services) {
    if (Object.prototype.hasOwnProperty.call(Services, key)) {
      const s = (Services as Services)[key];

      if (s.dispose) {
        s.dispose();
      }
    }
  }
};

if (__DEV__) {
  //@ts-ignore
  globalThis.tmp_StandaloneService = StandaloneService;
  // @ts-ignore
  globalThis.tmp_Services = Services;
}
