<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Service\MoviesService;
use App\DTO\AddOrUpdateMovieDTO;
use App\Repository\MovieRepository;
use App\Helper\Traits\SerializerTrait;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('api/movies')]
class MoviesController extends ApiController
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
        try {
            $movies = $movieRepository->findAll();

            $json = $this->serializeToJson($movies, ['movie']);

            return $this->returnSuccessResponse(json_decode($json));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }

    #[Route(name: 'add_movie', methods: ['POST'])]
    public function addMovie(Request $request): JsonResponse
    {
        try {
            $content  = $request->toArray();
            foreach ($content as $key => $param) {
                if ($param === '')
                    $content[$key] = null;
            }

            $addMovieDTO = $this->createDTO(json_encode($content), AddOrUpdateMovieDTO::class);

            $movie = $this->moviesService->createOrUpdate($addMovieDTO);
            if (!($movie instanceof Movie)) {
                return $this->returnFailureResponse($movie, JsonResponse::HTTP_BAD_REQUEST);
            }

            $json = $this->serializeToJson($movie, ['movie']);

            return $this->returnSuccessResponse(json_decode($json), JsonResponse::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->returnFailureResponse(["id" => $e->getMessage()], $e->getCode());
        }
    }


    #[Route('/{id}', name: 'get_movie', methods: ['GET'])]
    public function getMovie(Movie $movie = null): JsonResponse
    {
        try {
            if (!($movie instanceof Movie) || !$movie) {
                return $this->returnFailureResponse(["id" => "Movie not found"], JsonResponse::HTTP_NOT_FOUND);
            }
            $json = $this->serializeToJson($movie, ['movie']);

            return $this->returnSuccessResponse(json_decode($json));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }

    #[Route('/{id}', name: 'remove_movie', methods: ['DELETE'])]
    public function removeMovie(Movie $movie = null, ManagerRegistry $doctrine): JsonResponse
    {
        try {
            if (!($movie instanceof Movie) || !$movie) {
                return $this->returnFailureResponse(["id" => "Movie not found"], JsonResponse::HTTP_NOT_FOUND);
            }

            $id = $movie->getId();
            $doctrine->getManager()->remove($movie);
            $doctrine->getManager()->flush();

            return $this->returnSuccessResponse(sprintf('Movie with id %s has been successfully removed', $id));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }

    #[Route('/{id}', name: 'update_movie', methods: ['PUT'])]
    public function updateMovie(Movie $movie = null, Request $request): JsonResponse
    {
        try {
            if (!($movie instanceof Movie) || !$movie) {
                return $this->returnFailureResponse(["id" => "Movie not found"], JsonResponse::HTTP_NOT_FOUND);
            }

            $addMovieDTO = $this->createDTO($request->getContent(), AddOrUpdateMovieDTO::class);

            $movie = $this->moviesService->createOrUpdate($addMovieDTO, $movie);
            if (!($movie instanceof Movie)) {
                return $this->returnFailureResponse($movie, JsonResponse::HTTP_BAD_REQUEST);
            }

            $json = $this->serializeToJson($movie, ['movie']);

            return $this->returnSuccessResponse(json_decode($json));
        } catch (Exception $e) {
            return $this->returnFailureResponse($e->getMessage(), $e->getCode());
        }
    }
}
