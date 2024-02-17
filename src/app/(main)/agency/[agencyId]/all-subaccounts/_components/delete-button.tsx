'use client';
import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityNotification,
} from '@/lib/queries';
import { useRouter } from 'next/navigation';
import React from 'react';
interface Props {
  subaccountId: string;
}
const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivityNotification({
          agencyId: undefined,
          description: `Deleted a subaccount | ${response?.name}`,
        });
        await deleteSubAccount(subaccountId);
        router.refresh();
      }}
    >
      Delete Sub Account
    </div>
  );
};

export default DeleteButton;
