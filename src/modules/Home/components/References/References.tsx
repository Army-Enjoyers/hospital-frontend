import { Flex, Spinner, Box, Button, RadioGroup, Radio } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'

import { createClient } from '~/api'
import { Input } from '~/components'
import { JSONSchemaFormField } from '~/types'

import { useJSONSchema } from './hooks'

export const References: React.FC = () => {
  const [schema, setSchema] = useState<JSONSchemaFormField[] | null>(null)

  useEffect(() => {
    const client = createClient()
    void client.getFromJSONSchema().then((data) => setSchema(data))
  }, [setSchema])

  if (!schema) {
    return (
      <Flex alignItems="center" height="50vh" justifyContent="center" width="60%">
        <Spinner height="100px" width="100px" />
      </Flex>
    )
  }

  const [values, setValues] = useState(
    schema.map((elem) => ({ [elem.id]: '' })).reduce((r, c) => Object.assign(r, c)),
  )

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const onChange = useCallback(
    (id: string, value: string) => {
      setValues((values) => ({ ...values, [id]: value }))
    },
    [setValues],
  )

  return (
    <Box>
      <Box>
        {schema.map(({ type, name, inputProps, id, variants }) => {
          switch (type) {
            case 'input':
              return (
                <Input
                  {...inputProps}
                  key={name}
                  value={values[id]}
                  onChange={(event) => onChange(id, event ?? '')}
                />
              )
            case 'radio':
              return (
                <RadioGroup
                  key={name}
                  value={values[id]}
                  onChange={(value) => {
                    onChange(id, String(value))
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
              return (
                <Input
                  key={name}
                  type="textarea"
                  {...inputProps}
                  value={values[id]}
                  onChange={(event) => onChange(id, event ?? '')}
                />
              )
          }
        })}
      </Box>
      <Button onClick={onSubmit}>Получить справку</Button>
    </Box>
  )
}
