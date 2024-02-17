import MediaComponent from '@/components/media';
import { getMedia } from '@/lib/queries';
import React from 'react';
interface MediaPageProps {
  params: { subaccountId: string };
}
const MediaPage = async ({ params }: MediaPageProps) => {
  const data = await getMedia(params.subaccountId);

  return (
    <div>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </div>
  );
};

export default MediaPage;
