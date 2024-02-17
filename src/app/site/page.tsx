import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingCards } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <>
      <section className="h-full relative w-full pt-36  flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <p className="text-center font-medium uppercase">
          Run your agency in one place
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-8xl font-bold text-center md:text-[300px]">
            Plura
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src="/assets/preview.png"
            alt="preview"
            height={1000}
            width={1000}
            className="rounded-tl-3xl rounded-tr-3xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4   md:mt-[6rem]">
        <h2 className="text-4xl text-center font-bold mt-5">
          Choose What fits you right
        </h2>
        <p className="text-foreground text-center">
          Our straight forward pricing plans are tailored to meet your needs. If{' '}
          {"you're"} not <br />
          ready to commit you can get started for free
        </p>
        <div className="flex items-stretch gap-6 justify-center flex-wrap mt-6">
          {pricingCards.map(priceItem => (
            <Card
              key={priceItem.title}
              className={cn(
                'w-[300px] flex flex-col justify-between',
                priceItem.title === 'Unlimited Saas' &&
                  'border-2 border-primary',
              )}
            >
              <CardHeader>
                <CardTitle className={cn(priceItem.title !== 'Unlimited Saas')}>
                  {priceItem.title}
                </CardTitle>
                <CardDescription>{priceItem.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{priceItem.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col justify-center items-center gap-4">
                <div className="">
                  {priceItem.features.map(feature => (
                    <div key={feature} className="flex gap-2 items-center">
                      <Check className="text-muted-foreground" />
                      <p className="  text-muted-foreground font-semibold">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`agency?plan=${priceItem.priceId}`}
                  className={cn(
                    'w-full text-center text-white bg-primary p-2 rounded-md',
                    priceItem.title !== 'Unlimited Saas'
                      ? 'bg-muted-foreground'
                      : '',
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
