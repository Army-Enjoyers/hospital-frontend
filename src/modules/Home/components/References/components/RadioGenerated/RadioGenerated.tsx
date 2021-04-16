import { Radio, RadioGroup, Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
  onChange: (id: string, value: string) => void
  values: Record<string, string>
  id: string
  name: string
  variants?: string[]
}

export const RadioGenerated: React.FC<Props> = ({ onChange, values, id, name, variants }) => {
  return (
    <Box mt={25}>
      <Text fontWeight={600} mb={2}>
        {name + ':'}
      </Text>
      <RadioGroup
        value={values[id]}
        onChange={(value) => {
          onChange(id, String(value))
        }}
      >
        <Flex flexDirection="column">
          {variants?.map((variant) => (
            <Radio key={variant} value={variant}>
              {variant}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Box>
  )
}
