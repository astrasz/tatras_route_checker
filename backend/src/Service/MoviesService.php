<?php

namespace App\Service;

use App\Entity\Movie;
use App\Entity\Place;
use App\DTO\AddOrUpdateMovieDTO;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MoviesService
{
    private ManagerRegistry $doctrine;
    private ValidatorInterface $validator;

    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
    }

    public function createOrUpdate(AddOrUpdateMovieDTO $addMovieDTO, Movie $movie = null): Movie|array
    {
        $errors = $this->validator->validate($addMovieDTO);

        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $messages;
        }

        $entityManager = $this->doctrine->getManager();

        if (!$movie) {
            $movie = new Movie();
        }

        if ($addMovieDTO->getStartPointId()) {
            $startPoint = $this->doctrine->getRepository(Place::class)->findOneBy(['id' => $addMovieDTO->getStartPointId()]);
            if (!($startPoint instanceof Place)) {
                throw new NotFoundHttpException('Start point not found', null, 404);
            }

            $movie->setStartPoint($startPoint);
        }

        if ($addMovieDTO->getDestinationId()) {
            $destination = $this->doctrine->getRepository(Place::class)->findOneBy(['id' => $addMovieDTO->getDestinationId()]);

            if (!($destination instanceof Place)) {
                throw new NotFoundHttpException('Destination not found', null, 404);
            }

            $movie->setDestination($destination);
        }

        if ($addMovieDTO->getEndPointId()) {
            $endPoint = $this->doctrine->getRepository(Place::class)->findOneBy(['id' => $addMovieDTO->getEndPointId()]);

            if (!($endPoint instanceof Place)) {
                throw new NotFoundHttpException('End point not found', null, 404);
            }

            $movie->setEndPoint($endPoint);
        }

        $movie->setTitle($addMovieDTO->getTitle());
        $movie->setIsWinter($addMovieDTO->getIsWinter());
        $movie->setLinkToFile($addMovieDTO->getLinkToFile());
        $movie->setDifficulty($addMovieDTO->getDifficulty());
        $movie->setDescription($addMovieDTO->getDescription());

        $entityManager->persist($movie);
        $entityManager->flush();

        return $movie;
    }
}
