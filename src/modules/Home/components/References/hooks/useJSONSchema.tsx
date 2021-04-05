import { Box, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'

import { Input } from '~/components'
import { FieldProps } from '~/hooks'
import { JSONSchemaFormField } from '~/types'

type IField = (name: string) => FieldProps<never>

interface JSONSchema {
  JSONForm: React.FC | null
}

export const useJSONSchema = (schema: JSONSchemaFormField[] | null, field: IField): JSONSchema => {
  if (!schema) return { JSONForm: null }
  const JSONForm: React.FC = () => {
    return (
      <Box>
        {schema.map(({ type, name, inputProps, variants }) => {
          switch (type) {
            case 'input':
              return <Input {...inputProps} {...field(name)} key={name} />
            case 'radio':
              return (
                <RadioGroup
                  key={name}
                  value={field(name).value}
                  onChange={(value) => {
                    console.log(value)
                    field(name).onChange(value)
                  }}
                >
                  {variants?.map((variant) => (
                    <Radio key={variant} value={variant}>
                      {variant}
                    </Radio>
                  ))}
                </RadioGroup>
              )
            default:
              return <Input key={name} type="textarea" {...inputProps} {...field(name)} />
          }
        })}
      </Box>
    )
  }
  return { JSONForm }
}
