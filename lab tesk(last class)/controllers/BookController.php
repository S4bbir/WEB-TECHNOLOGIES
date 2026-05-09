<?php
<?php
require_once(__DIR__ . '/../config/database.php');
require_once(__DIR__ . '/../models/Book.php');

class BookController {
    private $book;
    
    public function __construct($connection) {
        $this->book = new Book($connection);
    }
    
    // Handle add book request
    public function addBook($title, $author, $category, $availability) {
        if (empty($title) || empty($author) || empty($category)) {
            return array('status' => 'error', 'message' => 'All fields are required');
        }
        
        if ($this->book->addBook($title, $author, $category, $availability)) {
            return array('status' => 'success', 'message' => 'Book added successfully');
        }
        return array('status' => 'error', 'message' => 'Failed to add book');
    }
    
    // Handle get all books request
    public function getAllBooks() {
        $books = $this->book->getAllBooks();
        return array('status' => 'success', 'data' => $books);
    }
    
    // Handle update book request
    public function updateBook($id, $title, $author, $category, $availability) {
        if (empty($id) || empty($title) || empty($author) || empty($category)) {
            return array('status' => 'error', 'message' => 'All fields are required');
        }
        
        if ($this->book->updateBook($id, $title, $author, $category, $availability)) {
            return array('status' => 'success', 'message' => 'Book updated successfully');
        }
        return array('status' => 'error', 'message' => 'Failed to update book');
    }
    
    // Handle delete book request
    public function deleteBook($id) {
        if (empty($id)) {
            return array('status' => 'error', 'message' => 'Book ID is required');
        }
        
        if ($this->book->deleteBook($id)) {
            return array('status' => 'success', 'message' => 'Book deleted successfully');
        }
        return array('status' => 'error', 'message' => 'Failed to delete book');
    }
}
?>