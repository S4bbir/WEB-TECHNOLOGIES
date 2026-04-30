<?php
header("Content-Type: application/json");

$data = [
    "name" => "Asif",
    "age" => 22,
    "city" => "Dhaka",
    "email" => "asif@example.com",
    "phone" => "+880 1234567890",
    "country" => "Bangladesh",
    "occupation" => "Web Developer",
    "skills" => ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    "education" => [
        "degree" => "BSc in Computer Science",
        "university" => "Bangladesh University of Engineering and Technology"
    ]
];

echo json_encode($data);
?>