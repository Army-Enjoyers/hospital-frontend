import React, { useCallback, useContext, useState } from 'react'

import { StatusModal } from './components'

interface Status {
  title?: string
  description: string
  onCancel?: () => void
  onSubmit?: () => void
}

interface Actions {
  closeModal: () => void
  openModal: () => void
  triggerStatus: (status: Status) => void
}

const StatusModalContext = React.createContext<Actions>({} as Actions)

export const useStatusModal = () => {
  const context = useContext(StatusModalContext)
  if (!context)
    throw new Error(
      "[status-modal] You can't use useStatusModal outside the status-modal's provider",
    )
  return context
}

export const StatusModalProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState<Status>({} as Status)

  const closeModal = useCallback(() => setShow(false), [setShow])
  const openModal = useCallback(() => setShow(true), [setShow])
  const triggerStatus = useCallback(
    (status: Status) => {
      setStatus(status)
      openModal()
    },
    [setStatus, openModal],
  )

  return (
    <>
      <StatusModal show={show} {...status} onHide={closeModal} />
      <StatusModalContext.Provider
        value={{
          closeModal,
          openModal,
          triggerStatus,
        }}
      >
        {children}
      </StatusModalContext.Provider>
    </>
  )
}
