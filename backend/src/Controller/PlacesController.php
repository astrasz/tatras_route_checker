<?php

namespace App\Controller;

use App\Entity\Place;
use App\DTO\CreatePlaceDTO;
use App\Repository\PlaceRepository;
use App\Service\PlacesService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use OpenApi\Annotations as OA;

#[Route('/api/places')]
class PlacesController extends AbstractController
{
    private PlacesService $placesService;

    public function __construct(PlacesService $placesService)
    {
        $this->placesService = $placesService;
    }

    #[Route(name: 'get_places', methods:['GET'])]
    public function cget(PlaceRepository $placeRepository): Response
    {

        $places = $placeRepository->findAll();

        $json = $this->placesService->serializeToJson($places, ['place']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }

    #[Route(name: 'create_place', methods: ['POST'])]
    public function createPlace(Request $request): Response
    {
        $createPlaceDTO = $this->placesService->createDTO($request->getContent(), CreatePlaceDTO::class);

        $place = $this->placesService->createOrUpdate($createPlaceDTO);

        if (!($place instanceof Place)){
            return new JsonResponse($place, JsonResponse::HTTP_BAD_REQUEST);
        }

        $json = $this->placesService->serializeToJson($place, ['place']);

        return new JsonResponse($json, JsonResponse::HTTP_CREATED, [], true);
        
    }

    #[Route('/{id}', name: 'get_place', methods: ['GET'])]
    public function getPlace(Place $place): Response
    {
        if (!($place instanceof Place) || !$place) {
            return new JsonResponse(["id" => "place not found"], JsonResponse::HTTP_NOT_FOUND);
        }
        $json = $this->placesService->serializeToJson($place, ['place']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }


    #[Route('/{id}', name: 'remove_place', methods: ['DELETE'])]
    public function removePlace(Place $place=null, ManagerRegistry $doctrine): Response
    {
        if (!($place instanceof Place) || !$place) {
            return new JsonResponse(["id" => "place not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $id = $place->getId();
        $doctrine->getManager()->remove($place);
        $doctrine->getManager()->flush();

        return new Response('Place with id ' . $id . ' has been successfully removed');
    }

    #[Route('/{id}', name: 'update_place', methods:['PUT'])]
    public function updatePlace(Place $place=null, Request $request): Response
    {
        if (!($place instanceof Place) || !$place) {
            return new JsonResponse(["id" => "place not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $createPlaceDTO = $this->placesService->createDTO($request->getContent(), CreatePlaceDTO::class);

        $place = $this->placesService->createOrUpdate($createPlaceDTO, $place);
        if (!($place instanceof Place)){
            return new JsonResponse($place, JsonResponse::HTTP_BAD_REQUEST);
        }

        $json = $this->placesService->serializeToJson($place, ['place']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }

}
