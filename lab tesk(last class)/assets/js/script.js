document.addEventListener('DOMContentLoaded', function() {
    loadAllBooks();
    
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bookId = document.getElementById('bookId').value;
        const action = bookId ? 'update' : 'add';
        
        const formData = new FormData();
        formData.append('action', action);
        formData.append('title', document.getElementById('bookTitle').value);
        formData.append('author', document.getElementById('bookAuthor').value);
        formData.append('category', document.getElementById('bookCategory').value);
        formData.append('availability', document.getElementById('bookAvailability').value);
        
        if (bookId) {
            formData.append('id', bookId);
        }
        
        sendAjaxRequest(formData);
    });
});

function sendAjaxRequest(formData) {
    fetch('../ajax/handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showAlert(data.message, data.status);
        
        if (data.status === 'success') {
            clearForm();
            loadAllBooks();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred', 'error');
    });
}

function loadAllBooks() {
    const formData = new FormData();
    formData.append('action', 'getAll');
    
    fetch('../ajax/handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            displayBooks(data.data);
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayBooks(books) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    if (books.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No books found</td></tr>';
        return;
    }
    
    books.forEach(book => {
        const row = document.createElement('tr');
        const statusClass = book.availability === 'available' ? 'available' : 'unavailable';
        const statusText = book.availability === 'available' ? 'Available' : 'Unavailable';
        
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td><span class="status ${statusClass}">${statusText}</span></td>
            <td>
                <div class="actions">
                    <button class="edit" onclick="editBook(${book.id}, '${escapeHtml(book.title)}', '${escapeHtml(book.author)}', '${escapeHtml(book.category)}', '${book.availability}')">Edit</button>
                    <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editBook(id, title, author, category, availability) {
    document.getElementById('bookId').value = id;
    document.getElementById('bookTitle').value = title;
    document.getElementById('bookAuthor').value = author;
    document.getElementById('bookCategory').value = category;
    document.getElementById('bookAvailability').value = availability;
    
    document.querySelector('button[type="submit"]').textContent = 'Update Book';
    window.scrollTo(0, 0);
}

function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        const formData = new FormData();
        formData.append('action', 'delete');
        formData.append('id', id);
        
        fetch('../ajax/handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showAlert(data.message, data.status);
            loadAllBooks();
        })
        .catch(error => console.error('Error:', error));
    }
}

function clearForm() {
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    document.querySelector('button[type="submit"]').textContent = 'Add Book';
}

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    
    setTimeout(() => {
        alertBox.className = 'alert';
    }, 4000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}