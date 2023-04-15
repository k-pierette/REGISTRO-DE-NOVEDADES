<?php
    if (isset($_POST['index'])) {
        $index = $_POST['index'];
        $file = fopen('datos.csv', 'r');
        $rows = array();
        while (($row = fgetcsv($file)) !== false) {
            $rows[] = $row;
        }
        fclose($file);
        if (isset($rows[$index])) {
            unset($rows[$index]);
            $file = fopen('datos.csv', 'w');
            foreach ($rows as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        }
    }
?>