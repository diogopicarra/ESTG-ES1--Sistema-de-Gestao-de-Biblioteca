// Função para criar um novo utilizador e armazenar no localStorage
function createUser(username, password) {
    // Verifica se o utilizador já existe
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = existingUsers.find(user => user.username === username);
    if (existingUser) {
        return false; // Usuário já existe
    } else {
        existingUsers.push({ username, password });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        return true; // Conta criada com sucesso
    }
}

// Função para verificar se as credenciais de login são válidas
function loginUser(username, password) {
    // Verifica se as credenciais são válidas
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = existingUsers.find(user => user.username === username && user.password === password);
    return validUser ? true : false;
}

// Event listener para o formulário de criar conta
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const signupUsername = document.getElementById('signup-username').value;
    const signupPassword = document.getElementById('signup-password').value;

    // Cria a conta
    const accountCreated = createUser(signupUsername, signupPassword);

    if (accountCreated) {
        alert('Account created successfully! Please log in.');
    } else {
        alert('Username already exists. Please choose a different username.');
    }

    // Limpa os campos após o envio
    this.reset();
});

// Event listener para o formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se as credenciais são válidas
    const validLogin = loginUser(username, password);

    if (validLogin) {
        alert('Login successful!');
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('search-page').classList.add('active');
    } else {
        alert('Invalid username or password');
    }

    // Limpa os campos após o envio
    this.reset();
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const libraryName = document.getElementById('library-name').value.trim();

    // Simulate an API call to check if the library exists
    // In real-world applications, replace this with an actual API call
    if (libraryName.toLowerCase() === 'example library') {
        document.getElementById('search-page').classList.remove('active');
        document.getElementById('dashboard-page').classList.add('active');

        // Populate book data
        populateBooks();
    } else {
        alert('Library not found');
    }
});

// Navigation links functionality
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// Array of 25 books with prices and stock
const books = [
    { title: 'Dom Quixote - Miguel de Cervantes', price: 10.99, stock: 10 },
    { title: 'Guerra e Paz - Liev Tolstói', price: 12.99, stock: 5 },
    { title: '1984 - George Orwell', price: 8.99, stock: 15 },
    { title: 'Orgulho e Preconceito - Jane Austen', price: 14.99, stock: 8 },
    { title: 'Cem Anos de Solidão - Gabriel García Márquez', price: 11.99, stock: 7 },
    { title: 'Ulisses - James Joyce', price: 9.99, stock: 20 },
    { title: 'A Metamorfose - Franz Kafka', price: 13.99, stock: 9 },
    { title: 'O Apanhador no Campo de Centeio - J.D. Salinger', price: 7.99, stock: 13 },
    { title: 'O Grande Gatsby', price: 15.99, stock: 6 },
    { title: 'O Senhor dos Anéis - J.R.R. Tolkien', price: 16.99, stock: 3 },
    { title: 'Crime e Castigo - Fiódor Dostoiévski', price: 18.99, stock: 4 },
    { title: 'Moby Dick - Herman Melville', price: 5.99, stock: 12 },
    { title: 'O Nome da Rosa - Umberto Eco', price: 6.99, stock: 11 },
    { title: 'Ensaio sobre a Cegueira ', price: 17.99, stock: 5 },
    { title: '1984 - George Orwell', price: 19.99, stock: 2 },
    { title: 'A Revolução dos Bichos - George Orwell', price: 20.99, stock: 1 },
    { title: 'A Montanha Mágica - Thomas Mann', price: 21.99, stock: 0 },
    { title: 'O Sol é Para Todos - Harper Lee', price: 22.99, stock: 9 },
    { title: 'As Vinhas da Ira - John Steinbeck', price: 23.99, stock: 7 },
    { title: 'O Estrangeiro - Albert Camus', price: 24.99, stock: 10 },
];

let loans = [];

function populateBooks() {
    const booksToBuyList = document.getElementById('books-to-buy-list');
    const bookStockList = document.getElementById('book-stock-list');

    booksToBuyList.innerHTML = '';
    bookStockList.innerHTML = '';

    books.forEach(book => {
        if (book.stock > 0) {
            const bookItemForSale = document.createElement('li');
            bookItemForSale.textContent = `${book.title} - $${book.price.toFixed(2)}`;
            booksToBuyList.appendChild(bookItemForSale);
        }

        const bookItemInStock = document.createElement('li');
        bookItemInStock.textContent = `${book.title} - Stock: ${book.stock}`;
        bookStockList.appendChild(bookItemInStock);
    });
}

document.querySelector('#loan-books form').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookTitle = document.getElementById('book-title').value;
    const loanDate = document.getElementById('loan-date').value;
    
    const book = books.find(b => b.title === bookTitle);

    if (book && book.stock > 0) {
        book.stock--;
        loans.push({ title: bookTitle, date: loanDate, returned: false });
        updateLoans();
        updateBookStock();
        alert('Book loaned successfully!');
    } else {
        alert('Book not available or out of stock');
    }
});

function updateLoans() {
    const manageLoansList = document.getElementById('manage-loans-list');
    manageLoansList.innerHTML = '';

    loans.forEach(loan => {
        const loanItem = document.createElement('li');
        loanItem.textContent = `${loan.title} - Loan Date: ${loan.date} - Returned: ${loan.returned ? 'Yes' : 'No'}`;
        manageLoansList.appendChild(loanItem);
    });
}

function updateBookStock() {
    const bookStockList = document.getElementById('book-stock-list');
    bookStockList.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title} - Stock: ${book.stock}`;
        bookStockList.appendChild(bookItem);
    });

    // Refresh the Books to Buy list
    populateBooks();
}
