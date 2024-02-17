import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const BlurPage = ({ children }: Props) => {
  return (
    <div className="h-screen overflow-auto backdrop-blur-[35px] dark:bg-muted/40 bg-muted/60 dark:shadow-xl dark:shadow-black mx-auto pt-24 p-4 absolute top-0 right-0 left-0 bottom-0 z-[11] ">
      {children}
    </div>
  );
};

export default BlurPage;
