import { Box } from '@chakra-ui/react'
import cx from 'classnames'
import React from 'react'

import { Button } from '~/components'

import styles from './TileLayout.module.scss'

interface ButtonProps {
  text: string
  buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>
}

interface Props {
  cancelButton?: ButtonProps
  submitButton?: ButtonProps
  className?: string
}

export const TileLayout: React.FC<Props> = ({
  children,
  cancelButton,
  submitButton,
  className,
}) => {
  return (
    <Box>
      <div className={cx(styles.content, className)}>{children}</div>
      <div className={cx(styles.buttons)}>
        {cancelButton && (
          <Button outlined className={styles.button} {...cancelButton.buttonProps}>
            {cancelButton.text}
          </Button>
        )}
        {submitButton && (
          <Button className={styles.button} color="green" {...submitButton.buttonProps}>
            {submitButton.text}
          </Button>
        )}
      </div>
    </Box>
  )
}
