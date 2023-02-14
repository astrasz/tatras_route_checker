<?php

namespace App\Controller;

use App\Entity\Movie;
use App\Service\MoviesService;
use App\DTO\AddOrUpdateMovieDTO;
use App\Repository\MovieRepository;
use App\Helpers\Traits\SerializerTrait;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('api/movies')]
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
        try {

            $content  = $request->toArray();
            foreach ($content as $key => $param) {
                if ($param === '')
                    $content[$key] = null;
            }


            $addMovieDTO = $this->createDTO(json_encode($content), AddOrUpdateMovieDTO::class);
            // dd(['wchodze' => $addMovieDTO]);

            $movie = $this->moviesService->createOrUpdate($addMovieDTO);
            // dd('movie', $movie);
            if (!($movie instanceof Movie)) {
                return new JsonResponse($movie, JsonResponse::HTTP_BAD_REQUEST);
            }

            $json = $this->serializeToJson($movie, ['movie']);

            return new JsonResponse($json, JsonResponse::HTTP_CREATED, [], true);
        } catch (Exception $e) {
            return new JsonResponse(["id" => $e->getMessage()], $e->getCode());
        }
    }


    #[Route('/{id}', name: 'get_movie', methods: ['GET'])]
    public function getMovie(Movie $movie = null): Response
    {

        if (!($movie instanceof Movie) || !$movie) {
            return new JsonResponse(["id" => "Movie not found"], JsonResponse::HTTP_NOT_FOUND);
        }
        $json = $this->serializeToJson($movie, ['movie']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'remove_movie', methods: ['DELETE'])]
    public function removeMovie(Movie $movie = null, ManagerRegistry $doctrine): Response
    {
        if (!($movie instanceof Movie) || !$movie) {
            return new JsonResponse(["id" => "Movie not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $id = $movie->getId();
        $doctrine->getManager()->remove($movie);
        $doctrine->getManager()->flush();

        return new Response('Movie with id ' . $id . ' has been successfully removed');
    }

    #[Route('/{id}', name: 'update_movie', methods: ['PUT'])]
    public function updateMovie(Movie $movie = null, Request $request): Response
    {
        if (!($movie instanceof Movie) || !$movie) {
            return new JsonResponse(["id" => "Movie not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $addMovieDTO = $this->createDTO($request->getContent(), AddOrUpdateMovieDTO::class);

        $movie = $this->moviesService->createOrUpdate($addMovieDTO, $movie);
        if (!($movie instanceof Movie)) {
            return new JsonResponse($movie, JsonResponse::HTTP_BAD_REQUEST);
        }

        $json = $this->serializeToJson($movie, ['movie']);

        return new JsonResponse($json, JsonResponse::HTTP_OK, [], true);
    }
}
