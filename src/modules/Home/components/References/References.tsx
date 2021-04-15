import { Flex, Spinner, Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { object } from 'yup'

import { createClient } from '~/api'
import { useForm } from '~/hooks'
import { useJSONSchema } from '~/modules/Home/components/References/hooks'
import { JSONSchemaFormField } from '~/types'

export const References: React.FC = () => {
  const [schema, setSchema] = useState<JSONSchemaFormField[] | null>(null)

  useEffect(() => {
    const client = createClient()
    void client.getFromJSONSchema().then((data) => setSchema(data))
  }, [setSchema])

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const { field, submitProps } = useForm({
    onSubmit: onSubmit,
    validationSchema: object().shape({}).noUnknown(),
  })

  const { JSONForm } = useJSONSchema(schema, field)

  if (!schema) {
    return (
      <Flex alignItems="center" height="50vh" justifyContent="center" width="60%">
        <Spinner height="100px" width="100px" />
      </Flex>
    )
  }

  return (
    <Box>
      {JSONForm && <JSONForm />}
      <Button {...submitProps}>Получить справку</Button>
    </Box>
  )
}
