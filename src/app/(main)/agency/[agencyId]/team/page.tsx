import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import React from 'react';
import DataTable from './_component/data-table';
import { columns } from './_component/columns';
import { Plus } from 'lucide-react';
import SendInvitation from '@/components/forms/send-invitation';
interface TeamPageProps {
  params: {
    agencyId: string;
  };
}
const TeamPage = async ({ params: { agencyId } }: TeamPageProps) => {
  const authUser = await currentUser();
  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });
  if (!authUser) return null;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyId,
    },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return;
  return (
    <DataTable
      columns={columns}
      data={teamMembers}
      filterValue="name"
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
    />
  );
};

export default TeamPage;
