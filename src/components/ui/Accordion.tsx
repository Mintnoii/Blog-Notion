'use client'
import {Accordion, AccordionItem, AccordionProps, AccordionItemProps} from "@nextui-org/react";

interface ICustomAccordion {
  itemProps: AccordionItemProps
  props?: AccordionProps
  children?: React.ReactNode
}

export const CustomAccordion = (customProps: ICustomAccordion) => {
  return (
   <Accordion {...customProps.props} data-focus-visible={false} showDivider={false} isCompact={true}>
     <AccordionItem {...customProps.itemProps}>
          {customProps.children}
      </AccordionItem>
   </Accordion>
  )
}
