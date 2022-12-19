<?php

namespace App\Controller;

use App\Entity\Place;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[Route('/places')]
class PlacesController extends AbstractController
{
    #[Route(name: 'get_places', methods:['GET'])]
    public function cget(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PlacesController.php',
        ]);
    }

    #[Route(name: 'create_place', methods: ['POST'])]
    public function createPlace(Request $request,  ManagerRegistry $doctrine): Response
    {
        dd($request->request->all());


        $entityManager = $doctrine->getManager();

        $place = new Place();

        return new Response();
    }

}
