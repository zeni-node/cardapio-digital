import { useEffect, useState } from 'react'
import { ShoppingBag, ShoppingCart, X } from 'lucide-react'
import './cart.css'

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      <button
        className="cart-button"
        type="button"
        aria-label="Abrir carrinho"
        aria-expanded={isOpen}
        aria-controls="cart-drawer"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart aria-hidden="true" size={21} />
        <span>Carrinho</span>
      </button>

      {isOpen && (
        <div className="cart-overlay">
          <button
            className="cart-overlay__backdrop"
            type="button"
            aria-label="Fechar carrinho"
            onClick={() => setIsOpen(false)}
          />

          <aside
            className="cart-drawer"
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <header className="cart-drawer__header">
              <div>
                <p className="cart-drawer__eyebrow">SEU PEDIDO</p>
                <h2 id="cart-title">Meu carrinho</h2>
              </div>
              <button
                className="cart-drawer__close"
                type="button"
                aria-label="Fechar carrinho"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" size={21} />
              </button>
            </header>

            <div className="cart-empty">
              <div className="cart-empty__icon">
                <ShoppingBag aria-hidden="true" size={34} strokeWidth={1.5} />
              </div>
              <h3>Seu carrinho está vazio</h3>
              <p>Que tal escolher algo gostoso do nosso cardápio?</p>
              <button
                className="cart-empty__action"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Ver cardápio
              </button>
            </div>

            <footer className="cart-drawer__footer">
              <span>Subtotal</span>
              <strong>R$ 0,00</strong>
            </footer>
          </aside>
        </div>
      )}
    </>
  )
}
