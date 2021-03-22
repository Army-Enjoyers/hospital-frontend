import { Flex, Image, Text } from '@chakra-ui/react'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Input } from '../Input'

import translations from './ControlBox.i18n.json'
import styles from './ControlBox.module.scss'
import { images } from './images'

interface Props {
  value: number
  onChange: (value: number) => void
}

export const ControlBox: React.FC<Props> = ({ value, onChange }) => {
  const intl = useIntl()
  const [controlValue, setControlValue] = useState<string | undefined>(value.toString())

  useEffect(() => {
    setControlValue(value.toString())
  }, [value])

  useEffect(() => {
    if (controlValue !== undefined && controlValue !== '' && +controlValue !== 0)
      onChange(+controlValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlValue])

  return (
    <Flex alignItems="center">
      <Image
        className={cx(styles.control, { [styles.disabled]: value === 1 })}
        src={images.minus}
        onClick={() => value > 1 && onChange(value - 1)}
      />
      <Flex mx="10px">
        <Input
          className={styles.valueInput}
          value={controlValue}
          onBlur={() => {
            if (controlValue === undefined || controlValue === '') setControlValue(value.toString())
          }}
          onChange={setControlValue}
        />
        <Text>{intl.formatMessage(translations.peaces)}</Text>
      </Flex>
      <Image className={styles.control} src={images.plus} onClick={() => onChange(value + 1)} />
    </Flex>
  )
}
