import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/db';
import { Contact, SubAccount, Ticket } from '@prisma/client';
import React from 'react';
import format from 'date-fns/format';
import CreateContactButton from './_components/create-contact-btn';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import TableActions from './_components/table-actions';
type Props = {
  params: {
    subaccountId: string;
  };
};

const ContactsPage = async ({ params }: Props) => {
  type SubAccountWithContacts = SubAccount & {
    Contact: (Contact & { Ticket: Ticket[] })[];
  };
  const contacts = (await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
    include: {
      Contact: {
        include: {
          Ticket: {
            select: {
              value: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })) as SubAccountWithContacts;
  const allContacts = contacts.Contact;
  const formatTotal = (tickets: Ticket[]) => {
    if (!tickets || !tickets.length) return `$0.00`;
    const amt = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    });
    const laneAmt = tickets.reduce(
      (sum, ticket) => sum + (Number(ticket?.value) || 0),
      0,
    );
    return amt.format(laneAmt);
  };
  return (
    <div>
      <h1 className="text-4xl p-4">Contacts</h1>
      {/* Add create contact button */}
      <div className="flex items-center justify-end mb-5">
        <CreateContactButton subaccountId={params.subaccountId} />
      </div>
      {/* Table to show the contacts */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead className="w-[200px]">Active</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allContacts.map(contact => (
            <TableRow key={contact.id}>
              <TableCell className="flex gap-2 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="@shadcn" />
                  <AvatarFallback className="bg-primary text-white">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {contact.name}
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>
                {formatTotal(contact.Ticket) === '$0.00' ? (
                  <Badge variant={'destructive'}>Inactive</Badge>
                ) : (
                  <Badge className="bg-emerald-700">Active</Badge>
                )}
              </TableCell>
              <TableCell>{format(contact.createdAt, 'MM/dd/yyyy')}</TableCell>
              <TableCell className="text-right">
                {formatTotal(contact.Ticket)}
              </TableCell>
              <TableCell className="">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal size={16} />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
                    <TableActions
                      subaccountId={params.subaccountId}
                      contact={contact}
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactsPage;
