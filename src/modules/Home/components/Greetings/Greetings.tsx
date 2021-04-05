import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export const Greetings: React.FC = () => {
  return (
    <Box maxWidth="60%">
      <Text fontSize="2xl" fontWeight="600">
        Добро пожаловать <br /> в систему военного госпиталя
      </Text>
      <Text fontSize="lg" fontWeight="500" mt="20px">
        Для навигации используйте меню, которое находится слева
      </Text>
      <Text fontSize="lg" fontWeight="500" mt="20px">
        Для создания справки из существующих форм нажмите на вкладку "Создать справку" в меню слева
      </Text>
      <Text fontSize="lg" fontWeight="500" mt="20px">
        Для использования калькулятора для подсчета дозировок нажмите на вкладку "Калькулятор" в
        меню слева
      </Text>
      <Text fontSize="lg" fontWeight="500" mt="20px">
        Для ведения дневника врача нажмите на вкладку "Учет пациентов" в меню слева
      </Text>
      <Text fontSize="lg" fontWeight="500" mt="20px">
        Для просмотра истории приема пациентов нажмите на вкладку "История" в меню слева
      </Text>
    </Box>
  )
}
