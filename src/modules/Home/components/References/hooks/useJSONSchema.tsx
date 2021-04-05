import { Box, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'

import { Input } from '~/components'
import { FieldProps } from '~/hooks'
import { JSONSchemaFormField } from '~/types'

type IField = (field: string) => FieldProps<string>

interface JSONSchema {
  JSONForm: React.FC
}

export const useJSONSchema = (schema: JSONSchemaFormField[], field: IField): JSONSchema => {
  const JSONForm: React.FC = () => {
    return (
      <Box>
        {schema.map(({ type, name, inputProps, variants }) => {
          switch (type) {
            case 'input':
              return <Input {...inputProps} {...field(name)} />
            case 'radio':
              return (
                <RadioGroup onChange={(value) => field(name).onChange(value.toString())}>
                  {variants?.map((variant) => (
                    <Radio key={variant} value={variant}>
                      {variant}
                    </Radio>
                  ))}
                </RadioGroup>
              )
            default:
              return <Input type="textarea" {...inputProps} {...field(name)} />
          }
        })}
      </Box>
    )
  }
  return { JSONForm }
}
