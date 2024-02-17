import { GetMediaFiles } from '@/lib/types';
import React from 'react';
import MediaUploadButton from './upload-buttons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import MediaCard from './media-card';
type Props = {
  data: GetMediaFiles;
  subaccountId: string;
};
const MediaComponent = ({ data, subaccountId }: Props) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Media Bucket</h1>
        <MediaUploadButton subaccountId={subaccountId} />
      </div>
      <Command className="bg-transparent mt-10">
        <CommandInput placeholder="Search for file name..." />
        <CommandList className="pb-40 max-h-full">
          <CommandEmpty>No Media Files</CommandEmpty>
          <CommandGroup heading="Media files">
            <div className="flex flex-wrap gap-4 pt-4">
              {data?.Media.map(file => (
                <CommandItem
                  key={file.id}
                  className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
                >
                  <MediaCard file={file} />
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MediaComponent;
