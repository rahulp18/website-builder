'use client';
import React from 'react';
import { useModal } from '@/providers/modal-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
type Props = {
  title: string;
  subHeading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function CustomModal({ children, subHeading, title, defaultOpen }: Props) {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-auto md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subHeading}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default CustomModal;
