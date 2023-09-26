'use client'
import { Link as NextUILink, LinkProps} from "@nextui-org/react"
import NextLink from "next/link"

export const Link = (props:LinkProps) => (<NextUILink {...props} as={NextLink} />)
