<?php

namespace App\Services;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Exception;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class StatisticsReport {

    public function generateAdminReportExcel($podaci){

        $excel = new Spreadsheet();

        $excel->getProperties()
            ->setCreator("Admin")
            ->setLastModifiedBy("Admin")
            ->setTitle("Izvestaj o cake blogu")
            ->setSubject("Izvestaj")
            ->setCategory("izvestaj");

        $excel->getActiveSheet()->getColumnDimension('A')->setWidth(35);
        $excel->getActiveSheet()->getColumnDimension('B')->setWidth(15);

        $sheet = $excel->getActiveSheet();
        $sheet->setCellValue('A1', 'Izvestaj');

        $sheet->setCellValue('C1', 'Datum');
        $sheet->setCellValue('D1', $podaci['datum']);



        $sheet->setCellValue('A3', 'Ukupan broj postova: ');
        $sheet->setCellValue('B3', $podaci['brojPostova']);

        $sheet->setCellValue('A5', 'Ukupan broj komentara: ');
        $sheet->setCellValue('B5', $podaci['brojKomentara']);

        $sheet->setCellValue('A7', 'Ukupan broj torti: ');
        $sheet->setCellValue('B7', $podaci['brojTorti']);

        $sheet->setCellValue('A9', 'Ukupan broj korinsika: ');
        $sheet->setCellValue('B9', $podaci['brojKorisnika']);

        $sheet->setCellValue('A11', 'Prosecan broj objava po korisniku: ');
        $sheet->setCellValue('B11', $podaci['prosecanBrojObjavaPoKorisniku']);

        $sheet->setCellValue('A13', 'Prosecan broj komentara po korisniku: ');
        $sheet->setCellValue('B13', $podaci['prosecanBrojKomentaraPoKorisniku']);

        if(!empty($podaci['post']) && !empty($podaci['post'][0])){
            $sheet->setCellValue('A15', 'Objava koja se najvise komentarise: ');
            $sheet->setCellValue('B15', $podaci['post'][0]['title']);
        }

        $imeFajla = 'Izvestaj.xlsx';
        $writer = new Xlsx($excel);
        try {
            $writer->save($imeFajla);
        } catch (Exception $e) {
        }
        return $imeFajla;
    }

}
