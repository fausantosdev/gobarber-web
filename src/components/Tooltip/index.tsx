import { Container } from './styles'

type TooltipProps = {
  title: string
  children: any
  className?: string
}

const Tooltip = ({ title, children, className }: TooltipProps) => {
  return (
      <Container className={className}>
          {children}
          <span>{title}</span>
      </Container>
  )
}

export default Tooltip
