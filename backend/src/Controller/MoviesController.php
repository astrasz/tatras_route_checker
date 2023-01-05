<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Service\MoviesService;
use App\Helpers\Traits\SerializerTrait;
use App\Repository\MovieRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/movies')]
class MoviesController extends AbstractController
{

    use SerializerTrait;

    private $moviesService;

    public function __construct(MoviesService $moviesService)
    {
        $this->moviesService = $moviesService;
    }

    #[Route(name: 'app_movies', methods: ['GET'])]
    public function cget(MovieRepository $movieRepository): JsonResponse
    {
        $movies = $movieRepository->findAll();

        $json = $this->serializeToJson($movies, ['movie']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }

    #[Route(name: 'add_movie', methods: ['POST'])]
    public function addMovie(Request $request): Response
    {
        $addMovieDTO = $this->createDTO($request->getContent(), AddOrUpdateMovieDTO::class);
        $movie = $this->moviesService->createOrUpdate($addMovieDTO);

        if (!($movie instanceof Movie)) {
            return new JsonResponse($movie, JsonResponse::HTTP_BAD_REQUEST);
        }

        $json = $this->serializeToJson($movie, ['movie']);

        return new JsonResponse($json, JsonResponse::HTTP_CREATED, [], true);
    }


    #[Route('/id', name: 'get_place', methods: ['GET'])]
    public function getMovie(Movie $movie): Response
    {

        if (!($movie instanceof Movie) || !$movie) {
            return new JsonResponse(["id" => "movie not found"], JsonResponse::HTTP_NOT_FOUND);
        }
        $json = $this->serializeToJson($movie, ['movie']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'remove_movie', methods: ['DELETE'])]
    public function removePlace(Movie $movie = null, ManagerRegistry $doctrine): Response
    {
        if (!($movie instanceof Movie) || !$movie) {
            return new JsonResponse(["id" => "movie not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $id = $movie->getId();
        $doctrine->getManager()->remove($movie);
        $doctrine->getManager()->flush();

        return new Response('Place with id ' . $id . ' has been successfully removed');
    }

    #[Route('/{id}', name: 'update_movie', methods: ['PUT'])]
    public function updatePlace(Movie $movie = null, Request $request): Response
    {
        if (!($movie instanceof Movie) || !$movie) {
            return new JsonResponse(["id" => "movie not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $addMovieDTO = $this->createDTO($request->getContent(), CreateOrUpdatePlaceDTO::class);

        $movie = $this->moviesService->createOrUpdate($addMovieDTO, $movie);
        if (!($movie instanceof Movie)) {
            return new JsonResponse($movie, JsonResponse::HTTP_BAD_REQUEST);
        }

        $json = $this->serializeToJson($movie, ['movie']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }
}
