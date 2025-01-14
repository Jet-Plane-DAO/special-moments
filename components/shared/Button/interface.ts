import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outlined?: boolean
    href?: string
    variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'transparent-xs'
}
