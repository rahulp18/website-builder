'use client';
import SubscriptionFormWrapper from '@/components/forms/subscription-form-wrapper';
import CustomModal from '@/components/global/custom-modal';
import { PricesList } from '@/lib/types';
import { useModal } from '@/providers/modal-provider';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
  prices: PricesList['data'];
  customerId: string;
  planExists: boolean;
};

const SubscriptionHelper = ({ customerId, planExists, prices }: Props) => {
  const { setOpen } = useModal();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  useEffect(() => {
    setOpen(
      <CustomModal
        title="Upgrade Plan!"
        subHeading="Get started today to get access to premium features"
      >
        <SubscriptionFormWrapper
          planExists={planExists}
          customerId={customerId}
        />
      </CustomModal>,
    );
  }, [plan]);
  return <div>SubscriptionHelper</div>;
};

export default SubscriptionHelper;
