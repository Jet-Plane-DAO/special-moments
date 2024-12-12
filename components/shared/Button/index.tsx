import NextLinkOrNot from '../NextLinkOrNot'
import { ButtonProps } from './interface'
import classNames from 'classnames'

const variantClasses: { [key: string]: string } = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
}

const Button: React.FC<ButtonProps> = ({ children, className, outlined, href, variant = 'primary', ...props }) => {
    const buttonClass = classNames(
        'btn app-btn',
        variantClasses[variant],
        className
    )

    if (href !== undefined) {
        return (
            <NextLinkOrNot href={href} className={classNames('inline-block', buttonClass)}>
                {children}
            </NextLinkOrNot>
        )
    }

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    )
}

export default Button
