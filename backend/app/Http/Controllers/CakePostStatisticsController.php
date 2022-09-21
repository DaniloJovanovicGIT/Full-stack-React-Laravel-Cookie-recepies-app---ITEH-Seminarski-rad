<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use App\Models\CakePost;
use App\Models\CakePostComment;
use App\Models\User;
use App\Services\StatisticsReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CakePostStatisticsController extends Controller {

    /**
     * @group Statistics
     *
     * Getting detailed statistics for admin page.
     * This route recognize content type header and returns json or xml.
     *
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function getStatisticsForAdminPage(Request $request) {

        $number_of_posts = count(CakePost::all());
        $number_of_comments = count(CakePostComment::all());
        $number_of_users = count(User::all());
        $active_users = DB::table('personal_access_tokens')->count();

        $postovi_data_statistika = [];
        $brojPostovaDanas = count(CakePost::whereDate('created_at', date('Y-m-d'))->get());

        $postovi_data_statistika[] = ['name' => 'Danas', 'uv' => $brojPostovaDanas];


        for ($i = 1; $i < 6; $i++) {
            $yesterday = date("Y-m-d", strtotime("-$i days"));
            $brojPostova = count(CakePost::whereDate('created_at', $yesterday)->get());
            $postovi_data_statistika[] = ['name' => $yesterday, 'uv' => $brojPostova];
        }


        $tip = $request->getContentType();

        if ($tip == 'xml') {
            return response()->xml(['success' => true, 'statistics' => ['posts' => $number_of_posts,
                'comments' => $number_of_comments,
                'users' => $number_of_users,
                'active_users' => $active_users],
                'chart_data' => [$postovi_data_statistika]]);
        }

        return response()->json(['success' => true, 'statistics' => ['posts' => $number_of_posts,
                'comments' => $number_of_comments,
                'users' => $number_of_users,
                'active_users' => $active_users],
                'chart_data' => [$postovi_data_statistika]]
        );

    }
    /**
     * @group Statistics
     *
     * Getting overall report for our blog in Excel file.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAdminReport() {

        $number_of_posts = count(CakePost::all());
        $number_of_comments = count(CakePostComment::all());
        $number_of_cakes = count(Cake::all());
        $number_of_users = count(User::all());
        $datum = date('Y-m-d');
        $prosecanBrojObjavaPoKorisniku = $number_of_users > 0 ? $number_of_posts / $number_of_users : 0;
        $prosecanBrojKomentaraPoKorisniku = $number_of_users > 0 ? $number_of_comments / $number_of_users : 0;


        $idPost = CakePostComment::select('post_id')
            ->groupBy('post_id')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(1)
            ->get();

        $post = null;
        if (!empty($idPost)) {
            $post = CakePost::find($idPost);
        }

        $fileGenerator = new StatisticsReport();
        $file = $fileGenerator->generateAdminReportExcel([
            'brojPostova' => $number_of_posts,
            'brojKomentara' => $number_of_comments,
            'brojTorti' => $number_of_cakes,
            'brojKorisnika' => $number_of_users,
            'datum' => $datum,
            'prosecanBrojObjavaPoKorisniku' => $prosecanBrojObjavaPoKorisniku,
            'prosecanBrojKomentaraPoKorisniku' => $prosecanBrojKomentaraPoKorisniku,
            'post' => $post
        ]);


        return response()->file($file);
    }

}
