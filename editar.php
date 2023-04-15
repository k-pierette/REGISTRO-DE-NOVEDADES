<?php
    if (isset($_POST['data'])) {
        error_log("Datos recibidos: " . $_POST['data']);
        $data = json_decode($_POST['data'], true);
        $index = $data['index'];
        $newData = $data['newData'];
        $file = fopen('datos.csv', 'r');
        $rows = array();
        while (($row = fgetcsv($file)) !== false) {
            $rows[] = $row;
        }
        fclose($file);
        if (isset($rows[$index])) {
            error_log("Actualizando fila " . $index . " con nuevos datos: " . implode(",", $newData));
            $rows[$index] = $newData;
            $file = fopen('datos.csv', 'w');
            foreach ($rows as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        } else {
            error_log("Índice " . $index . " no encontrado en el archivo de datos");
        }
    } else {
        error_log("No se recibieron datos");
    }
?>