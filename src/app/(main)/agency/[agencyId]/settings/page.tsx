import AgencyDetails from '@/components/forms/agency-details';
import UserDetails from '@/components/forms/user-details';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import React from 'react';

type Props = {
  params: { agencyId: string };
};

const SettingPage = async ({ params: { agencyId } }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyId,
    },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return null;

  const subAccounts = agencyDetails.SubAccount;
  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type="agency"
        id={agencyId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default SettingPage;
