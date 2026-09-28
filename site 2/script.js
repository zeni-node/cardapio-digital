        /* =========================
           PRODUTOS
        ========================== */

        const products = [

            {
                id: 1,
                name: "X-Salada Especial",
                description: "Pão, hambúrguer, queijo, presunto, alface, tomate e molho especial.",
                price: 22.90,
                category: "hamburguer",
                icon: "🍔"
            },

            {
                id: 2,
                name: "X-Bacon",
                description: "Hambúrguer artesanal, queijo, bacon crocante e molho especial.",
                price: 26.90,
                category: "hamburguer",
                icon: "🍔"
            },

            {
                id: 3,
                name: "X-Tudo",
                description: "Hambúrguer, queijo, presunto, bacon, ovo, salada e molho.",
                price: 31.90,
                category: "hamburguer",
                icon: "🍔"
            },

            {
                id: 4,
                name: "Pizza Calabresa",
                description: "Molho de tomate, queijo, calabresa e cebola.",
                price: 39.90,
                category: "pizza",
                icon: "🍕"
            },

            {
                id: 5,
                name: "Pizza Quatro Queijos",
                description: "Mussarela, provolone, parmesão e catupiry.",
                price: 44.90,
                category: "pizza",
                icon: "🍕"
            },

            {
                id: 6,
                name: "Pizza Frango com Catupiry",
                description: "Frango desfiado, queijo e catupiry cremoso.",
                price: 42.90,
                category: "pizza",
                icon: "🍕"
            },

            {
                id: 7,
                name: "Sorvete de Chocolate",
                description: "Duas bolas de sorvete de chocolate cremoso.",
                price: 12.90,
                category: "sorvete",
                icon: "🍦"
            },

            {
                id: 8,
                name: "Sorvete de Morango",
                description: "Duas bolas de sorvete de morango com cobertura.",
                price: 12.90,
                category: "sorvete",
                icon: "🍓"
            },

            {
                id: 9,
                name: "Milkshake de Chocolate",
                description: "Milkshake cremoso de chocolate com chantilly.",
                price: 17.90,
                category: "sorvete",
                icon: "🥤"
            },

            {
                id: 10,
                name: "Coca-Cola Lata",
                description: "Refrigerante Coca-Cola 350ml.",
                price: 6.00,
                category: "bebida",
                icon: "🥤"
            },

            {
                id: 11,
                name: "Guaraná Lata",
                description: "Refrigerante Guaraná 350ml.",
                price: 5.50,
                category: "bebida",
                icon: "🥤"
            },

            {
                id: 12,
                name: "Combo Sabor",
                description: "X-Salada + batata frita + refrigerante.",
                price: 29.90,
                category: "combo",
                icon: "🍟"
            }

        ];


        /* =========================
           CARRINHO
        ========================== */

        let cart = [];


        /* =========================
           FORMATAÇÃO
        ========================== */

        function formatPrice(value) {

            return value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        }


        /* =========================
           MOSTRAR PRODUTOS
        ========================== */

        function renderProducts(category = "todos") {

            const container =
                document.getElementById("products");

            container.innerHTML = "";

            const filteredProducts =
                category === "todos"
                    ? products
                    : products.filter(
                        product => product.category === category
                    );


            filteredProducts.forEach(product => {

                const card =
                    document.createElement("div");

                card.className = "product-card";

                card.innerHTML = `

                    <div class="product-image">
                        ${product.icon}
                    </div>

                    <div class="product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p class="product-description">
                            ${product.description}
                        </p>

                        <div class="product-bottom">

                            <span class="price">
                                ${formatPrice(product.price)}
                            </span>

                            <button
                                class="add-button"
                                onclick="addToCart(${product.id})"
                            >
                                + Adicionar
                            </button>

                        </div>

                    </div>

                `;

                container.appendChild(card);

            });

        }


        /* =========================
           FILTRO
        ========================== */

        function setActiveCategory(category) {

            document
                .querySelectorAll(".category-btn")
                .forEach(button => {
                    const isActive =
                        button.dataset.category === category;

                    button.classList.toggle("active", isActive);
                });

        }


        function filterProducts(category = "todos") {

            setActiveCategory(category);
            renderProducts(category);

        }


        /* =========================
           ADICIONAR AO CARRINHO
        ========================== */

        function showToast(message) {

            const toast =
                document.getElementById("toast");

            toast.textContent = message;
            toast.classList.add("show");

            clearTimeout(showToast.timeoutId);

            showToast.timeoutId =
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 1800);

        }


        function triggerCartAnimation() {

            const cartButton =
                document.querySelector(".cart-button");

            if (!cartButton) return;

            cartButton.classList.remove("bump");
            void cartButton.offsetWidth;
            cartButton.classList.add("bump");

        }


        function addToCart(productId) {

            const product =
                products.find(
                    product => product.id === productId
                );

            const existing =
                cart.find(
                    item => item.id === productId
                );


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({
                    ...product,
                    quantity: 1
                });

            }

            triggerCartAnimation();
            showToast(`${product.name} adicionado ao carrinho!`);
            updateCart();

        }


        /* =========================
           ALTERAR QUANTIDADE
        ========================== */

        function changeQuantity(productId, amount) {

            const item =
                cart.find(
                    item => item.id === productId
                );

            if (!item) return;

            item.quantity += amount;

            if (item.quantity <= 0) {

                cart =
                    cart.filter(
                        item => item.id !== productId
                    );

            }

            updateCart();

        }


        /* =========================
           REMOVER
        ========================== */

        function removeFromCart(productId) {

            cart =
                cart.filter(
                    item => item.id !== productId
                );

            updateCart();

        }


        /* =========================
           ATUALIZAR CARRINHO
        ========================== */

        function updateCart() {

            const container =
                document.getElementById("cartItems");

            const count =
                document.getElementById("cartCount");

            const totalElement =
                document.getElementById("cartTotal");

            const checkoutButton =
                document.getElementById(
                    "checkoutButton"
                );


            const totalItems =
                cart.reduce(
                    (total, item) =>
                        total + item.quantity,
                    0
                );


            const total =
                cart.reduce(
                    (total, item) =>
                        total + item.price * item.quantity,
                    0
                );


            count.textContent = totalItems;

            totalElement.textContent =
                formatPrice(total);


            checkoutButton.disabled =
                cart.length === 0;


            if (cart.length === 0) {

                container.innerHTML = `

                    <div class="empty-cart">

                        <div>🛒</div>

                        <p>
                            Seu carrinho está vazio.
                        </p>

                    </div>

                `;

                return;

            }


            container.innerHTML = "";


            cart.forEach(item => {

                const element =
                    document.createElement("div");

                element.className = "cart-item";

                element.innerHTML = `

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <div class="cart-item-price">
                            ${formatPrice(item.price)}
                        </div>

                        <div class="cart-actions">

                            <div class="quantity">

                                <button
                                    onclick="changeQuantity(${item.id}, -1)"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    onclick="changeQuantity(${item.id}, 1)"
                                >
                                    +
                                </button>

                            </div>

                            <button
                                class="remove-item"
                                onclick="removeFromCart(${item.id})"
                                aria-label="Remover item do carrinho"
                                title="Remover item"
                            >
                                🗑️
                            </button>

                        </div>

                    </div>

                `;

                container.appendChild(element);

            });

        }


        /* =========================
           ABRIR CARRINHO
        ========================== */

        function openCart() {

            document
                .getElementById("cart")
                .classList.add("active");

            document
                .getElementById("overlay")
                .classList.add("active");

        }


        /* =========================
           FECHAR CARRINHO
        ========================== */

        function closeCart() {

            document
                .getElementById("cart")
                .classList.remove("active");

            document
                .getElementById("overlay")
                .classList.remove("active");

        }


        /* =========================
           IR PARA CHECKOUT
        ========================== */

        function goToCheckout() {

            if (cart.length === 0) return;

            closeCart();

            renderCheckout();

            document
                .getElementById("checkoutScreen")
                .classList.add("active");

            document.body.style.overflow = "hidden";

        }


        /* =========================
           RENDERIZAR CHECKOUT
        ========================== */

        function renderCheckout() {

            const container =
                document.getElementById(
                    "checkoutItems"
                );

            const totalElement =
                document.getElementById(
                    "checkoutTotal"
                );


            container.innerHTML = "";


            let total = 0;


            cart.forEach(item => {

                const itemTotal =
                    item.price * item.quantity;

                total += itemTotal;


                const element =
                    document.createElement("div");

                element.className =
                    "summary-item";

                element.innerHTML = `

                    <div>

                        <div class="summary-item-name">
                            ${item.name}
                        </div>

                        <div class="summary-item-details">
                            ${item.quantity} ×
                            ${formatPrice(item.price)}
                        </div>

                    </div>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                `;

                container.appendChild(element);

            });


            totalElement.textContent =
                formatPrice(total);

        }


        /* =========================
           VOLTAR AO MENU
        ========================== */

        function backToMenu() {

            document
                .getElementById("checkoutScreen")
                .classList.remove("active");

            document.body.style.overflow = "";

        }


        /* =========================
           PROCESSAR PAGAMENTO
        ========================== */

        function processPayment() {

            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();

            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();

            const address =
                document.getElementById(
                    "customerAddress"
                ).value.trim();


            if (!name || !phone || !address) {

                alert(
                    "Preencha seus dados antes de continuar."
                );

                return;

            }


            /*
                ESTE É O ÚLTIMO PASSO DO PROTÓTIPO.

                Não existe integração real com
                cartão, Pix ou gateway de pagamento.

                Por isso exibimos uma mensagem
                simulando uma falha.
            */

            document
                .getElementById("paymentModal")
                .classList.add("active");

        }


        /* =========================
           FECHAR MODAL
        ========================== */

        function closePaymentModal() {

            document
                .getElementById("paymentModal")
                .classList.remove("active");

        }


        /* =========================
           INICIALIZAÇÃO
        ========================== */

        document
            .querySelectorAll(".category-btn")
            .forEach(button => {
                button.addEventListener("click", () => {
                    filterProducts(button.dataset.category);
                });
            });

        renderProducts();

        updateCart();