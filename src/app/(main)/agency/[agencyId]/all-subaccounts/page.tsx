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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getAuthUserDetails } from '@/lib/queries';
import { SubAccount } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DeleteButton from './_components/delete-button';
import CreateSubaccountButton from './_components/create-subaccount-btn';

type Props = {
  params: {
    agencyId: string;
  };
};

const AllSubAccounts = async ({ params }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return;
  return (
    <AlertDialog>
      <div className="flex flex-col ">
        <CreateSubaccountButton
          user={user}
          id={params.agencyId}
          className="w-[200px] self-end m-6"
        />
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Account" />
          <CommandList>
            <CommandEmpty>No Result Found</CommandEmpty>
            <CommandGroup heading="Sub Account">
              {!!user.Agency?.SubAccount.length
                ? user.Agency.SubAccount.map((subaccount: SubAccount) => (
                    <CommandItem className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all">
                      <Link
                        href={`/subaccount/${subaccount.id}`}
                        className="flex gap-4 w-full h-full"
                      >
                        <div className="relative w-32">
                          <Image
                            src={subaccount.subAccountLogo}
                            alt="subaccount logo"
                            fill
                            className="rounded-md object-contain bg-muted/50 p-4"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex text-xl font-semibold flex-col">
                            {subaccount.name}
                            <span className="text-muted-foreground font-normal text-sm">
                              {subaccount.address}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <AlertDialogTrigger asChild>
                        <Button
                          size={'sm'}
                          variant="destructive"
                          className="w-20 hover:bg-red-600 hover:text-white !text-white"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-left">
                            Are your absolutely sure
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left">
                            This action cannot be undon. This will delete the
                            subaccount and all data related to the subaccount.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-center items-center">
                          <AlertDialogCancel className="">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive hover:bg-destructive">
                            <DeleteButton subaccountId={subaccount.id} />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </CommandItem>
                  ))
                : ''}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default AllSubAccounts;
