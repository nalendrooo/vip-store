import React, { useEffect, useRef } from 'react'

const Modal = (props: any) => {

  const { show, onClose, onSubmit, children } = props

  const ref: any = useRef()


  useEffect(() => {
    const handleOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }

    }

    document.addEventListener('mousedown', handleOutside)

    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [onClose, show])

  if (!show) return null

  return (
    <div  className="overflow-y-auto overflow-x-hidden fixed flex bg-slate-800 bg-opacity-50 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative px-4 py-2 w-full max-w-2xl max-h-full rounded-lg bg-white" ref={ref}>
        {children}
      </div>
    </div>
  )
}

type CompoundComponentProps = {
  children: React.ReactNode;
  withCloseButton?: boolean;
  onClose?: () => void
};

const Header = ({ children, withCloseButton, onClose }: CompoundComponentProps) => {

  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
      <h1 className="text-3xl font-bold">{children}</h1>
      {withCloseButton && (
        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      )}
    </div>
  );
};

const Body = ({ children }: CompoundComponentProps) => {
  return (
    <div className="p-4 md:p-5 space-y-4">
      {children}
    </div>
  );
};

const Footer = ({ children }: CompoundComponentProps) => {
  return (
    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
      {children}
    </div>
  );
};

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal