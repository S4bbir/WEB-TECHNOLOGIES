<?php
<?php
header('Content-Type: application/json');

require_once(__DIR__ . '/../controllers/BookController.php');

$response = array();
$action = isset($_POST['action']) ? $_POST['action'] : '';

$controller = new BookController($conn);

switch ($action) {
    case 'add':
        $title = isset($_POST['title']) ? $_POST['title'] : '';
        $author = isset($_POST['author']) ? $_POST['author'] : '';
        $category = isset($_POST['category']) ? $_POST['category'] : '';
        $availability = isset($_POST['availability']) ? $_POST['availability'] : 'available';
        
        $response = $controller->addBook($title, $author, $category, $availability);
        break;
    
    case 'getAll':
        $response = $controller->getAllBooks();
        break;
    
    case 'update':
        $id = isset($_POST['id']) ? $_POST['id'] : '';
        $title = isset($_POST['title']) ? $_POST['title'] : '';
        $author = isset($_POST['author']) ? $_POST['author'] : '';
        $category = isset($_POST['category']) ? $_POST['category'] : '';
        $availability = isset($_POST['availability']) ? $_POST['availability'] : 'available';
        
        $response = $controller->updateBook($id, $title, $author, $category, $availability);
        break;
    
    case 'delete':
        $id = isset($_POST['id']) ? $_POST['id'] : '';
        $response = $controller->deleteBook($id);
        break;
    
    default:
        $response = array('status' => 'error', 'message' => 'Invalid action');
}

echo json_encode($response);
?>