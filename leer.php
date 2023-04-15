<?php
    $data = array();
    $file = fopen('datos.csv', 'r');
    while (($row = fgetcsv($file)) !== false) {
        $data[] = $row;
    }
    fclose($file);
    echo json_encode($data);
?>