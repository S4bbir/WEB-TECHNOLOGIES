<?php
<?php

echo "Hello, World!";
print "Hello world!";

$a = 20;
$b = 30;
 
if ($a > $b) {
    echo "A is greater";
} elseif ($a == $b) {
    echo "Equal";
} else {
    echo "B is greater";
}
?>
 
Switch:
 
<?php
$color = "red";
 
switch ($color) {
    case "red":
        echo "Red selected";
        break;
    default:
        echo "Other color";
}

$i = 1;
while ($i <= 5) {
    echo $i;
    $i++;
}
?>
 

do-while:
<?php
$i = 1;
do {
    echo $i;
    $i++;
} while ($i <= 5);
?>
 
for loop:
<?php
for ($i = 0; $i <= 5; $i++) {
    echo $i;
}

$colors = array("red", "green", "blue");
 
foreach ($colors as $value) {
    echo $value;
}
?>