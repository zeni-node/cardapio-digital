import './header.css'
import bannerUrl from '../../assets/header/banner.jpg'
import logoUrl from '../../assets/header/logo.jpg'

export default function Header() {
  return (
    <header className="page-header">
        <div className="page-header_banner">
            <img
          className="page-header_banner-image"
          src={bannerUrl}
          alt="Banner do cardápio"
         />
        </div>

        <img
        className="page-header_logo"
        src={logoUrl}
        alt="Logo do cardápio"
         />
        <h1 className="name_shopping">nome da loja </h1>
    </header>
   
  )
}
