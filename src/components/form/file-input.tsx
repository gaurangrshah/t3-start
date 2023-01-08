// @TODO: Add trpc to handle gh file upload
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { resetSpace } from '@/utils';

export const FileInput = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.currentTarget.files;
    const formData = new FormData();

    if (!files || !files.length) return;
    for (let file of files!) {
      formData.append('files', file, file.name);
    }
    setFormData(formData);
  };
  const handleClear = (e: React.SyntheticEvent) => {
    e.preventDefault();
    formData?.delete('files');
  };
  return (
    <Box as="form">
      <FormControl>
        <FormLabel>Upload</FormLabel>
        <InputGroup>
          <Input
            {...resetSpace}
            type="file"
            multiple
            onChange={handleChange}
            ref={fileRef}
            required
          />
          <InputRightAddon {...resetSpace}>
            {/* @TODO: handle upload via a mutation - currently saves to local state */}
            <Button type="submit" size="sm" variant="outline">
              Upload
            </Button>
            <Button size="sm" variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
    </Box>
  );
};
