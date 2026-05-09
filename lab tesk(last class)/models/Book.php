<?php
<?php
class Book {
    private $conn;
    
    public function __construct($connection) {
        $this->conn = $connection;
    }
    
    // Add a new book
    public function addBook($title, $author, $category, $availability) {
        $title = mysqli_real_escape_string($this->conn, $title);
        $author = mysqli_real_escape_string($this->conn, $author);
        $category = mysqli_real_escape_string($this->conn, $category);
        
        $query = "INSERT INTO books (title, author, category, availability) 
                  VALUES ('$title', '$author', '$category', '$availability')";
        
        if (mysqli_query($this->conn, $query)) {
            return true;
        }
        return false;
    }
    
    // Get all books
    public function getAllBooks() {
        $query = "SELECT * FROM books ORDER BY id DESC";
        $result = mysqli_query($this->conn, $query);
        
        $books = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $books[] = $row;
        }
        return $books;
    }
    
    // Get book by ID
    public function getBookById($id) {
        $id = intval($id);
        $query = "SELECT * FROM books WHERE id = $id";
        $result = mysqli_query($this->conn, $query);
        
        return mysqli_fetch_assoc($result);
    }
    
    // Update book
    public function updateBook($id, $title, $author, $category, $availability) {
        $id = intval($id);
        $title = mysqli_real_escape_string($this->conn, $title);
        $author = mysqli_real_escape_string($this->conn, $author);
        $category = mysqli_real_escape_string($this->conn, $category);
        
        $query = "UPDATE books SET title='$title', author='$author', 
                  category='$category', availability='$availability' WHERE id=$id";
        
        return mysqli_query($this->conn, $query);
    }
    
    // Delete book
    public function deleteBook($id) {
        $id = intval($id);
        $query = "DELETE FROM books WHERE id=$id";
        
        return mysqli_query($this->conn, $query);
    }
}
?>