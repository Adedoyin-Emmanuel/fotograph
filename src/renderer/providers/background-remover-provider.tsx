import BgRemoverContext from 'renderer/context/background-remover-context';
import { useContext } from 'react';

interface BgRemoverProviderProp {
  children: JSX.Element | JSX.Element;
  apiArguments: any;
}

const BgRemoverProvider = ({
  children,
  apiArguments,
}: BgRemoverProviderProp) => {
  const contextValues = {
    name: 'Fotograph',
  };
  return (
    <BgRemoverContext.Provider value={contextValues}>
      {children && children}
    </BgRemoverContext.Provider>
  );
};

export default BgRemoverProvider;
