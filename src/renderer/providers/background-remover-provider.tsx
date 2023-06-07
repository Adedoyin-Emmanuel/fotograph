import BgRemoverContext from 'renderer/context/background-remover-context';
import { useContext, useState, useEffect } from 'react';
import removeUploadedFileBackground from 'renderer/backend/apis/search-images/remove-background';
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

    files &&
      files.forEach((file: File) => {
        const formData = new FormData();
        formData.append('image_file', file);

        removeUploadedFileBackground(formData, file.name);

        setContextValues({
          status: 200,
        });
      });
  }, [apiArguments]);

  return (
    <BgRemoverContext.Provider value={contextValues}>
      {children && children}
    </BgRemoverContext.Provider>
  );
};

export default BgRemoverProvider;
