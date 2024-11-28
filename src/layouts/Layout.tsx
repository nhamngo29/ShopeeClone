import FooterComponent from 'src/components/Footer'
import HeaderComponent from 'src/components/Header'
interface LayoutProps {
  Header?: React.ReactNode
  Footer?: React.ReactNode
  children?: React.ReactNode
}

export default function Layout({ Header = <HeaderComponent />, Footer = <FooterComponent />, children }: LayoutProps) {
  return (
    <div>
      {Header}
      {children}
      {Footer}
    </div>
  )
}
