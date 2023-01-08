import { FormLabel, FormLabelProps } from '@chakra-ui/react';

type CustomFormLabelProps = { label?: string } & FormLabelProps;

export const CustomFormLabel = ({
  label,
  requiredIndicator,
  optionalIndicator,
  children,
}: CustomFormLabelProps) => {
  /*

    @SEE: https://discord.com/channels/660863154703695893/1055796000146587718
    * requiredIndicator={<abbr title="required">*</abbr>}
    * optionalIndicator={<Badge bg="yellow.400">Optional</Badge>}
 */
  return (
    <FormLabel
      fontSize="sm"
      fontWeight="bold"
      color="gray.500"
      requiredIndicator={requiredIndicator}
      optionalIndicator={optionalIndicator}
    >
      {label || children}
    </FormLabel>
  );
};
