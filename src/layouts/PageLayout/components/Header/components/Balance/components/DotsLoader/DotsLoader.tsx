import { Box, Flex } from '@chakra-ui/react'
import cx from 'classnames'
import React from 'react'

import styles from './DotsLoader.module.scss'

interface Props {
  numberDots?: number
}

const DEFAULT_NUMBER_DOTS = 4

export const DotsLoader: React.FC<Props> = ({ numberDots = DEFAULT_NUMBER_DOTS }) => {
  return (
    <Flex ml="1px" mt="-14px">
      {new Array(numberDots).fill(0).map((_value, index) => {
        return (
          <Box
            className={cx({ [styles.dot]: index % 2 }, { [styles.dotEven]: index % 2 === 0 })}
            fontSize="3xl"
            key={`dot${String(index)}`}
            lineHeight="1"
          >
            .
          </Box>
        )
      })}
    </Flex>
  )
}
