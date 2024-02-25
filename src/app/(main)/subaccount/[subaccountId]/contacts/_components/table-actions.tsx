'use client';
import ContactUserForm from '@/components/forms/contact-user-form';
import CustomModal from '@/components/global/custom-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteContact } from '@/lib/queries';
import { useModal } from '@/providers/modal-provider';
import { Contact } from '@prisma/client';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  subaccountId: string;
  contact: Contact;
};

const TableActions = ({ subaccountId, contact }: Props) => {
  const router = useRouter();
  const { setOpen } = useModal();
  const handleDelete = async () => {
    try {
      const res = await deleteContact(contact.id);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    setOpen(
      <CustomModal
        title="Create Or Update Contact information"
        subHeading="Contact are like customers"
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>,
      async () => {
        return { contact: contact };
      },
    );
  };
  return (
    <AlertDialog>
      <Button
        onClick={handleEdit}
        variant={'ghost'}
        className="flex gap-1 w-full items-center"
      >
        <Edit size={15} />
        Edit
      </Button>
      <AlertDialogTrigger>
        <Button variant={'ghost'} className="flex gap-1 w-full items-center">
          <Trash size={15} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TableActions;
