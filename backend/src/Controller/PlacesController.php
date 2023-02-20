<?php

namespace App\Controller;

use App\Entity\Place;
use App\Service\PlacesService;
use App\DTO\CreateOrUpdatePlaceDTO;
use App\Helper\Traits\SerializerTrait;
use App\Repository\PlaceRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('api/places')]
class PlacesController extends ApiController
{

    use SerializerTrait;

    private PlacesService $placesService;

    public function __construct(PlacesService $placesService)
    {
        $this->placesService = $placesService;
    }

    #[Route(name: 'get_places', methods: ['GET'])]
    public function cget(PlaceRepository $placeRepository): Response
    {
        try {
            $places = $placeRepository->findAll();
            $json = $this->serializeToJson($places, ['place']);

            return $this->returnSuccessResponse(json_decode($json));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }

    #[Route(name: 'create_place', methods: ['POST'])]
    public function createPlace(Request $request): Response
    {
        try {
            $createPlaceDTO = $this->createDTO($request->getContent(), CreateOrUpdatePlaceDTO::class);
            $place = $this->placesService->createOrUpdate($createPlaceDTO);

            if (!($place instanceof Place)) {
                return new JsonResponse($place, JsonResponse::HTTP_BAD_REQUEST);
            }

            $json = $this->serializeToJson($place, ['place']);

            return $this->returnSuccessResponse(json_decode($json), JsonResponse::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }

    #[Route('/{id}', name: 'get_place', methods: ['GET'])]
    public function getPlace(Place $place): Response
    {
        try {
            if (!($place instanceof Place) || !$place) {
                return new JsonResponse(["id" => "place not found"], JsonResponse::HTTP_NOT_FOUND);
            }
            $json = $this->serializeToJson($place, ['place']);


            return $this->returnSuccessResponse(json_decode($json));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }


    #[Route('/{id}', name: 'remove_place', methods: ['DELETE'])]
    public function removePlace(Place $place = null, ManagerRegistry $doctrine): Response
    {
        try {
            if (!($place instanceof Place) || !$place) {
                return new JsonResponse(["id" => "place not found"], JsonResponse::HTTP_NOT_FOUND);
            }

            $id = $place->getId();
            $doctrine->getManager()->remove($place);
            $doctrine->getManager()->flush();

            return $this->returnSuccessResponse(sprintf('Place with id %s has been successfully removed', $id));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }

    #[Route('/{id}', name: 'update_place', methods: ['PUT'])]
    public function updatePlace(Place $place = null, Request $request): Response
    {
        try {
            if (!($place instanceof Place) || !$place) {
                return new JsonResponse(["id" => "place not found"], JsonResponse::HTTP_NOT_FOUND);
            }

            $createPlaceDTO = $this->createDTO($request->getContent(), CreateOrUpdatePlaceDTO::class);

            $place = $this->placesService->createOrUpdate($createPlaceDTO, $place);
            if (!($place instanceof Place)) {
                return new JsonResponse($place, JsonResponse::HTTP_BAD_REQUEST);
            }

            $json = $this->serializeToJson($place, ['place']);

            return $this->returnSuccessResponse(json_decode($json));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }
}
