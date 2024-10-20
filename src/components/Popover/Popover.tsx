import { FloatingPortal, useFloating, useMergeRefs, arrow, shift, offset, Placement } from '@floating-ui/react'
import { useRef, useState, useId, ElementType } from 'react'
import { motion } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}
export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, strategy, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const id = useId()
  const showPopover = () => {
    setIsOpen(true)
  }
  const hiddenPopover = () => {
    setIsOpen(false)
  }
  const ref = useMergeRefs([refs.setReference])
  return (
    <Element className={className} ref={ref} onMouseEnter={showPopover} onMouseLeave={hiddenPopover}>
      {children}
      <FloatingPortal id={id}>
        <animateMotion>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-96%] z-10'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </animateMotion>
      </FloatingPortal>
    </Element>
  )
}
