import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/lib/db';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface LaunchpadPageProps {
  params: {
    subaccountId: string;
  };
  searchParams: {
    state: string;
    code: string;
  };
}
const LaunchpadPage = async ({ params, searchParams }: LaunchpadPageProps) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });
  if (!subaccountDetails) return;

  const allDetailsExist =
    subaccountDetails.address &&
    subaccountDetails.subAccountLogo &&
    subaccountDetails.city &&
    subaccountDetails.companyEmail &&
    subaccountDetails.companyPhone &&
    subaccountDetails.country &&
    subaccountDetails.name &&
    subaccountDetails.state;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Let's get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src="/appstore.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Save the website as a shortcut to your mobile device</p>
              </div>
              <Button className="px-4 text-base">Start</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src="/stripelogo.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>
                  Connect your stripe account to accept payments and see your
                  dashboard.
                </p>
              </div>
              {subaccountDetails.connectAccountId ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-3 flex-shrink-0"
                />
              ) : (
                <Link
                  href=""
                  className="bg-primary py-2 px-4 text-base font-medium rounded-md text-white"
                >
                  Start
                </Link>
              )}
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <Image
                  src={subaccountDetails.subAccountLogo}
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>Fill in all your business details</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  href={`/agency/${subaccountDetails.id}/settings`}
                  className="bg-primary py-2 px-4 rounded-md text-base font-medium text-white"
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchpadPage;
