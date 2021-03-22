import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Modal, { ModalProps } from 'react-bootstrap/cjs/Modal'
import { useIntl } from 'react-intl'

import { Button } from '~/components'

import translations from './StatusModal.i18n.json'
import styles from './StatusModal.module.scss'

interface Props extends ModalProps {
  title?: string
  description?: string
  onCancel?: () => void
  onSubmit?: () => void
}

export const StatusModal: React.FC<Props> = ({
  title,
  description,
  onCancel,
  onSubmit,
  ...props
}) => {
  const intl = useIntl()
  return (
    <Modal {...props}>
      <Box
        background="white"
        borderRadius="8px"
        boxShadow="0 10px 30px 8px rgba(69, 69, 69, 0.1)"
        height="max-content"
        padding="50px"
        textAlign="center"
        width="100%"
      >
        <Box fontSize="2xl" fontWeight="600">
          {title}
        </Box>
        <Box fontSize="md" mt="30px">
          {description}
        </Box>
        <Flex className={styles.buttons} justifyContent="center" mt="35px">
          {onCancel && (
            <Button outlined className={styles.button} onClick={onCancel}>
              {intl.formatMessage(translations.cancel)}
            </Button>
          )}
          {onSubmit && (
            <Button className={styles.button} color="green" onClick={onSubmit}>
              {intl.formatMessage(translations.ok)}
            </Button>
          )}
        </Flex>
      </Box>
    </Modal>
  )
}
