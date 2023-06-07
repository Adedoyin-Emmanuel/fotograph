import BgRemoverContext from 'renderer/context/background-remover-context';
import { useContext, useState, useEffect } from 'react';

interface BgRemoverProviderProp {
  children: JSX.Element[] | JSX.Element;
  apiArguments: any;
}

const BgRemoverProvider = ({
  children,
  apiArguments,
}: BgRemoverProviderProp) => {
  const [contextValues, setContextValues] = useState<any>(null);

  useEffect(() => {
    const { files } = apiArguments;
    console.log(files);
  }, [apiArguments]);
  return (
    <BgRemoverContext.Provider value={contextValues}>
      {children && children}
    </BgRemoverContext.Provider>
  );
};

export default BgRemoverProvider;
