import { Flex, Spinner, Box, Button } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'

import { createClient } from '~/api'
import { Input } from '~/components'
import { IJSONSchemaFormField, ISchemeMeta } from '~/types'

import { RadioGenerated } from './components'

interface Props {
  available: ISchemeMeta[]
}

export const References: React.FC<Props> = ({ available }) => {
  const [schema, setSchema] = useState<IJSONSchemaFormField[] | null>(null)
  const [values, setValues] = useState<Record<string, string>>()

  useEffect(() => {
    const client = createClient()
    void client.getFromJSONSchema(available[0].id).then((data) => {
      setSchema(data)
    })
  }, [setSchema])

  useEffect(() => {
    if (schema)
      setValues(schema.map((elem) => ({ [elem.id]: '' })).reduce((r, c) => Object.assign(r, c)))
  }, [schema])

  const onSubmit = () => {
    console.log(values)
  }

  const onChange = useCallback(
    (id: string, value: string) => {
      setValues((values) => ({ ...values, [id]: value }))
    },
    [setValues],
  )

  if (!schema || !values) {
    return (
      <Flex alignItems="center" height="50vh" justifyContent="center" width="60%">
        <Spinner height="100px" width="100px" />
      </Flex>
    )
  }

  return (
    <Box>
      <Box>
        {schema.map(({ type, name, id, variants }) => {
          switch (type) {
            case 'input':
              return (
                <Input
                  key={name}
                  mt={5}
                  placeholder={name}
                  value={values[id]}
                  onChange={(event) => onChange(id, event ?? '')}
                />
              )
            case 'radio':
              return (
                <RadioGenerated
                  id={id}
                  key={name}
                  name={name}
                  values={values}
                  variants={variants}
                  onChange={onChange}
                />
              )
            default:
              return (
                <Input
                  key={name}
                  mt={5}
                  placeholder={name}
                  type="textarea"
                  value={values[id]}
                  onChange={(event) => onChange(id, event ?? '')}
                />
              )
          }
        })}
      </Box>
      <Button mt={25} onClick={onSubmit}>
        Получить справку
      </Button>
    </Box>
  )
}
