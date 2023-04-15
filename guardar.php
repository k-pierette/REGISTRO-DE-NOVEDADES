<?php
    if (isset($_POST['data'])) {
        $data = json_decode($_POST['data'], true);
        $file = fopen('datos.csv', 'a');
        fputcsv($file, $data);
        fclose($file);
    }
?>