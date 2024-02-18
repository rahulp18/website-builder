'use client';
import CreatePipelineForm from '@/components/forms/create-pipeline-form';
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
import { toast } from '@/components/ui/use-toast';
import { deletePipeline } from '@/lib/queries';
import { Pipeline } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  pipelineId: string;
  pipelines: Pipeline[];
  subaccountId: string;
};

const PipelineSettings = ({ pipelineId, pipelines, subaccountId }: Props) => {
  const router = useRouter();
  return (
    <AlertDialog>
      <div>
        <div className="flex items-center justify-between mb-4">
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Pipeline</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely Sure ?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    await deletePipeline(pipelineId);
                    //Challenge: Activity log
                    toast({
                      title: 'Deleted',
                      description: 'Pipeline is deleted',
                    });
                    router.replace(`/subaccount/${subaccountId}/pipelines`);
                  } catch (error) {
                    toast({
                      variant: 'destructive',
                      title: 'Oppse!',
                      description: 'Could Delete Pipeline',
                    });
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>
      </div>
      <CreatePipelineForm
        subAccountId={subaccountId}
        defaultData={pipelines.find(p => p.id === pipelineId)}
      />
    </AlertDialog>
  );
};

export default PipelineSettings;
