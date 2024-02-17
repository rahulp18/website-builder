'use client';
import { Media } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
} from '../ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { deleteMedia, saveActivityNotification } from '@/lib/queries';

type Props = {
  file: Media;
};

const MediaCard = ({ file }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <AlertDialog>
      <DropdownMenu>
        <article className="border w-full rounded-b-lg bg-background">
          <div className="relative w-full h-40">
            <Image
              src={file.link}
              alt="preview images"
              fill
              className="object-cover"
            />
          </div>
          <p className="opacity-0 h-0 w-0">{file.name}</p>
          <div className="p-4 relative">
            <p className="dark:text-muted-foreground text-gray-400">
              {file.createdAt.toDateString()}
            </p>
            <p className="text-gray-700 dark:text-white">{file.name}</p>
            <div className="absolute top-4 right-4 p-[1px] cursor-pointer ">
              <DropdownMenuTrigger>
                <MoreHorizontal className="text-gray-700 dark:text-muted-foreground" />
              </DropdownMenuTrigger>
            </div>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuItem />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(file.link);
                toast({ title: 'Copied to clipboard' });
              }}
              className="flex gap-2"
            >
              <Copy size={15} /> Copy Image Link
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <Trash size={15} /> Delete File
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Are you sure you want to delete this file? All subaccount using this
            file will no longer have access to it!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={async () => {
              setLoading(true);
              const response = await deleteMedia(file.id);
              await saveActivityNotification({
                agencyId: undefined,
                description: `Deleted a media file | ${response?.name}`,
                subaccountId: response.subAccountId,
              });
              toast({
                title: 'Deleted File',
                description: 'Successfully deleted the file',
              });
              setLoading(false);
              router.refresh();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MediaCard;
