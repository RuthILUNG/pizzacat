let cart = {
    small: 0,
    medium: 0,
    large: 0,
    totalCost: 0
};

function updateCart() {
    document.getElementById('small_count').innerText = cart.small;
    document.getElementById('medium_count').innerText = cart.medium;
    document.getElementById('large_count').innerText = cart.large;
    document.getElementById('total_cost').innerText = cart.totalCost.toFixed(2);
    toggleCheckoutButton();
}

function addToCart(size) {
    cart[size]++;
    if (size === 'small') {
        cart.totalCost += 78.99;
    } else if (size === 'medium') {
        cart.totalCost += 89.00;
    } else if (size === 'large') {
        cart.totalCost += 129.00;
    }
    updateCart();
}

function removeFromCart(size) {
    if (cart[size] > 0) {
        cart[size]--;
        if (size === 'small') {
            cart.totalCost -= 78.99;
        } else if (size === 'medium') {
            cart.totalCost -= 89.00;
        } else if (size === 'large') {
            cart.totalCost -= 129.00;
        }
        updateCart();
    }
}

function toggleCheckoutButton() {
    const checkoutButton = document.querySelector('#checkout_button');
    if (cart.small + cart.medium + cart.large > 0) {
        checkoutButton.style.display = 'block';
    } else {
        checkoutButton.style.display = 'none';
    }
}

function checkout() {
    const overlay = document.getElementById('overlay');
    const paymentPopup = document.createElement('div');
    paymentPopup.classList.add('payment_popup');
    paymentPopup.innerHTML = `
        <h2>Enter Payment Amount</h2>
        <input type="number" id="payment_amount" placeholder="Enter amount">
        <button onclick="processPayment()">Pay</button>
    `;
    overlay.appendChild(paymentPopup);
    overlay.classList.add('visible');
}

function processPayment() {
    const paymentAmount = parseFloat(document.getElementById('payment_amount').value);
    const totalAmount = cart.totalCost;
    const paymentMessage = document.getElementById('payment_message');
    
    if (paymentAmount >= totalAmount) {
        paymentMessage.innerText = "Enjoy your pizzas!";
        cart = { small: 0, medium: 0, large: 0, totalCost: 0 };
        updateCart();
        setTimeout(() => {
            paymentMessage.innerText = "";
            closeOverlay();
        }, 3000);
    } else {
        paymentMessage.innerText = "Sorry - that is not enough money!";
        setTimeout(() => {
            paymentMessage.innerText = "";
        }, 3000);
    }
}

function closeOverlay() {
    const overlay = document.getElementById('overlay');
    while (overlay.firstChild) {
        overlay.removeChild(overlay.firstChild);
    }
    overlay.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});
