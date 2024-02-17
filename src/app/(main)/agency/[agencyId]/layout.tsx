import BlurPage from '@/components/global/blur-page';
import InfoBar from '@/components/global/infobar';
import Sidebar from '@/components/sidebar';
import Unauthorized from '@/components/unauthorized';
import {
  getNotificationAndUser,
  verificationAndAcceptInvitation,
} from '@/lib/queries';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: {
    agencyId: string;
  };
}
const AgencyLayout = async ({ children, params }: Props) => {
  const agencyId = await verificationAndAcceptInvitation();
  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }
  if (!agencyId) {
    return redirect('/agency');
  }
  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  ) {
    return <Unauthorized />;
  }

  let allNoti: any = [];
  const notification = await getNotificationAndUser(agencyId);
  if (notification) allNoti = notification;
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <InfoBar notifications={notification} role={allNoti.User?.role} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default AgencyLayout;
